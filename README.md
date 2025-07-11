# ts-buildkit

A comprehensive TypeScript utility library providing 100+ helper functions for modern web development. Built with full TypeScript support, tree-shaking capabilities, and designed to work seamlessly in both Node.js and browser environments.

[![npm version](https://img.shields.io/npm/v/ts-buildkit.svg)](https://www.npmjs.com/package/ts-buildkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.2.0+-green.svg)](https://nodejs.org/)

## Features

- 🚀 **100+ Utility Functions**: Comprehensive collection of helper functions
- 📦 **Modular Architecture**: Tree-shakeable exports for optimal bundle size
- 🔒 **Type Safety**: Full TypeScript support with strict typing
- 🌐 **Universal**: Works in both Node.js and browser environments
- 🎯 **Zero Dependencies**: Core utilities have no external dependencies
- 🔧 **Extensible**: Optional peer dependencies for advanced features
- 📱 **Platform Aware**: Built-in support for Capacitor and mobile platforms
- 🎮 **Domain Modules**: Specialized modules for gaming and roommate finding

## Installation

```bash
npm install ts-buildkit
# or
yarn add ts-buildkit
# or
pnpm add ts-buildkit
```

### Optional Peer Dependencies

Some features require additional packages. Install only what you need:

```bash
# For cryptography features
npm install crypto-js

# For advanced date handling  
npm install dayjs

# For validation schemas
npm install zod
```

## Quick Start

```typescript
import { 
  isValidEmail, 
  formatUSD, 
  generateSlug,
  generateUUID 
} from 'ts-buildkit';

// Validate email
if (isValidEmail('user@example.com')) {
  console.log('Valid email!');
}

// Format currency
const price = formatUSD(1234.56); // '$1,234.56'

// Generate URL-friendly slugs
const slug = generateSlug('Hello World!'); // 'hello-world'

// Generate unique identifiers
const id = generateUUID(); // '550e8400-e29b-41d4-a716-446655440000'
```

## Configuration

### Cryptography Setup

If using cryptography utilities, configure the library first:

```typescript
import { configureZTK } from 'ts-buildkit';

// Initialize with your secret key
configureZTK({ 
  cryptoSecret: process.env.CRYPTO_SECRET || 'your-secret-key' 
});

// Now you can use crypto functions
import { encryptData, decryptData } from 'ts-buildkit';

const encrypted = encryptData('sensitive information');
const decrypted = decryptData(encrypted);
```

## Core Modules

### String Utilities

```typescript
import { 
  convertToTitleCase,
  truncateString,
  formatCamelCaseToTitle,
  removeLeadingTrailingChars 
} from 'ts-buildkit';

convertToTitleCase('hello world');        // 'Hello world'
truncateString('Long text here', 10);     // 'Long text...'
formatCamelCaseToTitle('helloWorld');     // 'Hello World'
removeLeadingTrailingChars('/path/', '/'); // 'path'
```

### Validation

```typescript
import { 
  validateEmail,
  validatePhoneNumber,
  validateURL,
  isZNonEmptyString 
} from 'ts-buildkit';

// Email validation with domain restriction
validateEmail('user@company.com', ['company.com']); // true

// Phone number validation
const phone = validatePhoneNumber('+1234567890');
// { isValid: true, formatted: '+1 234-567-890' }

// URL validation
const url = validateURL('https://example.com');
// { isValid: true }

// String validation
isZNonEmptyString('hello'); // true
```

### Array Operations

```typescript
import { 
  flattenArray,
  checkEqualityOfTwoArray,
  arrayMoveImmutable 
} from 'ts-buildkit';

flattenArray([[1, 2], [3, 4]]);           // [1, 2, 3, 4]
checkEqualityOfTwoArray(['a', 'b'], ['b', 'a']); // true
arrayMoveImmutable(['a', 'b', 'c'], 0, 2); // ['b', 'c', 'a']
```

### Object Utilities

```typescript
import { 
  isObject,
  getObjectKey,
  isEqual,
  buildFilterObject 
} from 'ts-buildkit';

isObject({ a: 1 });                    // true
getObjectKey({ a: 1, b: 2 }, 2);      // 'b'
isEqual({ a: 1 }, { a: 1 });          // true
buildFilterObject({ a: 1, b: null }); // { a: 1 }
```

### Date & Time

```typescript
import { 
  dayjs,
  getTimeInUnit,
  getRemainingTimeForCountDown,
  TimeUnitEnum 
} from 'ts-buildkit';

// Using dayjs
const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

// Convert time units
getTimeInUnit(3600000, TimeUnitEnum.HOURS); // 1

// Countdown timer
const remaining = getRemainingTimeForCountDown('2024-12-31');
// { days: 45, hours: 12, minutes: 30, seconds: 15 }
```

### Image Handling

```typescript
import { 
  imageUrlToBase64,
  getImageDimensions,
  getImageAspectRatio,
  validateFileBeforeUpload 
} from 'ts-buildkit';

// Convert image URL to base64
const base64 = await imageUrlToBase64('https://example.com/image.jpg');

// Get image dimensions
const dims = await getImageDimensions(imageFile);
// { width: 1920, height: 1080 }

// Calculate aspect ratio
const ratio = await getImageAspectRatio(imageFile); // 1.777...

// Validate file before upload
const validation = validateFileBeforeUpload(file, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png']
});
```

### Permissions & Roles

```typescript
import { 
  hasPermission,
  validateUserPermissions,
  RoleEnum,
  PermissionEnum 
} from 'ts-buildkit';

const userPermissions = ['read', 'write'];

// Check single permission
hasPermission(userPermissions, 'read'); // true

// Validate multiple permissions
validateUserPermissions({
  userPermissions,
  requiredPermissions: ['read'],
  excludedPermissions: ['admin'],
  checkMode: 'AND'
}); // true
```

## Specialized Modules

### Gaming Module

For gaming and gambling applications:

```typescript
import { 
  GameTypeEnum,
  IGame,
  IGameRoom,
  TransactionTypeEnum 
} from 'ts-buildkit/play-and-win';

// Use gaming-specific types and utilities
const game: IGame = {
  id: '123',
  type: GameTypeEnum.POKER,
  minPlayers: 2,
  maxPlayers: 6,
  // ...
};
```

### Roommate Module

For roommate finding applications:

```typescript
import { 
  GenderEnum,
  IPlace,
  IRoommateUser,
  CleanlinessEnum 
} from 'ts-buildkit/roommate';

// Use roommate-specific types
const user: IRoommateUser = {
  id: '123',
  gender: GenderEnum.FEMALE,
  lifestyle: {
    cleanliness: CleanlinessEnum.VERY_TIDY,
    // ...
  }
};
```

## Enums Reference

The library provides extensive enums for type safety:

```typescript
import { 
  RequestTypeEnum,
  ResponseStatusEnum,
  TimeUnitEnum,
  BooleanEnum 
} from 'ts-buildkit';

// HTTP methods
RequestTypeEnum.GET    // 'GET'
RequestTypeEnum.POST   // 'POST'

// Response statuses
ResponseStatusEnum.SUCCESS // 'success'
ResponseStatusEnum.ERROR   // 'error'

// Time units
TimeUnitEnum.HOURS   // 'hours'
TimeUnitEnum.DAYS    // 'days'

// Boolean strings
BooleanEnum.TRUE  // 'true'
BooleanEnum.FALSE // 'false'
```

## Type Definitions

The library exports comprehensive TypeScript types:

```typescript
import type { 
  IGenericObject,
  IPaginationOptions,
  IDefaultDBColumns,
  GeolocationCoordinates 
} from 'ts-buildkit';

// Use in your interfaces
interface User extends IDefaultDBColumns {
  name: string;
  email: string;
}

// Pagination
const options: IPaginationOptions = {
  page: 1,
  limit: 20
};
```

## Error Handling

Built-in error handling utilities:

```typescript
import { 
  reportCustomError,
  getStripeErrorMessageByErrorCode 
} from 'ts-buildkit';

try {
  // Your code
} catch (error) {
  reportCustomError(error, 'Payment processing failed');
}

// Stripe error handling
const message = getStripeErrorMessageByErrorCode('card_declined');
// 'Your card was declined. Please try another payment method.'
```

## Platform Detection

Detect device and platform:

```typescript
import { 
  detectDeviceAndViewMode,
  PlatformTypeEnum,
  CapacitorPlatformEnum 
} from 'ts-buildkit';

const device = detectDeviceAndViewMode();
// { isMobile: false, isTablet: false, isDesktop: true }
```

## Constants

Access predefined constants:

```typescript
import { 
  apiConstants,
  dateFormat,
  mediaScales,
  allowedImageTypes 
} from 'ts-buildkit';

// API defaults
apiConstants.defaultTimeout // 30000

// Date formats
dateFormat.standard // 'YYYY-MM-DD'

// Media breakpoints
mediaScales.mobile  // { min: 0, max: 767 }

// Allowed image types
allowedImageTypes // ['image/jpeg', 'image/png', ...]
```

## Best Practices

### 1. Import Only What You Need

```typescript
// ✅ Good - specific imports for tree shaking
import { isValidEmail, formatUSD } from 'ts-buildkit';

// ❌ Avoid - imports entire library
import * as buildkit from 'ts-buildkit';
```

### 2. Configure Before Using Crypto

```typescript
// ✅ Configure first
import { configureZTK, encryptData } from 'ts-buildkit';

configureZTK({ cryptoSecret: 'secret' });
const encrypted = encryptData('data');

// ❌ Don't use crypto without configuration
const encrypted = encryptData('data'); // Will throw error
```

### 3. Use Type Guards

```typescript
import { isZNonEmptyString, isZValidNumber } from 'ts-buildkit';

function processInput(input: unknown) {
  if (isZNonEmptyString(input)) {
    // TypeScript knows input is string
    return input.toUpperCase();
  }
  
  if (isZValidNumber(input)) {
    // TypeScript knows input is number
    return input * 2;
  }
}
```

### 4. Leverage Enums for Type Safety

```typescript
import { RequestTypeEnum, ResponseStatusEnum } from 'ts-buildkit';

// ✅ Use enums
function makeRequest(method: RequestTypeEnum) {
  // Type safe
}

// ❌ Avoid magic strings
function makeRequest(method: string) {
  // Not type safe
}
```

## API Documentation

For detailed documentation of all functions, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Development

### Requirements

- Node.js >= 22.2.0
- TypeScript >= 5.0

### Setup

```bash
# Clone the repository
git clone https://github.com/zaions/ts-buildkit.git
cd ts-buildkit

# Install dependencies
yarn install

# Run development mode
yarn dev

# Run tests
yarn test

# Build the library
yarn build

# Format code
yarn prettier
```

### Project Structure

```
ts-buildkit/
├── src/
│   ├── utils/          # Core utility functions
│   ├── enums/          # Enumeration definitions
│   ├── types/          # TypeScript type definitions
│   ├── configure/      # Configuration utilities
│   ├── play-and-win/   # Gaming module
│   ├── roommate/       # Roommate module
│   └── packages/       # External package utilities
├── tests/              # Test files
└── dist/              # Built output
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Full Documentation](./API_DOCUMENTATION.md)
- 🐛 [Report Issues](https://github.com/zaions/ts-buildkit/issues)
- 💬 [Discussions](https://github.com/zaions/ts-buildkit/discussions)

## Acknowledgments

Built with ❤️ by the Zaions team.

---

For more examples and detailed API documentation, visit our [comprehensive API guide](./API_DOCUMENTATION.md).