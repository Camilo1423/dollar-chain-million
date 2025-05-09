import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NavbarProps {
  title: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-4 bg-gray-900">
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-14 h-14 rounded-full bg-gray-800/50 items-center justify-center border border-gray-700/50"
      >
        <Ionicons name="arrow-back" size={20} color="#D1D5DB" />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-white">{title}</Text>
    </View>
  );
};
