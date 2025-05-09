import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { container } from "../../container";
import CardCryptoComponent from "../home/components/card_crypto.component";
import SearchComponent from "../home/components/search.component";
import { FavoritesViewModel } from "./Viewmodel";
import { Navbar } from "./components/Navbar";

const FavoritesView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<CryptoEntity[]>([]);
  const [searchData, setSearchData] = useState<CryptoEntity[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const viewModel = useMemo(
    () => container.resolve<FavoritesViewModel>("FavoritesViewModel"),
    []
  );

  const getFavorites = async () => {
    try {
      setIsLoading(true);
      const favorites = await viewModel.getFavorites();
      setFavorites(favorites);
      if (isSearch && searchTerm) {
        const filteredFavorites = favorites.filter(
          (crypto) =>
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchData(filteredFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFavorites();
    }, [isSearch, searchTerm])
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setIsSearch(false);
      return;
    }
    const filteredFavorites = favorites.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(term.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredFavorites);
    setIsSearch(true);
  };

  const renderItem = ({ item: crypto }: { item: CryptoEntity }) => (
    <CardCryptoComponent
      key={crypto.id}
      crypto={{
        id: crypto.id,
        symbol: crypto.symbol,
        name: crypto.name,
        rank: crypto.rank,
        price_usd: crypto.price_usd,
        percent_change_24h: crypto.percent_change_24h,
        is_favorite: crypto.is_favorite,
      }}
    />
  );

  return (
    <View className="flex-1 bg-gray-900">
      <Navbar title="Favorites Crypto" />
      <View className="px-4">
        <SearchComponent onSearch={handleSearch} />
      </View>
      {isSearch && (
        <View className="px-4 mb-4">
          <Text className="text-gray-400">Buscando moneda: {searchTerm}</Text>
        </View>
      )}
      <FlashList
        data={isSearch ? searchData : favorites}
        renderItem={renderItem}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-8">
            <Text className="text-gray-400 text-lg">
              {isSearch ? "No favorites found" : "No favorites added yet"}
            </Text>
          </View>
        )}
        onRefresh={() => (isSearch ? () => {} : getFavorites())}
        refreshing={isLoading}
      />
    </View>
  );
};

export default FavoritesView;
