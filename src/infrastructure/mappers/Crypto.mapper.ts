import { CryptoEntity } from '../../domain/entities/Crypto.entity';
import { CryptoDto } from '../dtos/Crypto.dto';

export class CryptoMapper {
  static fromDto(dto: CryptoDto): CryptoEntity {
    return {
      id: dto.id,
      symbol: dto.symbol,
      name: dto.name,
      nameid: dto.nameid,
      rank: dto.rank,
      price_usd: dto.price_usd,
      percent_change_24h: dto.percent_change_24h,
      percent_change_1h: dto.percent_change_1h,
      percent_change_7d: dto.percent_change_7d,
      price_btc: dto.price_btc,
      market_cap_usd: dto.market_cap_usd,
      volume24: dto.volume24,
      volume24a: dto.volume24a,
      csupply: dto.csupply,
      tsupply: dto.tsupply,
      msupply: dto.msupply
    };
  }
}
