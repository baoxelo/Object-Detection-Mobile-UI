/** @format */

import React, { useEffect, useRef, useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocossd from '@tensorflow-models/coco-ssd';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as jpeg from 'jpeg-js';
import { Camera } from 'expo-camera';

import StyledButton from '../components/Button/Button';
import DefaultLayout from '../layouts/DefaultLayout';
import { useRoute } from '@react-navigation/native';
function Photo({ navigation }) {
  const route = useRoute();
  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState('');
  const [pickedImage, setPickedImage] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const cameraRef = useRef();

  //Get permission of camera
  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  //Handle Capture
  const handleCapture = async () => {
    if (!cameraRef) return;
    const photo = await cameraRef.current.takePictureAsync();
    setPickedImage(photo.uri);
    setIsCameraOn(false);
  };

  //Handle open camera
  const handleOpenCamera = () => {
    setIsCameraOn(true);
    if (!pickedImage) return;
    setPickedImage('');
  };

  // Init camera
  useEffect(() => {
    getPermission;
  }, [isCameraOn]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setPickedImage(result.uri);
      // Remove the last result
      setResult('');
    }
  };
  const classifyUsingCocoSSD = async () => {
    try {
      // Load Coco-SSD.
      await tf.ready();
      const model = await cocossd.load();
      setIsTfReady(true);
      console.log('starting inference with picked image: ' + pickedImage);
      if (!pickedImage) return;
      // Convert image to tensor
      const imgB64 = await FileSystem.readAsStringAsync(pickedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);
      const TO_UINT8ARRAY = true;
      const { width, height, data } = jpeg.decode(raw, TO_UINT8ARRAY);
      const buffer = new Uint8Array(width * height * 3);
      let offset = 0;
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];
        offset += 4;
      }
      const imageTensor = tf.tensor3d(buffer, [height, width, 3]);
      // Classify the tensor and show the result
      const prediction = await model.detect(imageTensor);
      if (prediction && prediction.length > 0) {
        setResult(
          `${prediction[0].class} accurate ratio: ${(
            Number(prediction[0].score) * 100
          ).toFixed(3)} %`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    classifyUsingCocoSSD();
  }, [pickedImage]);
  return (
    <DefaultLayout layoutNum={2}>
      <View style={styles.container}>
        {pickedImage !== '' ? (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        ) : isCameraOn ? (
          <Camera ref={cameraRef} style={styles.camera}>
            <TouchableOpacity
              style={styles.captureBtn}
              onPress={handleCapture}
            />
          </Camera>
        ) : (
          <Image
            source={require('../assets/DetectObjectImage.jpg')}
            style={styles.image}
          />
        )}

        {isTfReady ? (
          <View style={styles.buttonWrapper}>
            <StyledButton title="Library" onPress={pickImage} styles={{}} />
            <StyledButton
              title={pickedImage ? 'Capture again' : 'Camera'}
              onPress={handleOpenCamera}
            />
          </View>
        ) : (
          <View style={{ width: '100%' }}>
            <ActivityIndicator
              animating={true}
              color={'darkorange'}
              size={'large'}
            />
          </View>
        )}

        <View style={{ width: '100%', height: 20 }} />
        {!isTfReady && <Text>Loading TFJS model...</Text>}
        {isTfReady && result === '' && !pickedImage && (
          <Text>Pick an image to classify!</Text>
        )}
        {pickedImage !== '' && result === '' && <Text>Analyzing image</Text>}
        {result !== '' && <Text>{result}</Text>}
      </View>
    </DefaultLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  image: {
    display: 'flex',
    width: 350,
    height: 350,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 20,
  },
  camera: {
    marginTop: 20,
    width: 350,
    height: 350,
  },
  captureBtn: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -25 }],
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 25,
  },
  buttonWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {},
});
export default memo(Photo);
