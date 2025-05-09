import { ListCryptosUseCase } from "@/src/application/use-cases/get-list-crypto/ListCryptos.use-case";
import { SearchAllPageUseCase } from "@/src/application/use-cases/search-all-page/SearchAllPage.user-case";
import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";

export class HomeViewModel {
  constructor(
    private readonly listCryptosUseCase: ListCryptosUseCase,
    private readonly searchAllPageUseCase: SearchAllPageUseCase
  ) {}

  async loadCryptoData({ page = 1 }: { page?: number }): Promise<{
    data: CryptoEntity[];
    total: number;
  }> {
    try {
      const data = await this.listCryptosUseCase.execute(page);
      return data;
    } catch (error) {
      console.log(error);
      return {
        data: [],
        total: 0,
      };
    }
  }

  async searchCrypto(
    term: string,
    maxPages: number
  ): Promise<{
    data: CryptoEntity[];
    is_search: boolean;
  }> {
    try {
      const data = await this.searchAllPageUseCase.execute(term, maxPages);
      return data;
    } catch (error) {
      console.log(error);
      return {
        data: [],
        is_search: false,
      };
    }
  }
}
