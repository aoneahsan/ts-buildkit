import { setCryptoSecret } from 'src/privateModule';

/**
 * Configure the TypeScript Build Kit (ZTK) with the given options.
 *
 * @param {Object} options - The configuration options.
 * @param {string} options.cryptoSecret - The crypto secret value.
 */
export const configureZTK = (options: { cryptoSecret: string }): void => {
  const { cryptoSecret } = options;

  setCryptoSecret(cryptoSecret);
};
