import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { container } from "../../container";
import { HomeViewModel } from "./Viewmodel";

export default function HomeView() {
  const [data, setData] = useState<CryptoEntity[]>([]);

  const viewModel = useMemo(
    () => container.resolve<HomeViewModel>("HomeViewModel"),
    []
  );

  const getData = async () => {
    const info = await viewModel.loadCryptoData({
      start: 0,
      limit: 100,
    });
    setData(info || []);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text className="text-red-500">Hello</Text>
    </View>
  );
}
