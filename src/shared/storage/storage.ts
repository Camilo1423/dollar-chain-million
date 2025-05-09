import { MMKV } from "react-native-mmkv";

export class Storage {
  private static instance: Storage;
  private readonly storage: MMKV;

  private constructor() {
    this.storage = new MMKV({
      id: "dollar-chain-storage",
      encryptionKey: "dollar-chain-key",
    });
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  // Set a value in storage
  public set<T>(key: string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value);
      this.storage.set(key, jsonValue);
    } catch (error) {
      console.error("Error setting value in storage:", error);
    }
  }

  // Get a value from storage
  public get<T>(key: string): T | null {
    try {
      const jsonValue = this.storage.getString(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Error getting value from storage:", error);
      return null;
    }
  }

  // Remove a value from storage
  public remove(key: string): void {
    try {
      this.storage.delete(key);
    } catch (error) {
      console.error("Error removing value from storage:", error);
    }
  }

  // Clear all storage
  public clearAll(): void {
    try {
      this.storage.clearAll();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }

  // Check if a key exists
  public contains(key: string): boolean {
    return this.storage.contains(key);
  }

  // Get all keys
  public getAllKeys(): string[] {
    return this.storage.getAllKeys();
  }
}
