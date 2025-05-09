import { ListCryptosUseCase } from "../../../../src/application/use-cases/get-list-crypto/ListCryptos.use-case";
import { CryptoEntity } from "../../../../src/domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../../../src/domain/repositories/ICrypto.repository";

describe("ListCryptosUseCase", () => {
  let useCase: ListCryptosUseCase;
  let mockRepository: jest.Mocked<ICryptoRepository>;

  beforeEach(() => {
    mockRepository = {
      list: jest.fn(),
      find: jest.fn(),
      addToFavorites: jest.fn(),
      removeFromFavorites: jest.fn(),
      isFavorite: jest.fn(),
      getFavorites: jest.fn(),
      getCryptoById: jest.fn(),
    };
    useCase = new ListCryptosUseCase(mockRepository);
  });

  it("should return paginated crypto list", async () => {
    const mockData: CryptoEntity[] = [
      {
        id: "1",
        symbol: "BTC",
        name: "Bitcoin",
        nameid: "bitcoin",
        rank: 1,
        price_usd: "50000",
        percent_change_24h: "5.0",
        percent_change_1h: "0.1",
        percent_change_7d: "2.0",
        price_btc: "1.0",
        market_cap_usd: "1000000000",
        volume24: 1000000,
        volume24a: 1000000,
        csupply: "19000000",
        tsupply: "21000000",
        msupply: "21000000",
        is_favorite: false,
      },
    ];
    const mockResponse = {
      data: mockData,
      total: 100,
    };

    mockRepository.list.mockResolvedValue(mockResponse);

    const result = await useCase.execute(1);

    expect(mockRepository.list).toHaveBeenCalledWith(0, 10);
    expect(result).toEqual(mockResponse);
  });

  it("should handle different page numbers correctly", async () => {
    const mockData: CryptoEntity[] = [];
    const mockResponse = {
      data: mockData,
      total: 100,
    };

    mockRepository.list.mockResolvedValue(mockResponse);

    await useCase.execute(2);

    expect(mockRepository.list).toHaveBeenCalledWith(10, 10);
  });
}); 