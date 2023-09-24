/** @format */
import { memo } from 'react';
import { View, Text } from 'react-native';
import DefaultLayout from '../layouts/DefaultLayout';

function Storage() {
  return (
    <DefaultLayout layoutNum={4}>
      <View>
        <Text>Storage Page</Text>
      </View>
    </DefaultLayout>
  );
}

export default memo(Storage);
