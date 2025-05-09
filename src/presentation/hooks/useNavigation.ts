import { useRouter } from "expo-router";

export const useNavigation = () => {
  const router = useRouter();

  const navigateToCryptoDetail = (id: string, name: string) => {
    router.push({
      pathname: "/crypto/[id]",
      params: { id, name }
    });
  };

  return {
    navigateToCryptoDetail
  };
}; 