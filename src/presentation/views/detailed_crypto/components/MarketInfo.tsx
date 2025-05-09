import { CryptoEntity } from '@/src/domain/entities/Crypto.entity';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MarketInfoProps {
  crypto: CryptoEntity;
  onShare: () => void;
}

const formatLargeNumber = (num: string | number) => {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K';
  return n.toString();
};

export const MarketInfo = ({ crypto, onShare }: MarketInfoProps) => {
  return (
    <View className="space-y-4">
      <View className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-4">
        <Text className="text-sm font-medium text-gray-400 mb-3">Información de Mercado</Text>

        <View className="space-y-3">
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="currency-usd" size={16} color="#6b7280" />
              <Text className="text-sm text-gray-400 ml-2">Capitalización de Mercado</Text>
            </View>
            <Text className="text-sm font-medium text-white">${formatLargeNumber(crypto.market_cap_usd)}</Text>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="chart-bar" size={16} color="#6b7280" />
              <Text className="text-sm text-gray-400 ml-2">Volumen 24h</Text>
            </View>
            <Text className="text-sm font-medium text-white">${formatLargeNumber(crypto.volume24.toString())}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-400">Suministro Circulante</Text>
            <Text className="text-sm font-medium text-white">
              {formatLargeNumber(crypto.csupply)} {crypto.symbol}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-400">Suministro Total</Text>
            <Text className="text-sm font-medium text-white">
              {formatLargeNumber(crypto.tsupply)} {crypto.symbol}
            </Text>
          </View>

          {crypto.msupply && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-400">Suministro Máximo</Text>
              <Text className="text-sm font-medium text-white">
                {formatLargeNumber(crypto.msupply)} {crypto.symbol}
              </Text>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={onShare}
        className="w-full border border-gray-700 rounded-xl h-10 bg-gray-800/30 flex-row items-center justify-center mt-3"
      >
        <MaterialCommunityIcons name="share-variant" size={16} color="#9ca3af" />
        <Text className="text-gray-400 ml-2">Compartir</Text>
      </TouchableOpacity>
    </View>
  );
}; 