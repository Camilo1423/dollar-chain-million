import { CryptoEntity } from "../../../domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../../domain/repositories/ICrypto.repository";

export class GetCryptoByIdUseCase {
  constructor(private readonly repository: ICryptoRepository) {}

  public async execute(id: string): Promise<CryptoEntity> {
    return this.repository.getCryptoById(id);
  }
}
