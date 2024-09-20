import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { randomBytes, pbkdf2, createHash } from 'node:crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function hashPassword(
  password: string
): Promise<{ hash: string; salt: string }> {
  const salt = randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (error, derivedKey) => {
      if (error) {
        return reject(error);
      }
      return resolve({ hash: derivedKey.toString('hex'), salt });
    });
  });
}
export async function comparePassword(
  password: string,
  salt: string,
  hash: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (error, derivedKey) => {
      if (error) {
        return reject(error);
      }
      return resolve(hash === derivedKey.toString('hex'));
    });
  });
}
export function md5hash(text: string) {
  return createHash('md5').update(text).digest('hex');
}
export function getInitials(name: string): string {
  if (!name) return '';

  const words = name.trim().split(' ');
  const initials = words.map((word) => word[0].toUpperCase()).join('');

  return initials;
}
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
