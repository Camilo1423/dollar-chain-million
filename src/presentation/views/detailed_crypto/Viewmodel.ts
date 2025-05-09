import { AddToFavoritesUseCase } from "@/src/application/use-cases/add-to-favorites/addToFavorites.use-case";
import { GetCryptoByIdUseCase } from "@/src/application/use-cases/get-crypto-by-id/GetCryptoById.use-case";
import { IsFavoriteUseCase } from "@/src/application/use-cases/is-favorite/isFavorite.use-case";
import { RemoveToFavoritesUseCase } from "@/src/application/use-cases/remove-to-favorites/removeToFavotires.use-case";
import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";

export class DetailedCryptoViewModel {
  constructor(
    private readonly getCryptoByIdUseCase: GetCryptoByIdUseCase,
    private readonly addToFavoritesUseCase: AddToFavoritesUseCase,
    private readonly removeToFavoritesUseCase: RemoveToFavoritesUseCase,
    private readonly isFavoriteUseCase: IsFavoriteUseCase
  ) {}

  async getCryptoById({ id }: { id: string }): Promise<CryptoEntity> {
    try {
      const data = await this.getCryptoByIdUseCase.execute(id);
      data.is_favorite = this.isFavorite({ id });
      return data;
    } catch (error) {
      console.log(error);
      return {} as CryptoEntity;
    }
  }

  addToFavorites({ id }: { id: string }): void {
    try {
      this.addToFavoritesUseCase.execute(id);
    } catch (error) {
      console.log(error);
    }
  }

  removeFromFavorites({ id }: { id: string }): void {
    try {
      this.removeToFavoritesUseCase.execute(id);
    } catch (error) {
      console.log(error);
    }
  }

  isFavorite({ id }: { id: string }): boolean {
    try {
      return this.isFavoriteUseCase.execute(id);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
