// import { compare, hash } from 'bcryptjs'

// const ROUND = 12

// export function hashPassword(password: string): Promise<string> {
//   return hash(password, ROUND)
// }

// export function comparePassword(options: {
//   password: string
//   password_hash: string
// }): Promise<boolean> {
//   return compare(options.password, options.password_hash)
// }

import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * @params plainPassword: supplied when signup
 */
export async function hashPassword(plainPassword: string) {
  const hash: string = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
}

/**
 * @params plainPassword: supplied when login
 * @params hashedPassword: looked up from database
 */
export async function checkPassword(
  plainPassword: string,
  hashedPassword: string
) {
  const isMatched: boolean = await bcrypt.compare(
    plainPassword,
    hashedPassword
  );
  return isMatched;
}

// async function main() {
//   console.log(await hashPassword("12345678"));
// }
// main();
