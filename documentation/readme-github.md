# ZTK - Zaions Tool Kit

[![npm version](https://img.shields.io/npm/v/ts-tool-kit.svg)](https://www.npmjs.com/package/ts-tool-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue)](https://www.typescriptlang.org/)

A comprehensive TypeScript utility library providing a wide range of tools for modern web development.

## Features

- 🔒 **Secure Cryptography** - AES encryption/decryption utilities
- 🧩 **Type Safety** - Extensive TypeScript type definitions and enums
- 🛠️ **Utility Functions** - 100+ helper functions for common tasks
- 🎮 **Gaming Support** - Specialized utilities for gaming applications
- 🔍 **Validation** - Form validation, permission checking, and more
- 📦 **Modular Design** - Import only what you need

## Installation

```bash
# Using npm
npm install ts-tool-kit

# Using yarn
yarn add ts-tool-kit

# Using pnpm
pnpm add ts-tool-kit
```

## Quick Start

```typescript
import { configureZTK, isValidEmail, generateUUID } from 'ts-tool-kit';

// Configure the library (required for crypto functions)
configureZTK({
  cryptoSecret: 'your-secure-secret-key',
});

// Use utility functions
const email = 'test@example.com';
console.log(isValidEmail(email)); // true

const uuid = generateUUID();
console.log(uuid); // e.g., '550e8400-e29b-41d4-a716-446655440000'
```

## Core Modules

### Cryptography

Secure encryption and decryption utilities:

```typescript
import {
  encryptData,
  decryptData,
  encryptWithSecretKey,
  decryptWithSecretKey,
} from 'ts-tool-kit';

// Using explicit secret key
const encrypted = encryptData('sensitive data', 'your-secret-key');
const decrypted = decryptData(encrypted, 'your-secret-key');

// Using configured secret key
const encryptedWithConfig = encryptWithSecretKey('sensitive data');
const decryptedWithConfig = decryptWithSecretKey(encryptedWithConfig);
```

See [Cryptography Documentation](./cryptography.md) for more details.

### Validation

Comprehensive validation utilities:

```typescript
import {
  isValidEmail,
  isValidUrl,
  validatePhoneNumber,
  validateRequiredPermissions,
  PermissionCheckModeEnum,
} from 'ts-tool-kit';

// Basic validation
isValidEmail('user@example.com'); // true
isValidUrl('https://example.com'); // true
validatePhoneNumber('+923001234567'); // true

// Permission validation
validateRequiredPermissions({
  userPermissions: ['read', 'write'],
  requiredPermissions: ['read'],
  checkModeForRequiredPermissions: PermissionCheckModeEnum.every,
}); // true
```

See [Validation Documentation](./validation.md) for more details.

### String Manipulation

Utilities for working with strings:

```typescript
import {
  truncateString,
  convertToTitleCase,
  generateSlug,
  escapeRegex,
  containSpecialCharacters,
} from 'ts-tool-kit';

truncateString('This is a long text that will be truncated', 20); // 'This is a long text...'
convertToTitleCase('hello world'); // 'Hello World'
generateSlug('This is a title!'); // 'this-is-a-title'
escapeRegex('(test)'); // '\\(test\\)'
containSpecialCharacters('test@123'); // true
```

See [String Utilities Documentation](./string-utilities.md) for more details.

### Array Utilities

Functions for array manipulation:

```typescript
import {
  flattenArray,
  arrayMoveMutable,
  arrayMoveImmutable,
  checkEqualityOfTwoArray,
} from 'ts-tool-kit';

// Flatten nested arrays
flattenArray([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]

// Move array elements (mutating original)
const arr1 = [1, 2, 3, 4];
arrayMoveMutable(arr1, 0, 2);
console.log(arr1); // [2, 3, 1, 4]

// Move array elements (non-mutating)
const arr2 = [1, 2, 3, 4];
const newArr = arrayMoveImmutable(arr2, 0, 2);
console.log(newArr); // [2, 3, 1, 4]
console.log(arr2); // [1, 2, 3, 4] (unchanged)

// Compare arrays
checkEqualityOfTwoArray([1, 2, 3], [1, 2, 3]); // true
```

See [Array Utilities Documentation](./array-utilities.md) for more details.

### Type Checking

Robust type checking utilities:

```typescript
import {
  isArray,
  isObject,
  isFunction,
  isNullOrUndefined,
  isNotNullOrUndefined,
  isStringVariable,
  isZValidNumber,
} from 'ts-tool-kit';

isArray([1, 2, 3]); // true
isArray([1, 2, 3], true); // true (checks length > 0)
isObject({ name: 'John' }); // true
isFunction(() => {}); // true
isNullOrUndefined(null); // true
isNotNullOrUndefined('value'); // true
isStringVariable('test'); // true
isZValidNumber(123); // true
```

See [Type Checking Documentation](./type-checking.md) for more details.

### Date and Time

Utilities for working with dates and times:

```typescript
import {
  dayjs,
  dateFormat,
  getDateFromFrbTimestamp,
  convertToDateTimestampToStoreInDB,
  getRemainingTimeForCountDown,
} from 'ts-tool-kit';

// Format dates
dateFormat(new Date(), 'YYYY-MM-DD'); // e.g., '2023-05-15'

// Work with Firebase timestamps
const timestamp = convertToDateTimestampToStoreInDB(new Date());
const date = getDateFromFrbTimestamp(timestamp);

// Get countdown time
const remaining = getRemainingTimeForCountDown(new Date(Date.now() + 3600000));
console.log(remaining); // e.g., { hours: 1, minutes: 0, seconds: 0 }
```

See [Date Utilities Documentation](./date-utilities.md) for more details.

### URL Handling

Functions for working with URLs:

```typescript
import {
  isValidUrl,
  addUrlProtocolHandler,
  containQueryParams,
  hasLeadingOrTrailingSlash,
  removeLeadingTrailingBackslash,
  replaceUrlDynamicParts,
} from 'ts-tool-kit';

isValidUrl('https://example.com'); // true
addUrlProtocolHandler('example.com'); // 'https://example.com'
containQueryParams('https://example.com?param=value'); // true
hasLeadingOrTrailingSlash('/path/'); // true
removeLeadingTrailingBackslash('/path/'); // 'path'
replaceUrlDynamicParts('/users/:id/profile', { id: '123' }); // '/users/123/profile'
```

See [URL Utilities Documentation](./url-utilities.md) for more details.

### CSS Class Name Utilities

Utilities for managing CSS class names:

```typescript
import { classNames, classNamesBind, classNamesDedupe } from 'ts-tool-kit';

classNames('foo', 'bar'); // 'foo bar'
classNames('foo', { bar: true, baz: false }); // 'foo bar'
classNames({ 'foo-bar': true }); // 'foo-bar'
classNames({ 'foo-bar': false }); // ''
classNames({ foo: true }, { bar: true }); // 'foo bar'
classNames(['foo', 'bar']); // 'foo bar'

// With binding
const cx = classNamesBind();
cx('foo', { bar: true }); // 'foo bar'

// Remove duplicates
classNamesDedupe('foo foo bar'); // 'foo bar'
```

See [CSS Class Utilities Documentation](./css-class-utilities.md) for more details.

### Coupon Code Generation

Utilities for generating and validating coupon codes:

```typescript
import {
  generateCouponCode,
  validateCouponCode,
  checkIfCouponCodeHasBadWord,
} from 'ts-tool-kit';

// Generate a coupon code
const coupon = generateCouponCode(); // e.g., 'ABCD-EFGH-IJKL'
const customCoupon = generateCouponCode({ parts: 2, partLen: 5 }); // e.g., 'ABCDE-FGHIJ'

// Validate a coupon code
validateCouponCode('ABCD-EFGH-IJKL'); // true

// Check for inappropriate words
checkIfCouponCodeHasBadWord('ABCD-EFGH-IJKL'); // false
```

See [Coupon Code Documentation](./coupon-code.md) for more details.

### Enums

ZTK provides a wide range of enums for consistent type-safe coding:

```typescript
import {
  _UserRoleEnum,
  PermissionEnum,
  RoleEnum,
  FormFieldsEnum,
  ResponseStatusEnum,
  varTypesEnum,
} from 'ts-tool-kit';

// User roles
const adminRole = _UserRoleEnum.admin; // 2

// Permission checking
const readPermission = PermissionEnum.read; // 1

// Form fields
const emailField = FormFieldsEnum.email; // 'email'

// Variable types
const stringType = varTypesEnum.STRING; // 'string'
```

See [Enums Documentation](./enums.md) for a complete list of available enums.

### Types

ZTK includes many TypeScript types and interfaces:

```typescript
import type {
  IGenericObject,
  IHasRequiredPermissions,
  IPaginationOptions,
  DBItemGenericDataType,
  FormItemGenericDataType,
} from 'ts-tool-kit';

// Generic object
const obj: IGenericObject = { key: 'value' };

// Pagination options
const pagination: IPaginationOptions = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortDirection: 'desc',
};
```

See [Types Documentation](./types.md) for more details on available types.

## Gaming Support

ZTK includes specialized utilities for gaming applications:

```typescript
import {
  // Play and Win module
  IGame,
  IGameRoom,
  ITransaction,
  IUser,
  ITopUp,
  IWithdraw,
} from 'ts-tool-kit/play-and-win';
```

See [Gaming Support Documentation](./gaming-support.md) for more details.

## Permission Management

ZTK provides a robust permission management system:

```typescript
import {
  validateRequiredPermissions,
  validateExcludedPermissions,
  hasPermission,
  getPermissions,
  mapPermissionsToStrings,
  PermissionCheckModeEnum,
  PermissionEnum,
} from 'ts-tool-kit';

// Check if user has all required permissions
const hasAllPermissions = validateRequiredPermissions({
  userPermissions: [PermissionEnum.read, PermissionEnum.write],
  requiredPermissions: [PermissionEnum.read],
  checkModeForRequiredPermissions: PermissionCheckModeEnum.every,
}); // true

// Check if user has any of the required permissions
const hasAnyPermission = validateRequiredPermissions({
  userPermissions: [PermissionEnum.read],
  requiredPermissions: [PermissionEnum.read, PermissionEnum.write],
  checkModeForRequiredPermissions: PermissionCheckModeEnum.any,
}); // true

// Check if user doesn't have excluded permissions
const hasNoExcludedPermissions = validateExcludedPermissions({
  userPermissions: [PermissionEnum.read],
  excludedPermissions: [PermissionEnum.delete],
}); // true

// Check for a specific permission
const canRead = hasPermission({
  userPermissions: [PermissionEnum.read, PermissionEnum.write],
  permission: PermissionEnum.read,
}); // true
```

See [Permission Management Documentation](./permission-management.md) for more details.

## Form Validation

ZTK includes utilities for form validation:

```typescript
import {
  validateEmail,
  validatePhoneNumber,
  validateURL,
  fieldsValidation,
} from 'ts-tool-kit';

// Validate email
validateEmail('user@example.com'); // true

// Validate phone number
validatePhoneNumber('+923001234567'); // true

// Validate URL
validateURL('https://example.com'); // true

// Access validation rules
const titleRules = fieldsValidation.generic.title;
console.log(titleRules.min.val); // 1
console.log(titleRules.max.val); // 100
```

See [Form Validation Documentation](./form-validation.md) for more details.

## Image Processing

Utilities for working with images:

```typescript
import {
  getImageDimensions,
  getImageAspectRatio,
  imageTypeAllowed,
  imageUrlToBase64,
  getImageBase64Url,
  validateFileBeforeUpload,
  allowedImageTypes,
} from 'ts-tool-kit';

// Check if image type is allowed
imageTypeAllowed('image/jpeg'); // true

// Get image dimensions from a File object
getImageDimensions(imageFile).then((dimensions) => {
  console.log(dimensions.width, dimensions.height);
});

// Convert image URL to base64
imageUrlToBase64('https://example.com/image.jpg').then((base64) => {
  console.log(base64); // data:image/jpeg;base64,...
});

// Validate file before upload
validateFileBeforeUpload({
  file: imageFile,
  maxSizeInMB: 2,
  allowedTypes: allowedImageTypes,
}).then((result) => {
  if (result.isValid) {
    // File is valid
  } else {
    console.error(result.errorMessage);
  }
});
```

See [Image Processing Documentation](./image-processing.md) for more details.

## Firebase Utilities

ZTK includes utilities for working with Firebase:

```typescript
import {
  frbCollectionQueryDefaults,
  getDateFromFrbTimestamp,
  convertToDateTimestampToStoreInDB,
  FrbOrderbyDirectionEnum,
  FrbWhereConditionEnum,
  DBColumnKeysShortFormEnum,
} from 'ts-tool-kit';

// Default query parameters
const defaults = frbCollectionQueryDefaults;
console.log(defaults.limit); // 10

// Convert JavaScript Date to Firebase timestamp
const timestamp = convertToDateTimestampToStoreInDB(new Date());

// Convert Firebase timestamp to JavaScript Date
const date = getDateFromFrbTimestamp(timestamp);

// Use Firebase enums
const orderDirection = FrbOrderbyDirectionEnum.desc;
const whereCondition = FrbWhereConditionEnum.equalTo;
```

See [Firebase Utilities Documentation](./firebase-utilities.md) for more details.

## Specialized Modules

ZTK includes specialized modules for specific use cases:

### Play and Win Module

```typescript
import {
  IGame,
  IGameRoom,
  IUser,
  ITransaction,
} from 'ts-tool-kit/play-and-win';
```

### Roommate Module

```typescript
import { ConstellationsEnum, constellationsVal } from 'ts-tool-kit/roommate';
```

### Zod Integration

```typescript
import { numericEnum } from 'ts-tool-kit/require-package/zod';
```

### Day.js Integration

```typescript
import { dayjs } from 'ts-tool-kit/require-package/dayjs';
```

See [Specialized Modules Documentation](./specialized-modules.md) for more details.

## Browser Compatibility

ZTK is compatible with all modern browsers (Chrome, Firefox, Safari, Edge) and Node.js environments.

## Tree-Shaking

ZTK is designed with tree-shaking in mind. When using a bundler like webpack, Rollup, or Parcel, only the functions you actually import will be included in your final bundle.

## Documentation

For complete documentation, visit our [documentation site](https://zaions.github.io/tool-kit/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Zaions
