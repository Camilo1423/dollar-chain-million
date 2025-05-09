import { CryptoEntity } from "../entities/Crypto.entity";

export interface ICryptoRepository {
  list(
    start: number,
    limit: number
  ): Promise<{
    data: CryptoEntity[];
    total: number;
  }>;
  find(term: string, maxPages: number): Promise<CryptoEntity[]>;

  getCryptoById(id: string): Promise<CryptoEntity>;
}
