/** @format */
import { memo } from 'react';
import { View, Text } from 'react-native';
import DefaultLayout from '../layouts/DefaultLayout';
function Home() {
  return (
    <DefaultLayout layoutNum={1}>
      <View style={{ backgroundColor: 'transparent' }}>
        <Text>Home Screen</Text>
      </View>
    </DefaultLayout>
  );
}

export default memo(Home);
