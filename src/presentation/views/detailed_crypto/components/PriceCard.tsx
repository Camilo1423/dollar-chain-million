import { CryptoEntity } from '@/src/domain/entities/Crypto.entity';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface PriceCardProps {
  crypto: CryptoEntity;
}

export const PriceCard = ({ crypto }: PriceCardProps) => {
  const isPositive = Number.parseFloat(crypto.percent_change_24h) > 0;

  return (
    <View className="mx-4 mb-6">
      <View className="relative overflow-hidden rounded-2xl bg-gray-800/30 border border-gray-700/50">
        <View className="absolute inset-0 bg-blue-500/10" />
        
        <View className="relative p-5">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <View className="w-16 h-16 rounded-full bg-gray-700/70 items-center justify-center mr-3 border border-gray-600/50">
                <Text className="text-xl font-bold text-white">{crypto.symbol}</Text>
              </View>
              <View>
                <Text className="text-lg font-bold text-white">{crypto.name}</Text>
                <Text className="text-xs text-gray-400">Rank #{crypto.rank}</Text>
              </View>
            </View>
            <View className="items-end">
              <View className={`px-2 py-1 rounded-full ${isPositive ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
                <View className="flex-row items-center">
                  <MaterialCommunityIcons 
                    name={isPositive ? "arrow-up-right" : "arrow-down-right"} 
                    size={12} 
                    color={isPositive ? "#34d399" : "#ef4444"} 
                  />
                  <Text className={`text-xs ml-1 ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                    {Math.abs(Number.parseFloat(crypto.percent_change_24h)).toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-3xl font-bold mb-1 text-white">
              ${Number.parseFloat(crypto.price_usd).toLocaleString()}
            </Text>
            <Text className="text-sm text-gray-400">
              {Number.parseFloat(crypto.price_btc).toFixed(8)} BTC
            </Text>
          </View>

          <View className="mt-6 flex-row justify-between">
            <View className="bg-gray-800/50 rounded-lg p-3 flex-1 mr-2">
              <View className="flex-row items-center mb-1">
                <MaterialCommunityIcons name="clock-outline" size={12} color="#9ca3af" />
                <Text className="text-xs text-gray-400 ml-1">1h</Text>
              </View>
              <Text className={`text-sm font-medium ${
                Number.parseFloat(crypto.percent_change_1h) > 0 ? "text-emerald-400" : "text-red-400"
              }`}>
                {Number.parseFloat(crypto.percent_change_1h) > 0 ? "+" : ""}
                {crypto.percent_change_1h}%
              </Text>
            </View>
            <View className="bg-gray-800/50 rounded-lg p-3 flex-1 mx-2">
              <View className="flex-row items-center mb-1">
                <MaterialCommunityIcons name="clock-outline" size={12} color="#9ca3af" />
                <Text className="text-xs text-gray-400 ml-1">24h</Text>
              </View>
              <Text className={`text-sm font-medium ${
                Number.parseFloat(crypto.percent_change_24h) > 0 ? "text-emerald-400" : "text-red-400"
              }`}>
                {Number.parseFloat(crypto.percent_change_24h) > 0 ? "+" : ""}
                {crypto.percent_change_24h}%
              </Text>
            </View>
            <View className="bg-gray-800/50 rounded-lg p-3 flex-1 ml-2">
              <View className="flex-row items-center mb-1">
                <MaterialCommunityIcons name="clock-outline" size={12} color="#9ca3af" />
                <Text className="text-xs text-gray-400 ml-1">7d</Text>
              </View>
              <Text className={`text-sm font-medium ${
                Number.parseFloat(crypto.percent_change_7d) > 0 ? "text-emerald-400" : "text-red-400"
              }`}>
                {Number.parseFloat(crypto.percent_change_7d) > 0 ? "+" : ""}
                {crypto.percent_change_7d}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}; 