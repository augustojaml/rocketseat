import { compare, hash } from 'bcrypt';

class HashPassword {
  public static async hash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public static async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { HashPassword };
