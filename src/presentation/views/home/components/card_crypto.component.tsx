import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "../../../hooks/useNavigation";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  is_favorite: boolean;
}

interface CryptoCardProps {
  crypto: CryptoData;
}

const CardCryptoComponent = React.memo(
  ({ crypto }: CryptoCardProps) => {
    const isPositive = Number.parseFloat(crypto.percent_change_24h) > 0;
    const { navigateToCryptoDetail } = useNavigation();

    return (
      <Pressable
        onPress={() => navigateToCryptoDetail(crypto.id, crypto.name)}
        className="relative group active:opacity-80 w-full"
      >
        {/* Glow effect */}
        <View
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${
            isPositive ? "bg-emerald-500/20" : "bg-red-500/20"
          }`}
        />

        <View className="relative bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <View className="relative w-16 h-16 mr-3 rounded-full overflow-hidden bg-gray-700/50 items-center justify-center border border-gray-600/50">
                <Text className="relative z-10 font-bold text-md text-white">
                  {crypto.symbol}
                </Text>
              </View>
              <View>
                <View className="flex-row items-center">
                  <Text className="font-medium text-white">{crypto.name}</Text>
                  <View className="ml-2">
                    <Ionicons
                      name={crypto.is_favorite ? "star" : "star-outline"}
                      size={16}
                      color={crypto.is_favorite ? "#fbbf24" : "#9ca3af"}
                    />
                  </View>
                </View>
                <Text className="text-xs text-gray-400">
                  Rank #{crypto.rank}
                </Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="font-medium text-white">
                ${Number.parseFloat(crypto.price_usd).toLocaleString()}
              </Text>
              <View
                className={`flex-row items-center justify-end ${
                  isPositive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                <Ionicons
                  name={isPositive ? "arrow-up" : "arrow-down"}
                  size={12}
                  color={isPositive ? "#34d399" : "#f87171"}
                  style={{ marginRight: 4 }}
                />
                <Text className="text-xs text-white">
                  {Math.abs(
                    Number.parseFloat(crypto.percent_change_24h)
                  ).toFixed(2)}
                  %
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.crypto.id === nextProps.crypto.id &&
      prevProps.crypto.price_usd === nextProps.crypto.price_usd &&
      prevProps.crypto.percent_change_24h ===
        nextProps.crypto.percent_change_24h &&
      prevProps.crypto.is_favorite === nextProps.crypto.is_favorite
    );
  }
);

CardCryptoComponent.displayName = 'CardCryptoComponent';

export default CardCryptoComponent;
