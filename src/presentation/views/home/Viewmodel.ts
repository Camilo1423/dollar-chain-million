import { ListCryptosUseCase } from "@/src/application/use-cases/get-list-crypto/ListCryptos.use-case";
import { IsFavoriteUseCase } from "@/src/application/use-cases/is-favorite/isFavorite.use-case";
import { SearchAllPageUseCase } from "@/src/application/use-cases/search-all-page/SearchAllPage.user-case";
import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";

export class HomeViewModel {
  constructor(
    private readonly listCryptosUseCase: ListCryptosUseCase,
    private readonly searchAllPageUseCase: SearchAllPageUseCase,
    private readonly isFavoriteUseCase: IsFavoriteUseCase
  ) {}

  async loadCryptoData({ page = 1 }: { page?: number }): Promise<{
    data: CryptoEntity[];
    total: number;
  }> {
    try {
      const data = await this.listCryptosUseCase.execute(page);
      const dataWithFavorites = data.data.map((crypto) => {
        return {
          ...crypto,
          is_favorite: this.isFavoriteUseCase.execute(crypto.id),
        };
      });
      return {
        data: dataWithFavorites,
        total: data.total,
      };
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
      const dataWithFavorites = data.data.map((crypto) => ({
        ...crypto,
        is_favorite: this.isFavoriteUseCase.execute(crypto.id),
      }));
      return {
        data: dataWithFavorites,
        is_search: data.is_search,
      };
    } catch (error) {
      console.log(error);
      return {
        data: [],
        is_search: false,
      };
    }
  }
}
