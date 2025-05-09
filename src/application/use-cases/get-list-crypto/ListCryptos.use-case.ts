import { CryptoEntity } from "../../../domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../../domain/repositories/ICrypto.repository";

export class ListCryptosUseCase {
  private readonly ITEMS_PER_PAGE = 10;
  constructor(private readonly repository: ICryptoRepository) {}

  public async execute(page = 1): Promise<{
    data: CryptoEntity[];
    total: number;
  }> {
    const start = (page - 1) * this.ITEMS_PER_PAGE;
    return this.repository.list(start, this.ITEMS_PER_PAGE);
  }
}
