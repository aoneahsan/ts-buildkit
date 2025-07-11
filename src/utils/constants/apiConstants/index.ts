/**
 * Constants for API header keys.
 * Note: Do not store actual tokens here. Use environment variables or secure configuration.
 */
export const apiHeaderKeys = {
  authToken: 'x-auth-token', // Header key name, not the actual token value
  authorization: 'authorization',
  contentType: 'content-type',
  accept: 'accept',
} as const;
