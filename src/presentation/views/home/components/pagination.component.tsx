import React from "react";
import { Pressable, Text } from "react-native";

function PaginationComponent({
  currentPage,
  handlePageChange,
  i,
  isAuxiliar = false,
}: {
  currentPage: number;
  handlePageChange: (i: number) => void;
  i: number;
  isAuxiliar?: boolean;
}) {
  return (
    <Pressable
      key={i}
      onPress={() => handlePageChange(i)}
      className={`w-10 h-10 items-center justify-center rounded-lg ${
        currentPage === i && !isAuxiliar
          ? "bg-emerald-500"
          : "bg-gray-800/30 border border-gray-700/50"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          currentPage === i && !isAuxiliar ? "text-white" : "text-gray-400"
        }`}
      >
        {i}
      </Text>
    </Pressable>
  );
}

export default PaginationComponent;
