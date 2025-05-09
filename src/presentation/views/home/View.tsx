import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { container } from "../../container";
import { HomeViewModel } from "./Viewmodel";
import CardCryptoComponent from "./components/card_crypto.component";
import ChevronComponent from "./components/chevron.component";
import PaginationComponent from "./components/pagination.component";
import SearchComponent from "./components/search.component";

const ITEMS_PER_PAGE = 10;

export default function HomeView() {
  const [data, setData] = useState<CryptoEntity[]>([]);
  const [searchData, setSearchData] = useState<CryptoEntity[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const viewModel = useMemo(
    () => container.resolve<HomeViewModel>("HomeViewModel"),
    []
  );

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const getData = async (page: number) => {
    setIsLoading(true);
    try {
      const info = await viewModel.loadCryptoData({ page: page });
      if (info) {
        setData(info.data);
        setTotal(info.total);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  useFocusEffect(
    useCallback(() => {
      if (isSearch && searchTerm) {
        handleSearch(searchTerm);
      } else {
        getData(currentPage);
      }
    }, [currentPage, isSearch, searchTerm])
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && !isLoading) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    const results = await viewModel.searchCrypto(term, totalPages);
    setSearchData(results.data);
    setIsSearch(results.is_search);
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

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationComponent
          key={i}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          i={i}
        />
      );
    }

    return (
      <View className="flex-row items-center justify-center space-x-2 py-4">
        <ChevronComponent
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
          isBack={true}
          totalPages={totalPages}
        />

        {startPage > 1 && (
          <>
            <PaginationComponent
              isAuxiliar={true}
              currentPage={1}
              handlePageChange={handlePageChange}
              i={1}
            />
            {startPage > 2 && <Text className="text-gray-400">...</Text>}
          </>
        )}

        {pages}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <Text className="text-gray-400">...</Text>
            )}
            <PaginationComponent
              isAuxiliar={true}
              currentPage={totalPages}
              handlePageChange={handlePageChange}
              i={totalPages}
            />
          </>
        )}

        <ChevronComponent
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
          isBack={false}
          totalPages={totalPages}
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-900">
      <View className="flex-row items-center px-4 mt-2">
        <Image
          source={require("../../assets/images/Logo.png")}
          style={{ height: 50, width: 120, backgroundColor: "transparent" }}
          contentFit="contain"
        />
        <Text className="text-gray-400 ml-auto">With ❤️ for Million</Text>
      </View>
      <View className="px-4 pt-6 flex-row items-center justify-between mb-6">
        <Text className="text-gray-400">
          Page {currentPage} of {totalPages}
        </Text>
        <View className="flex flex-row items-center gap-2">
          <Link href="/favorites">
            <Text className="text-gray-400 font-bold underline">Favorites</Text>
          </Link>
          <Ionicons name="heart" size={16} color="red" />
        </View>
      </View>
      <View className="px-4">
        <SearchComponent onSearch={handleSearch} />
      </View>
      <FlashList
        data={isSearch ? searchData : data}
        renderItem={renderItem}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListFooterComponent={isSearch ? <></> : renderPagination}
        refreshing={isLoading}
        onRefresh={() => (isSearch ? () => {} : getData(currentPage))}
      />
    </View>
  );
}
