import { CryptoEntity } from "../../domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../domain/repositories/ICrypto.repository";
import { consoleLog } from "../../shared/helpers/log.helper";
import { AxiosRequest } from "../../shared/remote/api";
import { CryptoDto } from "../dtos/Crypto.dto";
import { CryptoMapper } from "../mappers/Crypto.mapper";

export class CryptoApiRepository implements ICryptoRepository {
  constructor(private readonly httpService: AxiosRequest) {}

  async list(start: number, limit: number): Promise<CryptoEntity[]> {
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
      return data.data.map(CryptoMapper.fromDto);
    } catch (error) {
      consoleLog("Error in CryptoApiRepository.list:", error);
      throw error;
    }
  }
}
