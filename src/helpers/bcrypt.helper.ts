import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

const configService = new ConfigService();
const bcryptSecret = configService.get<string>('BCRYPT_SECRET');

/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds, bcryptSecret);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

/**
 * Checks if a password is already hashed.
 * @param password - The password to check.
 * @returns True if the password is hashed, false otherwise.
 */
export function isHashed(password: string): boolean {
  const bcryptHashRegex = /^\$2[ayb]\$.{56}$/;
  return bcryptHashRegex.test(password);
}

/**
 * Compares a password with a hashed password.
 * @param password - The password to compare.
 * @param hashedPassword - The hashed password to compare with.
 * @returns True if the password matches the hashed password, false otherwise.
 */
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Generates a strong password.
 * @param length - The length of the password.
 * @returns The generated password.
 */
export function generateStrongPassword(length: number = 12): string {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}
