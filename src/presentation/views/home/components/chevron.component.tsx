import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ChevronComponent({
  currentPage,
  handlePageChange,
  isLoading,
  isBack,
  totalPages,
}: {
  currentPage: number;
  handlePageChange: (i: number) => void;
  isLoading: boolean;
  isBack: boolean;
  totalPages: number;
}) {
  const isDisabled = isBack ? currentPage === 1 : currentPage === totalPages;
  const nextPage = isBack ? currentPage - 1 : currentPage + 1;
  return (
    <Pressable
      onPress={() => handlePageChange(nextPage)}
      disabled={isDisabled || isLoading}
      className={`w-10 h-10 items-center justify-center rounded-lg ${
        isDisabled || isLoading
          ? "bg-gray-800/30 opacity-50"
          : "bg-gray-800/30 border border-gray-700/50"
      }`}
    >
      <Ionicons
        name={isBack ? "chevron-back" : "chevron-forward"}
        size={20}
        color={isDisabled ? "#9CA3AF" : "#fff"}
      />
    </Pressable>
  );
}

export default ChevronComponent;
