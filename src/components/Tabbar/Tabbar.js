/** @format */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../../pages/Home';
import Photo from '../../pages/Photo';
import CameraPage from '../../pages/CameraPage';
import Storage from '../../pages/Storage';
const Tab = createBottomTabNavigator();

function Tabbar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#eee',
        tabBarInactiveTintColor: '#ED8554',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarActiveBackgroundColor: '#f64668',
        headerStyle: {
          backgroundColor: 'rgba(255,255,255,0.5)',
        },
        tabBarStyle: {
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          shadowColor: 'transparent',
        },
        tabBarItemStyle: {
          flex: 0,
          width: 50,
          height: 50,
          borderRadius: 10,
          marginLeft: 15,
          marginRight: 15,
          transform: [{ rotate: '45deg' }],
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={30}
              transform={[{ rotate: '-45deg' }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Photo"
        component={Photo}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="picture-o"
              color={color}
              size={30}
              transform={[{ rotate: '-45deg' }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="camera"
              color={color}
              size={30}
              transform={[{ rotate: '-45deg' }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Storage"
        component={Storage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="storage"
              color={color}
              size={30}
              transform={[{ rotate: '-45deg' }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabbar;
