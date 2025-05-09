import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../../domain/repositories/ICrypto.repository";

export class GetFavoritesUseCase {
  constructor(private readonly repository: ICryptoRepository) {}

  public execute(): Promise<CryptoEntity[]> {
    return this.repository.getFavorites();
  }
}
