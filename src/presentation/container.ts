import { AddToFavoritesUseCase } from "../application/use-cases/add-to-favorites/addToFavorites.use-case";
import { GetCryptoByIdUseCase } from "../application/use-cases/get-crypto-by-id/GetCryptoById.use-case";
import { GetFavoritesUseCase } from "../application/use-cases/get-favorites/getFavorites.use-case";
import { ListCryptosUseCase } from "../application/use-cases/get-list-crypto/ListCryptos.use-case";
import { IsFavoriteUseCase } from "../application/use-cases/is-favorite/isFavorite.use-case";
import { RemoveToFavoritesUseCase } from "../application/use-cases/remove-to-favorites/removeToFavotires.use-case";
import { SearchAllPageUseCase } from "../application/use-cases/search-all-page/SearchAllPage.user-case";
import { CryptoApiRepository } from "../infrastructure/services/CryptoApi.repository";
import { AxiosRequest } from "../shared/remote/api";
import { Storage } from "../shared/storage/storage";
import { DetailedCryptoViewModel } from "./views/detailed_crypto/Viewmodel";
import { FavoritesViewModel } from "./views/favorites/Viewmodel";
import { HomeViewModel } from "./views/home/Viewmodel";

type DependencyKey =
  | "HttpManager"
  | "Storage"
  | "CryptoRepository"
  | "ListCryptosUseCase"
  | "SearchAllPageUseCase"
  | "GetCryptoByIdUseCase"
  | "AddToFavoritesUseCase"
  | "RemoveToFavoritesUseCase"
  | "IsFavoriteUseCase"
  | "GetFavoritesUseCase"
  | "HomeViewModel"
  | "DetailedCryptoViewModel"
  | "FavoritesViewModel";

interface Container {
  resolve<T = any>(key: DependencyKey): T;
}

type Factory = (container: Container) => any;

const registry: Record<DependencyKey, Factory> = {
  HttpManager: () => new AxiosRequest(),
  Storage: () => Storage.getInstance(),

  // Repositories
  CryptoRepository: (c) =>
    new CryptoApiRepository(c.resolve("HttpManager"), c.resolve("Storage")),

  // Use cases
  SearchAllPageUseCase: (c) =>
    new SearchAllPageUseCase(c.resolve("CryptoRepository")),

  ListCryptosUseCase: (c) =>
    new ListCryptosUseCase(c.resolve("CryptoRepository")),

  GetCryptoByIdUseCase: (c) =>
    new GetCryptoByIdUseCase(c.resolve("CryptoRepository")),

  AddToFavoritesUseCase: (c) =>
    new AddToFavoritesUseCase(c.resolve("CryptoRepository")),

  RemoveToFavoritesUseCase: (c) =>
    new RemoveToFavoritesUseCase(c.resolve("CryptoRepository")),

  IsFavoriteUseCase: (c) =>
    new IsFavoriteUseCase(c.resolve("CryptoRepository")),

  GetFavoritesUseCase: (c) =>
    new GetFavoritesUseCase(c.resolve("CryptoRepository")),

  // ViewModels
  HomeViewModel: (c) =>
    new HomeViewModel(
      c.resolve("ListCryptosUseCase"),
      c.resolve("SearchAllPageUseCase"),
      c.resolve("IsFavoriteUseCase")
    ),

  DetailedCryptoViewModel: (c) =>
    new DetailedCryptoViewModel(
      c.resolve("GetCryptoByIdUseCase"),
      c.resolve("AddToFavoritesUseCase"),
      c.resolve("RemoveToFavoritesUseCase"),
      c.resolve("IsFavoriteUseCase")
    ),

  FavoritesViewModel: (c) =>
    new FavoritesViewModel(
      c.resolve("GetFavoritesUseCase"),
      c.resolve("IsFavoriteUseCase")
    ),
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
