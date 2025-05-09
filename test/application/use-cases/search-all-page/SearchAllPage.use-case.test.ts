import { SearchAllPageUseCase } from "../../../../src/application/use-cases/search-all-page/SearchAllPage.user-case";
import { CryptoEntity } from "../../../../src/domain/entities/Crypto.entity";
import { ICryptoRepository } from "../../../../src/domain/repositories/ICrypto.repository";

describe("SearchAllPageUseCase", () => {
  let useCase: SearchAllPageUseCase;
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
    useCase = new SearchAllPageUseCase(mockRepository);
  });

  it("should return search results when term is provided", async () => {
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

    mockRepository.find.mockResolvedValue(mockData);

    const result = await useCase.execute("bitcoin", 5);

    expect(mockRepository.find).toHaveBeenCalledWith("bitcoin", 5);
    expect(result).toEqual({
      data: mockData,
      is_search: true,
    });
  });

  it("should return empty results when term is empty", async () => {
    const mockData: CryptoEntity[] = [];

    mockRepository.find.mockResolvedValue(mockData);

    const result = await useCase.execute("", 5);

    expect(mockRepository.find).toHaveBeenCalledWith("", 5);
    expect(result).toEqual({
      data: mockData,
      is_search: false,
    });
  });
}); 