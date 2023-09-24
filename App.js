/** @format */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import Tabbar from './src/components/Tabbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';

function App() {
  const MyTheme = {
    ...DefaultTheme,
    backgroundColor: '#000',
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <ImageBackground
        source={require('./src/assets/90689.jpg')}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <NavigationContainer theme={MyTheme} style={{ flex: 1 }}>
          <Tabbar />
        </NavigationContainer>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default App;
