/** @format */
import { Flex } from '@react-native-material/core';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useEffect } from 'react';
function DefaultLayout({ layoutNum = 1, ...props }) {
  const setLeftBlock =
    (Dimensions.get('window').width - 80 * 4) / 2 + 80 * (6 - layoutNum) - 50;
  const setRightBlock =
    (Dimensions.get('window').width - 80 * 4) / 2 + 80 * (layoutNum + 1) - 50;
  return (
    <View {...props} style={[styles.container, { ...props.style }]}>
      <View style={{ flex: 1, zIndex: 1, backgroundColor: 'transparent' }}>
        {props.children}
      </View>
      <LinearGradient
        // Background Linear Gradient
        colors={['#62c4c3', '#15CDCA', '#62c4c3', '#15CDCA', '#62c4c3']}
        end={{ x: -1, y: -1 }}
        style={[{ right: setLeftBlock }, styles.leftBlock]}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={['#62c4c3', '#15CDCA', '#62c4c3', '#15CDCA', '#62c4c3']}
        end={{ x: 1, y: 1 }}
        style={[{ left: setRightBlock }, styles.rightBlock]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  leftBlock: {
    position: 'absolute',
    opacity: 0.6,
    bottom: -100,
    width: 250,
    height: 250,
    borderRadius: 10,
    transform: [{ rotate: '-45deg' }],
  },
  rightBlock: {
    position: 'absolute',
    opacity: 0.6,
    bottom: -100,
    width: 250,
    height: 250,
    borderRadius: 10,
    transform: [{ rotate: '-45deg' }],
  },
});

export default DefaultLayout;
