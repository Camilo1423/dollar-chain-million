import { CryptoEntity } from "../../../domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../../domain/repositories/ICrypto.repository";

export class SearchAllPageUseCase {
  constructor(private readonly repository: ICryptoRepository) {}

  public async execute(
    term: string,
    maxPages: number
  ): Promise<{ data: CryptoEntity[]; is_search: boolean }> {
    return {
      data: await this.repository.find(term, maxPages),
      is_search: term.length > 0,
    };
  }
}
