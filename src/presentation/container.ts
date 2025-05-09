import { GetCryptoByIdUseCase } from "../application/use-cases/get-crypto-by-id/GetCryptoById.use-case";
import { ListCryptosUseCase } from "../application/use-cases/get-list-crypto/ListCryptos.use-case";
import { SearchAllPageUseCase } from "../application/use-cases/search-all-page/SearchAllPage.user-case";
import { CryptoApiRepository } from "../infrastructure/services/CryptoApi.repository";
import { AxiosRequest } from "../shared/remote/api";
import { DetailedCryptoViewModel } from "./views/detailed_crypto/Viewmodel";
import { HomeViewModel } from "./views/home/Viewmodel";

type DependencyKey =
  | "HttpManager"
  | "CryptoRepository"
  | "ListCryptosUseCase"
  | "SearchAllPageUseCase"
  | "GetCryptoByIdUseCase"
  | "HomeViewModel"
  | "DetailedCryptoViewModel";

interface Container {
  resolve<T = any>(key: DependencyKey): T;
}

type Factory = (container: Container) => any;

const registry: Record<DependencyKey, Factory> = {
  HttpManager: () => new AxiosRequest(),

  // Repositories
  CryptoRepository: (c) => new CryptoApiRepository(c.resolve("HttpManager")),

  // Use cases
  SearchAllPageUseCase: (c) =>
    new SearchAllPageUseCase(c.resolve("CryptoRepository")),

  ListCryptosUseCase: (c) =>
    new ListCryptosUseCase(c.resolve("CryptoRepository")),

  GetCryptoByIdUseCase: (c) =>
    new GetCryptoByIdUseCase(c.resolve("CryptoRepository")),

  // ViewModels
  HomeViewModel: (c) =>
    new HomeViewModel(
      c.resolve("ListCryptosUseCase"),
      c.resolve("SearchAllPageUseCase")
    ),

  DetailedCryptoViewModel: (c) =>
    new DetailedCryptoViewModel(c.resolve("GetCryptoByIdUseCase")),
};

const singletons = new Map<string, any>();

const container = {
  resolve<T = any>(key: DependencyKey): T {
    if (!registry[key]) {
      throw new Error(`No dependency found for key: ${key}`);
    }
    if (!singletons.has(key)) {
      singletons.set(key, registry[key](container));
    }
    return singletons.get(key);
  },
};
export { container };
