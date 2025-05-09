import { ICryptoRepository } from "../../../domain/repositories/ICrypto.repository";

export class IsFavoriteUseCase {
  constructor(private readonly repository: ICryptoRepository) {}

  public execute(id: string): boolean {
    return this.repository.isFavorite(id);
  }
}
