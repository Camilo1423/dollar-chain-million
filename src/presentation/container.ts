import { ListCryptosUseCase } from "../application/use-cases/get-list-crypto/ListCryptos.use-case";
import { CryptoApiRepository } from "../infrastructure/services/CryptoApi.repository";
import { AxiosRequest } from "../shared/remote/api";
import { HomeViewModel } from "./views/home/Viewmodel";

type DependencyKey =
  | "HttpManager"
  | "CryptoRepository"
  | "ListCryptosUseCase"
  | "HomeViewModel";

interface Container {
  resolve<T = any>(key: DependencyKey): T;
}

type Factory = (container: Container) => any;

const registry: Record<DependencyKey, Factory> = {
  HttpManager: () => new AxiosRequest(),

  CryptoRepository: (c) => new CryptoApiRepository(c.resolve("HttpManager")),

  ListCryptosUseCase: (c) =>
    new ListCryptosUseCase(c.resolve("CryptoRepository")),

  HomeViewModel: (c) => new HomeViewModel(c.resolve("ListCryptosUseCase")),
};

const singletons = new Map<string, any>();

const container = {
  resolve<T = any>(key: DependencyKey): T {
    if (!registry[key]) {
      throw new Error(`No dependency found for key: ${key}`);
    }
    if (!singletons.has(key)) {
      console.log("⛏️ Creando:", key); // <- aquí ves si HomeViewModel se está creando
      singletons.set(key, registry[key](container));
    }
    return singletons.get(key);
  },
};
export { container };
