import { CryptoEntity } from '../entities/Crypto.entity';

export interface ICryptoRepository {
  list(start: number, limit: number): Promise<CryptoEntity[]>;
}