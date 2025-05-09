import { CryptoEntity } from "../../domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../domain/repositories/ICrypto.repository";
import { consoleLog } from "../../shared/helpers/log.helper";
import { AxiosRequest } from "../../shared/remote/api";
import { CryptoMapper } from "../mappers/Crypto.mapper";

export class CryptoApiRepository implements ICryptoRepository {
  constructor(private readonly httpService: AxiosRequest) {}
  async getCryptoById(id: string): Promise<CryptoEntity> {
    try {
      const resp = await this.httpService.ExecutePetition(
        `/ticker/?id=${id}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      );
      const data: any = resp;
      return CryptoMapper.fromDto(data[0]);
    } catch (error) {
      consoleLog("Error in CryptoApiRepository.getCryptoById:", error);
      throw error;
    }
  }
  async find(term: string, maxPages: number): Promise<CryptoEntity[]> {
    try {
      const results: any[] = [];

      for (let i = 0; i < maxPages; i++) {
        const resp = await this.httpService.ExecutePetition(
          `/tickers/?start=${i * 100}&limit=100`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        );
        const data: any = resp;

        const filtered = data.data.filter((c: any) => {
          const normalizedItem = CryptoMapper.fromDto(c);
          return (
            normalizedItem.name.toLowerCase().includes(term.toLowerCase()) ??
            normalizedItem.symbol.toLowerCase().includes(term.toLowerCase())
          );
        });

        results.push(...filtered);

        if (filtered.length > 0) break;
      }

      return results;
    } catch (error) {
      consoleLog("Error in CryptoApiRepository.find:", error);
      throw error;
    }
  }

  async list(
    start: number,
    limit: number
  ): Promise<{
    data: CryptoEntity[];
    total: number;
  }> {
    try {
      const resp = await this.httpService.ExecutePetition(
        `/tickers/?start=${start}&limit=${limit}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      );
      const data: any = resp;
      return {
        data: data.data.map(CryptoMapper.fromDto),
        total: data.info.coins_num,
      };
    } catch (error) {
      consoleLog("Error in CryptoApiRepository.list:", error);
      throw error;
    }
  }
}
