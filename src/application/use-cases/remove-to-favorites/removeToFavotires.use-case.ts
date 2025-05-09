import { ICryptoRepository } from "../../../domain/repositories/ICrypto.repository";

export class RemoveToFavoritesUseCase {
  constructor(private readonly repository: ICryptoRepository) {}

  public execute(id: string): void {
    return this.repository.removeFromFavorites(id);
  }
}
