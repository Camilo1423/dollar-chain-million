import { ListCryptosUseCase } from "@/src/application/use-cases/get-list-crypto/ListCryptos.use-case";

export class HomeViewModel {
  constructor(private readonly listCryptosUseCase: ListCryptosUseCase) {}

  async loadCryptoData({
    start = 0,  
    limit = 100
  }) {
    try {
      const data = await this.listCryptosUseCase.execute(start, limit);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
