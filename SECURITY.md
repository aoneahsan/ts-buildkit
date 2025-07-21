# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within ts-buildkit, please send an email to [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com). All security vulnerabilities will be promptly addressed.

Please do not report security vulnerabilities through public GitHub issues.

## Security Best Practices

### 1. Cryptographic Configuration

Always configure the library with a strong secret key:

```typescript
import { configureZTK } from 'ts-buildkit';

// DO: Use environment variables
configureZTK({
  cryptoSecret: process.env.CRYPTO_SECRET,
});

// DON'T: Hardcode secrets
configureZTK({
  cryptoSecret: 'my-secret-key', // Never do this in production
});
```

### 2. Secret Key Requirements

Your crypto secret should:

- Be at least 32 characters long
- Be randomly generated
- Be stored securely (environment variables, secret management service)
- Be different for each environment (dev, staging, production)
- Never be committed to version control

### 3. Environment Variables

Example `.env` file (add to `.gitignore`):

```
CRYPTO_SECRET=your-very-long-and-random-secret-key-here
```

### 4. Secure Random Generation

For generating secure tokens or IDs in your application:

```typescript
// Use crypto module for secure random values
import { randomBytes } from 'crypto';

const secureToken = randomBytes(32).toString('hex');
```

### 5. Input Validation

Always validate user input before processing:

```typescript
import {
  isValidEmail,
  validatePhoneNumber,
  containSpecialCharacters,
} from 'ts-buildkit';

// Validate email
if (!isValidEmail(userInput.email)) {
  throw new Error('Invalid email format');
}

// Check for special characters
if (containSpecialCharacters(userInput.username)) {
  throw new Error('Username contains invalid characters');
}
```

### 6. XSS Prevention

When working with HTML content:

```typescript
import { getTextOnly } from 'ts-buildkit';

// Extract plain text from HTML to prevent XSS
const safeText = getTextOnly(untrustedHtml);
```

### 7. Data Encryption

For sensitive data:

```typescript
import { encryptData, decryptData } from 'ts-buildkit';

// Encrypt sensitive data before storage
const encrypted = encryptData({
  creditCard: '1234-5678-9012-3456',
  cvv: '123',
});

// Decrypt when needed
const decrypted = decryptData(encrypted);
```

## Security Considerations

### Known Limitations

1. **Random Generation**: Some utility functions use `Math.random()` for non-security purposes. Do not use these for generating secrets or tokens:

   - `generateUniqueCode()`
   - `generateUUID()`
   - `getZUniqueKey()`

2. **Encryption**: The library uses AES encryption. While secure, ensure you:
   - Use strong secrets
   - Rotate secrets regularly
   - Don't store encrypted data and keys together

### Dependencies

This library has optional peer dependencies. Ensure they are kept up to date:

- `crypto-js`: Used for encryption/decryption
- `dayjs`: Used for date manipulation
- `zod`: Used for schema validation

Run security audits regularly:

```bash
yarn audit
```

## Security Checklist

Before deploying applications using ts-buildkit:

- [ ] Configure strong crypto secret from environment variables
- [ ] Enable HTTPS/TLS for all communications
- [ ] Validate all user inputs
- [ ] Sanitize data before display
- [ ] Keep dependencies updated
- [ ] Run security audits
- [ ] Implement proper authentication and authorization
- [ ] Use secure headers (CSP, HSTS, etc.)
- [ ] Implement rate limiting
- [ ] Log security events

## Contact

For security concerns, contact:

- Email: [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com)
- Website: [https://aoneahsan.com](https://aoneahsan.com)

Please use PGP encryption for sensitive security reports if possible.
