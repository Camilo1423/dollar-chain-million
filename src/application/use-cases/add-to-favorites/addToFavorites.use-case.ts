import { ICryptoRepository } from "../../../domain/repositories/ICrypto.repository";

export class AddToFavoritesUseCase {
  constructor(private readonly repository: ICryptoRepository) {}

  public execute(id: string): void {
    return this.repository.addToFavorites(id);
  }
}
