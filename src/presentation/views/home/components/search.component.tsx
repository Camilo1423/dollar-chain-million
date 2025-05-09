import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useCallback, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { useDebounce } from "../../../hooks/useDebounce";

interface SearchComponentProps {
  onSearch: (term: string) => void;
}

const DEBOUNCE_DELAY = 500;

const SearchComponent = ({ onSearch }: SearchComponentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useDebounce((term: string) => {
    onSearch(term);
  }, DEBOUNCE_DELAY);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchTerm(text);
      debouncedSearch(text);
    },
    [debouncedSearch]
  );

  const cleanSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <View className={`relative mb-6 ${isFocused ? "scale-105" : ""}`}>
      <View className="absolute inset-0 bg-blue-500/20 blur-xl rounded-xl" />
      <BlurView
        intensity={80}
        tint="dark"
        className="relative flex-row items-center bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-hidden h-12"
      >
        <View className="pl-5 px-4">
          <Ionicons name="search" size={20} color="#9CA3AF" />
        </View>
        <TextInput
          placeholder="Buscar criptomonedas..."
          placeholderTextColor="#6B7280"
          className="bg-transparent flex-1 text-sm text-white"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        {searchTerm.length > 0 && (
          <Pressable className="px-4 py-3" onPress={cleanSearch}>
            <Ionicons name="close" size={18} color="#9CA3AF" />
          </Pressable>
        )}
      </BlurView>
    </View>
  );
};

export default SearchComponent;
