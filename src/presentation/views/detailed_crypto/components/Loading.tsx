import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}; 