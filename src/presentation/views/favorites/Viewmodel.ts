import { GetFavoritesUseCase } from "@/src/application/use-cases/get-favorites/getFavorites.use-case";
import { IsFavoriteUseCase } from "@/src/application/use-cases/is-favorite/isFavorite.use-case";
import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";

export class FavoritesViewModel {
  constructor(
    private readonly getFavoritesUseCase: GetFavoritesUseCase,
    private readonly isFavoriteUseCase: IsFavoriteUseCase
  ) {}

  public async getFavorites(): Promise<CryptoEntity[]> {
    try {
      const favorites = await this.getFavoritesUseCase.execute();
      const favoritesWithIsFavorite = favorites.map((favorite) => ({
        ...favorite,
        is_favorite: this.isFavoriteUseCase.execute(favorite.id),
      }));
      return favoritesWithIsFavorite;
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  }
}
