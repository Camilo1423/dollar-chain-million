import { AddToFavoritesUseCase } from "../../../../src/application/use-cases/add-to-favorites/addToFavorites.use-case";
import { ICryptoRepository } from "../../../../src/domain/repositories/ICrypto.repository";

describe("AddToFavoritesUseCase", () => {
  let useCase: AddToFavoritesUseCase;
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
    useCase = new AddToFavoritesUseCase(mockRepository);
  });

  it("should add crypto to favorites", () => {
    const cryptoId = "1";
    useCase.execute(cryptoId);
    expect(mockRepository.addToFavorites).toHaveBeenCalledWith(cryptoId);
  });

  it("should handle empty crypto id", () => {
    const cryptoId = "";
    useCase.execute(cryptoId);
    expect(mockRepository.addToFavorites).toHaveBeenCalledWith(cryptoId);
  });
}); 