import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../container";
import { Loading } from "./components/Loading";
import { MarketInfo } from "./components/MarketInfo";
import { Navbar } from "./components/Navbar";
import { PriceCard } from "./components/PriceCard";
import { DetailedCryptoViewModel } from "./Viewmodel";

const DetailedCryptoView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [crypto, setCrypto] = useState<CryptoEntity>({} as CryptoEntity);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useLocalSearchParams();

  const viewModel = useMemo(
    () => container.resolve<DetailedCryptoViewModel>("DetailedCryptoViewModel"),
    []
  );

  const getCryptoById = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await viewModel.getCryptoById({ id: id as string });
      setIsFavorite(data.is_favorite);
      setCrypto(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, viewModel]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out ${crypto.name} (${
          crypto.symbol
        }) - Current price: $${Number.parseFloat(
          crypto.price_usd
        ).toLocaleString()}`,
      });
    } catch (error) {
      console.log(error);
    }
  }, [crypto]);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      viewModel.removeFromFavorites({ id: id as string });
    } else {
      viewModel.addToFavorites({ id: id as string });
    }
    setIsFavorite(!isFavorite);
  }, [isFavorite, id, viewModel]);

  useEffect(() => {
    getCryptoById();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900" edges={["top"]}>
      <Navbar
        title={crypto.name}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <ScrollView className="flex-1">
        <PriceCard crypto={crypto} />
        <View className="px-4">
          <MarketInfo crypto={crypto} onShare={handleShare} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailedCryptoView;
