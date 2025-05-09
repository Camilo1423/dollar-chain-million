import { CryptoEntity } from "../../../domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../../domain/repositories/ICrypto.repository";
import { consoleLog } from "../../../shared/helpers/log.helper";

export class ListCryptosUseCase {
  constructor(private readonly repository: ICryptoRepository) {}

  public async execute(start = 0, limit = 100): Promise<CryptoEntity[]> {
    consoleLog("ListCryptosUseCase");
    return this.repository.list(start, limit);
  }
}
