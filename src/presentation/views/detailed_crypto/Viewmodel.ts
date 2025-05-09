import { GetCryptoByIdUseCase } from "@/src/application/use-cases/get-crypto-by-id/GetCryptoById.use-case";
import { CryptoEntity } from "@/src/domain/entities/Crypto.entity";

export class DetailedCryptoViewModel {
  constructor(private readonly getCryptoByIdUseCase: GetCryptoByIdUseCase) {}

  async getCryptoById({ id }: { id: string }): Promise<CryptoEntity> {
    try {
      const data = await this.getCryptoByIdUseCase.execute(id);
      return data;
    } catch (error) {
      console.log(error);
      return {} as CryptoEntity;
    }
  }
}
