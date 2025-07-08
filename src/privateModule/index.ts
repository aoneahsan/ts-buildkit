let _cryptoSecret: string | null = null;

/**
 * Get the crypto secret value.
 *
 * @returns {string} The crypto secret value.
 * @throws {Error} If the crypto secret is not set.
 */
export const getCryptoSecret = (): string => {
  if (!_cryptoSecret || _cryptoSecret?.trim()?.length <= 0) {
    throw new Error(
      'ts-tool-kit needs "cryptoSecret" value, call "configureZTK" to set that'
    );
  }

  return _cryptoSecret;
};

/**
 * Set the crypto secret value.
 *
 * @param {string} val - The crypto secret value.
 */
export const setCryptoSecret = (val: string): void => {
  _cryptoSecret = val;
};
