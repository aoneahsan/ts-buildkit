# ts-buildkit API Documentation

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Core Utilities](#core-utilities)
  - [String Utilities](#string-utilities)
  - [Number Utilities](#number-utilities)
  - [Array Utilities](#array-utilities)
  - [Object Utilities](#object-utilities)
  - [Validation Utilities](#validation-utilities)
  - [URL and Web Utilities](#url-and-web-utilities)
  - [Image Utilities](#image-utilities)
  - [Date and Time Utilities](#date-and-time-utilities)
  - [Cryptography Utilities](#cryptography-utilities)
  - [Database Utilities](#database-utilities)
  - [Permission Utilities](#permission-utilities)
  - [Error Handling](#error-handling)
  - [Device Detection](#device-detection)
  - [Miscellaneous Utilities](#miscellaneous-utilities)
- [Enums](#enums)
- [Types and Interfaces](#types-and-interfaces)
- [Gaming Module](#gaming-module)
- [Roommate Module](#roommate-module)
- [Constants](#constants)

## Installation

```bash
npm install ts-buildkit
# or
yarn add ts-buildkit
```

### Peer Dependencies (Optional)

Some features require additional packages:

```bash
# For cryptography features
npm install crypto-js

# For advanced date handling
npm install dayjs

# For validation schemas
npm install zod
```

## Configuration

### Cryptography Setup

If you plan to use cryptography utilities, you must configure the library first:

```typescript
import { configureZTK } from 'ts-buildkit';

// Configure with your secret key
configureZTK({ cryptoSecret: 'your-secure-secret-key' });
```

## Core Utilities

### String Utilities

#### `isZNonEmptyString(str: unknown): boolean`

Checks if a value is a non-empty string.

```typescript
import { isZNonEmptyString } from 'ts-buildkit';

isZNonEmptyString('hello'); // true
isZNonEmptyString(''); // false
isZNonEmptyString(null); // false
isZNonEmptyString(123); // false
```

#### `isZNonEmptyStrings(arr: unknown[]): boolean`

Checks if all elements in an array are non-empty strings.

```typescript
import { isZNonEmptyStrings } from 'ts-buildkit';

isZNonEmptyStrings(['hello', 'world']); // true
isZNonEmptyStrings(['hello', '']); // false
isZNonEmptyStrings(['hello', 123]); // false
```

#### `convertToTitleCase(str: string): string`

Converts a string to title case (first letter uppercase).

```typescript
import { convertToTitleCase } from 'ts-buildkit';

convertToTitleCase('hello world'); // 'Hello world'
convertToTitleCase('HELLO WORLD'); // 'Hello world'
```

#### `convertToTitleCaseV1(str: string): string`

Converts a string to title case (each word's first letter uppercase).

```typescript
import { convertToTitleCaseV1 } from 'ts-buildkit';

convertToTitleCaseV1('hello world'); // 'Hello World'
convertToTitleCaseV1('HELLO WORLD'); // 'Hello World'
```

#### `generateSlug(input: string, options?: { lowercase?: boolean; separator?: string }): string`

Generates a URL-friendly slug from a string.

```typescript
import { generateSlug } from 'ts-buildkit';

generateSlug('Hello World!'); // 'hello-world'
generateSlug('Hello World!', { lowercase: false }); // 'Hello-World'
generateSlug('Hello World!', { separator: '_' }); // 'hello_world'
```

#### `formatCamelCaseToTitle(str: string): string`

Converts camelCase or PascalCase strings to title case with spaces.

```typescript
import { formatCamelCaseToTitle } from 'ts-buildkit';

formatCamelCaseToTitle('helloWorld'); // 'Hello World'
formatCamelCaseToTitle('HelloWorldExample'); // 'Hello World Example'
```

#### `truncateString(str: string, n: number): string`

Truncates a string to a specified length and adds ellipsis if truncated.

```typescript
import { truncateString } from 'ts-buildkit';

truncateString('Hello World', 5); // 'Hello...'
truncateString('Hi', 5); // 'Hi'
```

#### `getTextOnly(html: string): string`

Extracts plain text from HTML string.

```typescript
import { getTextOnly } from 'ts-buildkit';

getTextOnly('<p>Hello <b>World</b></p>'); // 'Hello World'
getTextOnly('Plain text'); // 'Plain text'
```

#### `removeLeadingTrailingChars(str: string, charToRemove: string): string`

Removes specified characters from the beginning and end of a string.

```typescript
import { removeLeadingTrailingChars } from 'ts-buildkit';

removeLeadingTrailingChars('/path/to/file/', '/'); // 'path/to/file'
removeLeadingTrailingChars('...hello...', '.'); // 'hello'
```

#### `hasLeadingOrTrailingSlash(str: string): boolean`

Checks if a string has leading or trailing slashes.

```typescript
import { hasLeadingOrTrailingSlash } from 'ts-buildkit';

hasLeadingOrTrailingSlash('/path/'); // true
hasLeadingOrTrailingSlash('path'); // false
```

#### `escapeRegex(str: string): string`

Escapes special regex characters in a string.

```typescript
import { escapeRegex } from 'ts-buildkit';

escapeRegex('test.com'); // 'test\\.com'
escapeRegex('price: $50'); // 'price: \\$50'
```

#### `createRegexMatch(val: string): RegExp`

Creates a case-insensitive regex for matching.

```typescript
import { createRegexMatch } from 'ts-buildkit';

const regex = createRegexMatch('hello');
regex.test('Hello World'); // true
regex.test('HELLO'); // true
```

### Number Utilities

#### `isZValidNumber(val: unknown): boolean`

Checks if a value is a valid number (not NaN, Infinity, or -Infinity).

```typescript
import { isZValidNumber } from 'ts-buildkit';

isZValidNumber(123); // true
isZValidNumber('123'); // false
isZValidNumber(NaN); // false
isZValidNumber(Infinity); // false
```

#### `isZValidNumbers(arr: unknown[]): boolean`

Checks if all elements in an array are valid numbers.

```typescript
import { isZValidNumbers } from 'ts-buildkit';

isZValidNumbers([1, 2, 3]); // true
isZValidNumbers([1, '2', 3]); // false
isZValidNumbers([1, NaN, 3]); // false
```

#### `formatUSD(amount: number): string`

Formats a number as USD currency.

```typescript
import { formatUSD } from 'ts-buildkit';

formatUSD(1234.56); // '$1,234.56'
formatUSD(1000); // '$1,000.00'
```

#### `formatStripeAmount(amount: number): number`

Converts a dollar amount to Stripe's smallest currency unit (cents).

```typescript
import { formatStripeAmount } from 'ts-buildkit';

formatStripeAmount(10.50); // 1050
formatStripeAmount(100); // 10000
```

#### `ZTotalPages(totalItems: number, limit: number): number`

Calculates total pages for pagination.

```typescript
import { ZTotalPages } from 'ts-buildkit';

ZTotalPages(100, 10); // 10
ZTotalPages(95, 10); // 10
ZTotalPages(0, 10); // 1
```

### Array Utilities

#### `isArray(val: unknown): boolean`

Checks if a value is an array.

```typescript
import { isArray } from 'ts-buildkit';

isArray([1, 2, 3]); // true
isArray('hello'); // false
isArray({ length: 0 }); // false
```

#### `flattenArray<T>(arr: T[][]): T[]`

Flattens a two-dimensional array into a one-dimensional array.

```typescript
import { flattenArray } from 'ts-buildkit';

flattenArray([[1, 2], [3, 4]]); // [1, 2, 3, 4]
flattenArray([['a'], ['b', 'c']]); // ['a', 'b', 'c']
```

#### `checkEqualityOfTwoArray(arr1: string[], arr2: string[]): boolean`

Checks if two string arrays contain the same elements (order doesn't matter).

```typescript
import { checkEqualityOfTwoArray } from 'ts-buildkit';

checkEqualityOfTwoArray(['a', 'b'], ['b', 'a']); // true
checkEqualityOfTwoArray(['a', 'b'], ['a', 'b', 'c']); // false
```

#### `arrayMoveImmutable<T>(array: T[], from: number, to: number): T[]`

Moves an element in an array immutably (returns new array).

```typescript
import { arrayMoveImmutable } from 'ts-buildkit';

const arr = ['a', 'b', 'c', 'd'];
arrayMoveImmutable(arr, 0, 2); // ['b', 'c', 'a', 'd']
// Original array unchanged
```

#### `arrayMoveMutable<T>(array: T[], from: number, to: number): void`

Moves an element in an array mutably (modifies original array).

```typescript
import { arrayMoveMutable } from 'ts-buildkit';

const arr = ['a', 'b', 'c', 'd'];
arrayMoveMutable(arr, 0, 2);
// arr is now ['b', 'c', 'a', 'd']
```

### Object Utilities

#### `isObject(val: unknown): boolean`

Checks if a value is a plain object.

```typescript
import { isObject } from 'ts-buildkit';

isObject({ a: 1 }); // true
isObject([]); // false
isObject(null); // false
isObject(new Date()); // false
```

#### `getObjectKey<T extends object>(obj: T, value: T[keyof T]): keyof T | undefined`

Gets the key of an object by its value.

```typescript
import { getObjectKey } from 'ts-buildkit';

const obj = { a: 1, b: 2, c: 3 };
getObjectKey(obj, 2); // 'b'
getObjectKey(obj, 4); // undefined
```

#### `checkIfKeyExists<T extends object>(obj: T, key: string | number | symbol): boolean`

Checks if a key exists in an object.

```typescript
import { checkIfKeyExists } from 'ts-buildkit';

const obj = { name: 'John', age: 30 };
checkIfKeyExists(obj, 'name'); // true
checkIfKeyExists(obj, 'email'); // false
```

#### `isEqual(a: unknown, b: unknown): boolean`

Deep equality check for any values.

```typescript
import { isEqual } from 'ts-buildkit';

isEqual({ a: 1 }, { a: 1 }); // true
isEqual([1, 2], [1, 2]); // true
isEqual({ a: { b: 1 } }, { a: { b: 1 } }); // true
isEqual({ a: 1 }, { a: 2 }); // false
```

#### `buildFilterObject(filters: Record<string, unknown>): Record<string, unknown>`

Builds a filter object by removing null, undefined, and empty values.

```typescript
import { buildFilterObject } from 'ts-buildkit';

buildFilterObject({ 
  name: 'John', 
  age: null, 
  city: '', 
  active: true 
}); 
// { name: 'John', active: true }
```

#### `getActiveFilters(filters: Record<string, unknown>): string[]`

Gets an array of keys that have non-empty values.

```typescript
import { getActiveFilters } from 'ts-buildkit';

getActiveFilters({ 
  name: 'John', 
  age: null, 
  city: 'NYC' 
}); 
// ['name', 'city']
```

### Validation Utilities

#### `isValidEmail(email: string): boolean`

Validates email format.

```typescript
import { isValidEmail } from 'ts-buildkit';

isValidEmail('user@example.com'); // true
isValidEmail('invalid.email'); // false
```

#### `validateEmail(email: string, allowedDomains?: string[]): boolean`

Validates email with optional domain restrictions.

```typescript
import { validateEmail } from 'ts-buildkit';

validateEmail('user@gmail.com'); // true
validateEmail('user@gmail.com', ['company.com']); // false
validateEmail('user@company.com', ['company.com']); // true
```

#### `isValidUrl(url: string): boolean`

Validates URL format.

```typescript
import { isValidUrl } from 'ts-buildkit';

isValidUrl('https://example.com'); // true
isValidUrl('http://localhost:3000'); // true
isValidUrl('not a url'); // false
```

#### `validateURL(url: string, options?: { requireProtocol?: boolean; allowedProtocols?: string[] }): { isValid: boolean; error?: string }`

Advanced URL validation with options.

```typescript
import { validateURL } from 'ts-buildkit';

validateURL('https://example.com'); 
// { isValid: true }

validateURL('example.com', { requireProtocol: false }); 
// { isValid: true }

validateURL('ftp://example.com', { allowedProtocols: ['http', 'https'] }); 
// { isValid: false, error: 'Invalid protocol' }
```

#### `isValidVanityUrl(url: string): boolean`

Validates vanity URL format (alphanumeric with hyphens).

```typescript
import { isValidVanityUrl } from 'ts-buildkit';

isValidVanityUrl('my-profile'); // true
isValidVanityUrl('user123'); // true
isValidVanityUrl('user@123'); // false
```

#### `validatePhoneNumber(phone: string, countryCode?: string): { isValid: boolean; formatted?: string }`

Validates and formats phone numbers.

```typescript
import { validatePhoneNumber } from 'ts-buildkit';

validatePhoneNumber('+1234567890'); 
// { isValid: true, formatted: '+1 234-567-890' }

validatePhoneNumber('1234567890', 'US'); 
// { isValid: true, formatted: '+1 234-567-890' }
```

#### `containSpecialCharacters(str: string, options?: { allowSpaces?: boolean; customChars?: string }): boolean`

Checks if string contains special characters.

```typescript
import { containSpecialCharacters } from 'ts-buildkit';

containSpecialCharacters('hello@world'); // true
containSpecialCharacters('hello world'); // true
containSpecialCharacters('hello world', { allowSpaces: true }); // false
containSpecialCharacters('hello-world', { customChars: '@#$' }); // false
```

#### `validateInputCharacters(input: string, allowedChars: string[]): { isValid: boolean; invalidChars: string[] }`

Validates input against allowed character types.

```typescript
import { validateInputCharacters } from 'ts-buildkit';

validateInputCharacters('Hello123', ['alphabets', 'numbers']); 
// { isValid: true, invalidChars: [] }

validateInputCharacters('Hello@123', ['alphabets', 'numbers']); 
// { isValid: false, invalidChars: ['@'] }
```

#### `isApplePrivateEmail(email: string): boolean`

Checks if an email is an Apple private relay email.

```typescript
import { isApplePrivateEmail } from 'ts-buildkit';

isApplePrivateEmail('abc123@privaterelay.appleid.com'); // true
isApplePrivateEmail('user@gmail.com'); // false
```

### URL and Web Utilities

#### `addUrlProtocolHandler(url: string, defaultProtocol?: string): string`

Adds protocol to URL if missing.

```typescript
import { addUrlProtocolHandler } from 'ts-buildkit';

addUrlProtocolHandler('example.com'); // 'https://example.com'
addUrlProtocolHandler('example.com', 'http'); // 'http://example.com'
addUrlProtocolHandler('https://example.com'); // 'https://example.com'
```

#### `replaceUrlDynamicParts(url: string, params: Record<string, string | number>): string`

Replaces dynamic parts in URL template.

```typescript
import { replaceUrlDynamicParts } from 'ts-buildkit';

replaceUrlDynamicParts('/users/:id/posts/:postId', { 
  id: 123, 
  postId: 456 
}); 
// '/users/123/posts/456'
```

#### `containQueryParams(url: string): boolean`

Checks if URL contains query parameters.

```typescript
import { containQueryParams } from 'ts-buildkit';

containQueryParams('https://example.com?foo=bar'); // true
containQueryParams('https://example.com'); // false
```

#### `urlParams`

URL parameter constants.

```typescript
import { urlParams } from 'ts-buildkit';

// Contains common URL parameter names
urlParams.returnUrl; // 'returnUrl'
urlParams.redirectUrl; // 'redirectUrl'
// ... and more
```

#### `urlTarget`

URL target constants for links.

```typescript
import { urlTarget } from 'ts-buildkit';

urlTarget.blank; // '_blank'
urlTarget.self; // '_self'
urlTarget.parent; // '_parent'
urlTarget.top; // '_top'
```

### Image Utilities

#### `imageUrlToBase64(url: string): Promise<string>`

Converts image URL to base64 string.

```typescript
import { imageUrlToBase64 } from 'ts-buildkit';

const base64 = await imageUrlToBase64('https://example.com/image.jpg');
// 'data:image/jpeg;base64,...'
```

#### `getImageBase64Url(base64: string, mimeType?: string): string`

Creates a data URL from base64 string.

```typescript
import { getImageBase64Url } from 'ts-buildkit';

getImageBase64Url('iVBORw0KGgo...', 'image/png'); 
// 'data:image/png;base64,iVBORw0KGgo...'
```

#### `getImageDimensions(file: File): Promise<{ width: number; height: number }>`

Gets dimensions of an image file.

```typescript
import { getImageDimensions } from 'ts-buildkit';

const dimensions = await getImageDimensions(imageFile);
// { width: 1920, height: 1080 }
```

#### `getImageAspectRatio(file: File): Promise<number>`

Calculates image aspect ratio.

```typescript
import { getImageAspectRatio } from 'ts-buildkit';

const ratio = await getImageAspectRatio(imageFile);
// 1.777... (16:9)
```

#### `imageTypeAllowed(fileType: string): boolean`

Checks if image type is allowed.

```typescript
import { imageTypeAllowed } from 'ts-buildkit';

imageTypeAllowed('image/jpeg'); // true
imageTypeAllowed('image/bmp'); // false
```

#### `allowedImageTypes`

Array of allowed image MIME types.

```typescript
import { allowedImageTypes } from 'ts-buildkit';

// ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
```

### Date and Time Utilities

#### `convertToDateTimestampToStoreInDB(date: Date | string | number): number`

Converts date to timestamp for database storage.

```typescript
import { convertToDateTimestampToStoreInDB } from 'ts-buildkit';

convertToDateTimestampToStoreInDB(new Date()); // 1234567890123
convertToDateTimestampToStoreInDB('2023-01-01'); // 1672531200000
```

#### `getDateFromFrbTimestamp(timestamp: { seconds: number; nanoseconds: number }): Date`

Converts Firebase timestamp to JavaScript Date.

```typescript
import { getDateFromFrbTimestamp } from 'ts-buildkit';

const date = getDateFromFrbTimestamp({ 
  seconds: 1672531200, 
  nanoseconds: 0 
});
// Date object
```

#### `getRemainingTimeForCountDown(targetDate: Date | string): { days: number; hours: number; minutes: number; seconds: number }`

Calculates remaining time until target date.

```typescript
import { getRemainingTimeForCountDown } from 'ts-buildkit';

const remaining = getRemainingTimeForCountDown('2024-12-31');
// { days: 45, hours: 12, minutes: 30, seconds: 15 }
```

#### `getTimeInUnit(milliseconds: number, unit: TimeUnitEnum): number`

Converts milliseconds to specified time unit.

```typescript
import { getTimeInUnit, TimeUnitEnum } from 'ts-buildkit';

getTimeInUnit(3600000, TimeUnitEnum.HOURS); // 1
getTimeInUnit(86400000, TimeUnitEnum.DAYS); // 1
```

#### `dateFormat`

Common date format strings.

```typescript
import { dateFormat } from 'ts-buildkit';

dateFormat.standard; // 'YYYY-MM-DD'
dateFormat.display; // 'MMM DD, YYYY'
dateFormat.full; // 'YYYY-MM-DD HH:mm:ss'
// ... and more
```

#### `dayjs`

Re-exported dayjs instance for date manipulation.

```typescript
import { dayjs } from 'ts-buildkit';

dayjs().format('YYYY-MM-DD'); // '2023-12-01'
dayjs().add(1, 'day').toDate(); // Tomorrow's date
```

### Cryptography Utilities

**Note:** Requires `crypto-js` peer dependency and configuration.

#### `encryptData(data: string): string`

Encrypts data using configured secret.

```typescript
import { encryptData, configureZTK } from 'ts-buildkit';

configureZTK({ cryptoSecret: 'secret-key' });
const encrypted = encryptData('sensitive data');
```

#### `decryptData(encryptedData: string): string`

Decrypts data using configured secret.

```typescript
import { decryptData } from 'ts-buildkit';

const decrypted = decryptData(encrypted);
// 'sensitive data'
```

#### `encryptWithSecretKey(data: string, secretKey: string): string`

Encrypts data with specific key.

```typescript
import { encryptWithSecretKey } from 'ts-buildkit';

const encrypted = encryptWithSecretKey('data', 'custom-key');
```

#### `decryptWithSecretKey(encryptedData: string, secretKey: string): string`

Decrypts data with specific key.

```typescript
import { decryptWithSecretKey } from 'ts-buildkit';

const decrypted = decryptWithSecretKey(encrypted, 'custom-key');
```

#### `aesDecrypt(encryptedData: string, secretKey: string): string`

AES decryption utility.

```typescript
import { aesDecrypt } from 'ts-buildkit';

const decrypted = aesDecrypt(encryptedData, 'secret-key');
```

### Database Utilities

#### `isSoftDeleted(item: DBItemGenericDataType): boolean`

Checks if database item is soft deleted.

```typescript
import { isSoftDeleted } from 'ts-buildkit';

isSoftDeleted({ isDeleted: true }); // true
isSoftDeleted({ isDeleted: false }); // false
```

#### `dbItemIsBlocked(item: DBItemGenericDataType): boolean`

Checks if database item is blocked.

```typescript
import { dbItemIsBlocked } from 'ts-buildkit';

dbItemIsBlocked({ isBlocked: true }); // true
dbItemIsBlocked({ isBlocked: false }); // false
```

#### `getDBTimeColumnValue(value?: unknown): number`

Gets timestamp value for database time columns.

```typescript
import { getDBTimeColumnValue } from 'ts-buildkit';

getDBTimeColumnValue(); // Current timestamp
getDBTimeColumnValue(new Date('2023-01-01')); // 1672531200000
getDBTimeColumnValue(1672531200000); // 1672531200000
```

#### `frbCollectionQueryDefaults`

Firebase collection query defaults.

```typescript
import { frbCollectionQueryDefaults } from 'ts-buildkit';

// {
//   limit: 20,
//   orderBy: 'createdAt',
//   orderDirection: 'desc',
//   startAfter: null,
//   where: []
// }
```

### Permission Utilities

#### `hasPermission(userPermissions: string[], requiredPermission: string): boolean`

Checks if user has required permission.

```typescript
import { hasPermission } from 'ts-buildkit';

const userPerms = ['read', 'write'];
hasPermission(userPerms, 'read'); // true
hasPermission(userPerms, 'delete'); // false
```

#### `validateRequiredPermissions(userPermissions: string[], requiredPermissions: string[]): boolean`

Validates if user has all required permissions.

```typescript
import { validateRequiredPermissions } from 'ts-buildkit';

const userPerms = ['read', 'write', 'delete'];
validateRequiredPermissions(userPerms, ['read', 'write']); // true
validateRequiredPermissions(userPerms, ['read', 'admin']); // false
```

#### `validateExcludedPermissions(userPermissions: string[], excludedPermissions: string[]): boolean`

Validates user doesn't have excluded permissions.

```typescript
import { validateExcludedPermissions } from 'ts-buildkit';

const userPerms = ['read', 'write'];
validateExcludedPermissions(userPerms, ['admin']); // true
validateExcludedPermissions(userPerms, ['write']); // false
```

#### `validateUserPermissions(params: IHasRequiredPermissions): boolean`

Comprehensive permission validation.

```typescript
import { validateUserPermissions } from 'ts-buildkit';

validateUserPermissions({
  userPermissions: ['read', 'write'],
  requiredPermissions: ['read'],
  excludedPermissions: ['admin'],
  checkMode: 'AND' // or 'OR'
}); // true
```

#### `getPermissions(params: { includeList?: string[]; excludeList?: string[] }): PermissionEnum[]`

Gets filtered list of permissions.

```typescript
import { getPermissions } from 'ts-buildkit';

const permissions = getPermissions({
  includeList: ['user', 'admin'],
  excludeList: ['super_admin']
});
```

#### `mapPermissionsToStrings(permissions: PermissionEnum[]): string[]`

Converts permission enums to strings.

```typescript
import { mapPermissionsToStrings, PermissionEnum } from 'ts-buildkit';

const strings = mapPermissionsToStrings([
  PermissionEnum.READ,
  PermissionEnum.WRITE
]);
// ['read', 'write']
```

#### `getUserRoleEnumValueFromString(role: string): RoleEnum | null`

Converts role string to enum.

```typescript
import { getUserRoleEnumValueFromString } from 'ts-buildkit';

getUserRoleEnumValueFromString('admin'); // RoleEnum.ADMIN
getUserRoleEnumValueFromString('invalid'); // null
```

#### `permissionsData`

Complete permissions configuration data.

```typescript
import { permissionsData } from 'ts-buildkit';

// Array of all permission definitions with metadata
```

#### `rolePermissionsMap`

Mapping of roles to their permissions.

```typescript
import { rolePermissionsMap } from 'ts-buildkit';

// Map of RoleEnum to PermissionEnum arrays
```

### Error Handling

#### `reportCustomError(error: unknown, context?: string): void`

Reports errors with optional context.

```typescript
import { reportCustomError } from 'ts-buildkit';

try {
  // some code
} catch (error) {
  reportCustomError(error, 'Failed to process user data');
}
```

#### `getStripeErrorMessageByErrorCode(code: string): string`

Gets user-friendly Stripe error messages.

```typescript
import { getStripeErrorMessageByErrorCode } from 'ts-buildkit';

getStripeErrorMessageByErrorCode('card_declined'); 
// 'Your card was declined. Please try another payment method.'
```

#### `getStripeErrorMessageByRequirement(requirement: string): string`

Gets Stripe requirement messages.

```typescript
import { getStripeErrorMessageByRequirement } from 'ts-buildkit';

getStripeErrorMessageByRequirement('past_due'); 
// 'Account has past due requirements'
```

#### `getStripeErrorMessageByDisabledCode(code: string): string`

Gets Stripe disabled reason messages.

```typescript
import { getStripeErrorMessageByDisabledCode } from 'ts-buildkit';

getStripeErrorMessageByDisabledCode('rejected.fraud'); 
// 'Account rejected due to suspected fraud'
```

### Device Detection

#### `detectDeviceAndViewMode(): { isMobile: boolean; isTablet: boolean; isDesktop: boolean }`

Detects device type based on viewport.

```typescript
import { detectDeviceAndViewMode } from 'ts-buildkit';

const device = detectDeviceAndViewMode();
// { isMobile: false, isTablet: false, isDesktop: true }
```

#### `mediaScales`

Media query breakpoints.

```typescript
import { mediaScales } from 'ts-buildkit';

mediaScales.mobile; // { min: 0, max: 767 }
mediaScales.tablet; // { min: 768, max: 1023 }
mediaScales.desktop; // { min: 1024, max: 9999 }
```

### Miscellaneous Utilities

#### `getZUniqueKey(): string`

Generates unique random key.

```typescript
import { getZUniqueKey } from 'ts-buildkit';

getZUniqueKey(); // 'lk3j4h5g6f7d8s9a0'
```

#### `generateUUID(): string`

Generates UUID v4.

```typescript
import { generateUUID } from 'ts-buildkit';

generateUUID(); // '550e8400-e29b-41d4-a716-446655440000'
```

#### `generateUniqueCode(length?: number, options?: { includeNumbers?: boolean; includeLetters?: boolean }): string`

Generates unique code with options.

```typescript
import { generateUniqueCode } from 'ts-buildkit';

generateUniqueCode(); // 'A3B7X9'
generateUniqueCode(8); // 'A3B7X9K2'
generateUniqueCode(6, { includeNumbers: false }); // 'ABCDEF'
```

#### `zStringify(data: unknown): string`

Safe JSON stringify.

```typescript
import { zStringify } from 'ts-buildkit';

zStringify({ a: 1, b: 2 }); // '{"a":1,"b":2}'
zStringify(undefined); // '{}'
```

#### `zJsonParse<T>(data: string): T | null`

Safe JSON parse.

```typescript
import { zJsonParse } from 'ts-buildkit';

zJsonParse('{"a":1}'); // { a: 1 }
zJsonParse('invalid'); // null
```

#### `zConvertToBoolean(value: unknown): boolean`

Converts various values to boolean.

```typescript
import { zConvertToBoolean } from 'ts-buildkit';

zConvertToBoolean('true'); // true
zConvertToBoolean(1); // true
zConvertToBoolean('yes'); // true
zConvertToBoolean('false'); // false
zConvertToBoolean(0); // false
```

#### `isNullOrUndefined(val: unknown): boolean`

Checks if value is null or undefined.

```typescript
import { isNullOrUndefined } from 'ts-buildkit';

isNullOrUndefined(null); // true
isNullOrUndefined(undefined); // true
isNullOrUndefined(0); // false
isNullOrUndefined(''); // false
```

#### `isNotNullOrUndefined(val: unknown): boolean`

Checks if value is not null or undefined.

```typescript
import { isNotNullOrUndefined } from 'ts-buildkit';

isNotNullOrUndefined('hello'); // true
isNotNullOrUndefined(0); // true
isNotNullOrUndefined(null); // false
```

#### `isFunction(val: unknown): boolean`

Checks if value is a function.

```typescript
import { isFunction } from 'ts-buildkit';

isFunction(() => {}); // true
isFunction(function() {}); // true
isFunction('function'); // false
```

#### `isStringVariable(val: unknown): boolean`

Checks if value is a string.

```typescript
import { isStringVariable } from 'ts-buildkit';

isStringVariable('hello'); // true
isStringVariable(123); // false
```

#### `checkVariableType(val: unknown): string`

Gets the type of a variable.

```typescript
import { checkVariableType } from 'ts-buildkit';

checkVariableType('hello'); // 'string'
checkVariableType(123); // 'number'
checkVariableType([]); // 'array'
checkVariableType({}); // 'object'
checkVariableType(null); // 'null'
```

#### `normalizeEnumValue(value: string): string`

Normalizes enum value format.

```typescript
import { normalizeEnumValue } from 'ts-buildkit';

normalizeEnumValue('HELLO_WORLD'); // 'hello_world'
normalizeEnumValue('Hello World'); // 'hello_world'
```

#### `checkForDuplicateEnumValues<T extends Record<string, string | number>>(enumObj: T): void`

Validates enum for duplicate values.

```typescript
import { checkForDuplicateEnumValues } from 'ts-buildkit';

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

checkForDuplicateEnumValues(Status); // No error

enum Invalid {
  A = 'same',
  B = 'same' // This will throw error
}
```

#### `toRad(degrees: number): number`

Converts degrees to radians.

```typescript
import { toRad } from 'ts-buildkit';

toRad(180); // 3.141592653589793 (π)
toRad(90); // 1.5707963267948966 (π/2)
```

#### `calcCrow(lat1: number, lon1: number, lat2: number, lon2: number): number`

Calculates distance between two coordinates in kilometers.

```typescript
import { calcCrow } from 'ts-buildkit';

// Distance between New York and Los Angeles
calcCrow(40.7128, -74.0060, 34.0522, -118.2437); // ~3935.74 km
```

#### `getPaginationParams(options: IPaginationOptions): { limit: number; offset: number }`

Calculates pagination parameters.

```typescript
import { getPaginationParams } from 'ts-buildkit';

getPaginationParams({ page: 2, limit: 20 }); 
// { limit: 20, offset: 20 }

getPaginationParams({ page: 1, limit: 10 }); 
// { limit: 10, offset: 0 }
```

#### `validateFileBeforeUpload(file: File, options?: { maxSize?: number; allowedTypes?: string[] }): { isValid: boolean; error?: string }`

Validates file before upload.

```typescript
import { validateFileBeforeUpload } from 'ts-buildkit';

validateFileBeforeUpload(file, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png']
});
// { isValid: true } or { isValid: false, error: 'File too large' }
```

#### `isFileTypeAllowed(fileType: string, allowedTypes: string[]): boolean`

Checks if file type is in allowed list.

```typescript
import { isFileTypeAllowed } from 'ts-buildkit';

isFileTypeAllowed('image/jpeg', ['image/jpeg', 'image/png']); // true
isFileTypeAllowed('image/gif', ['image/jpeg', 'image/png']); // false
```

#### `isFileTypeValid(file: File, validTypes: string[]): boolean`

Validates file type against list.

```typescript
import { isFileTypeValid } from 'ts-buildkit';

isFileTypeValid(jpegFile, ['image/jpeg', 'image/png']); // true
isFileTypeValid(pdfFile, ['image/jpeg', 'image/png']); // false
```

#### `fieldsValidation`

Common field validation patterns.

```typescript
import { fieldsValidation } from 'ts-buildkit';

fieldsValidation.email; // Email regex
fieldsValidation.phone; // Phone regex
fieldsValidation.url; // URL regex
// ... and more
```

#### `defaultValue`

Common default values.

```typescript
import { defaultValue } from 'ts-buildkit';

defaultValue.string; // ''
defaultValue.number; // 0
defaultValue.boolean; // false
defaultValue.array; // []
defaultValue.object; // {}
```

#### `emptyVoidReturnFunction(): void`

Empty function that returns void.

```typescript
import { emptyVoidReturnFunction } from 'ts-buildkit';

// Use as placeholder/default callback
const callback = props.onClick || emptyVoidReturnFunction;
```

#### `emptyVoidReturnFunctionPromise(): Promise<void>`

Empty async function that returns Promise<void>.

```typescript
import { emptyVoidReturnFunctionPromise } from 'ts-buildkit';

// Use as placeholder/default async callback
const asyncCallback = props.onSubmit || emptyVoidReturnFunctionPromise;
```

#### `dumpValueNoLogNothing<T>(val: T): T`

Returns value without any processing (identity function).

```typescript
import { dumpValueNoLogNothing } from 'ts-buildkit';

dumpValueNoLogNothing(123); // 123
dumpValueNoLogNothing('hello'); // 'hello'
```

### Package Utilities

#### `classNames(...args: ClassValue[]): string`

Combines class names (similar to clsx).

```typescript
import { classNames } from 'ts-buildkit';

classNames('foo', 'bar'); // 'foo bar'
classNames('foo', { bar: true, baz: false }); // 'foo bar'
classNames(['foo', 'bar'], { baz: true }); // 'foo bar baz'
```

#### `generateCouponCode(options?: CouponOptions): string`

Generates coupon codes.

```typescript
import { generateCouponCode } from 'ts-buildkit';

generateCouponCode(); // 'ABC123'
generateCouponCode({ 
  length: 8, 
  prefix: 'SAVE',
  suffix: '2023'
}); // 'SAVE-ABCD-2023'
```

#### `validateCouponCode(code: string, options?: CouponOptions): boolean`

Validates coupon code format.

```typescript
import { validateCouponCode } from 'ts-buildkit';

validateCouponCode('ABC123'); // true
validateCouponCode('SAVE-ABCD-2023', {
  prefix: 'SAVE',
  suffix: '2023'
}); // true
```

#### `checkIfCouponCodeHasBadWord(code: string): boolean`

Checks coupon code for inappropriate words.

```typescript
import { checkIfCouponCodeHasBadWord } from 'ts-buildkit';

checkIfCouponCodeHasBadWord('SAVE20'); // false
checkIfCouponCodeHasBadWord('BADWORD'); // true
```

## Enums

### Generic Enums

#### `BooleanEnum`

Boolean values as strings.

```typescript
import { BooleanEnum } from 'ts-buildkit';

BooleanEnum.TRUE; // 'true'
BooleanEnum.FALSE; // 'false'
```

#### `RequestTypeEnum`

HTTP request types.

```typescript
import { RequestTypeEnum } from 'ts-buildkit';

RequestTypeEnum.GET; // 'GET'
RequestTypeEnum.POST; // 'POST'
RequestTypeEnum.PUT; // 'PUT'
RequestTypeEnum.DELETE; // 'DELETE'
RequestTypeEnum.PATCH; // 'PATCH'
```

#### `RequestStatusEnum`

Request status values.

```typescript
import { RequestStatusEnum } from 'ts-buildkit';

RequestStatusEnum.IDLE; // 'idle'
RequestStatusEnum.PENDING; // 'pending'
RequestStatusEnum.SUCCESS; // 'success'
RequestStatusEnum.ERROR; // 'error'
```

#### `ResponseStatusEnum`

Response status values.

```typescript
import { ResponseStatusEnum } from 'ts-buildkit';

ResponseStatusEnum.SUCCESS; // 'success'
ResponseStatusEnum.ERROR; // 'error'
ResponseStatusEnum.WARNING; // 'warning'
```

#### `ResponseCodeEnum`

HTTP response codes.

```typescript
import { ResponseCodeEnum } from 'ts-buildkit';

ResponseCodeEnum.OK; // 200
ResponseCodeEnum.CREATED; // 201
ResponseCodeEnum.BAD_REQUEST; // 400
ResponseCodeEnum.UNAUTHORIZED; // 401
ResponseCodeEnum.FORBIDDEN; // 403
ResponseCodeEnum.NOT_FOUND; // 404
ResponseCodeEnum.INTERNAL_SERVER_ERROR; // 500
```

#### `TimeUnitEnum`

Time unit values.

```typescript
import { TimeUnitEnum } from 'ts-buildkit';

TimeUnitEnum.MILLISECONDS; // 'milliseconds'
TimeUnitEnum.SECONDS; // 'seconds'
TimeUnitEnum.MINUTES; // 'minutes'
TimeUnitEnum.HOURS; // 'hours'
TimeUnitEnum.DAYS; // 'days'
TimeUnitEnum.WEEKS; // 'weeks'
TimeUnitEnum.MONTHS; // 'months'
TimeUnitEnum.YEARS; // 'years'
```

#### `PlatformTypeEnum`

Platform types.

```typescript
import { PlatformTypeEnum } from 'ts-buildkit';

PlatformTypeEnum.WEB; // 'web'
PlatformTypeEnum.IOS; // 'ios'
PlatformTypeEnum.ANDROID; // 'android'
PlatformTypeEnum.WINDOWS; // 'windows'
PlatformTypeEnum.MAC; // 'mac'
PlatformTypeEnum.LINUX; // 'linux'
```

#### `ProcessStatusEnum`

Process status values.

```typescript
import { ProcessStatusEnum } from 'ts-buildkit';

ProcessStatusEnum.IDLE; // 'idle'
ProcessStatusEnum.RUNNING; // 'running'
ProcessStatusEnum.COMPLETED; // 'completed'
ProcessStatusEnum.FAILED; // 'failed'
ProcessStatusEnum.CANCELLED; // 'cancelled'
```

#### `AlertTypeEnum`

Alert/notification types.

```typescript
import { AlertTypeEnum } from 'ts-buildkit';

AlertTypeEnum.SUCCESS; // 'success'
AlertTypeEnum.ERROR; // 'error'
AlertTypeEnum.WARNING; // 'warning'
AlertTypeEnum.INFO; // 'info'
```

#### `LinkTargetEnum`

Link target values.

```typescript
import { LinkTargetEnum } from 'ts-buildkit';

LinkTargetEnum.BLANK; // '_blank'
LinkTargetEnum.SELF; // '_self'
LinkTargetEnum.PARENT; // '_parent'
LinkTargetEnum.TOP; // '_top'
```

#### `SearchParamKeysEnum`

Common search parameter keys.

```typescript
import { SearchParamKeysEnum } from 'ts-buildkit';

SearchParamKeysEnum.SEARCH; // 'search'
SearchParamKeysEnum.PAGE; // 'page'
SearchParamKeysEnum.LIMIT; // 'limit'
SearchParamKeysEnum.SORT; // 'sort'
SearchParamKeysEnum.FILTER; // 'filter'
```

#### `TransferMethodEnum`

Transfer/payment methods.

```typescript
import { TransferMethodEnum } from 'ts-buildkit';

TransferMethodEnum.BANK_TRANSFER; // 'bank_transfer'
TransferMethodEnum.CREDIT_CARD; // 'credit_card'
TransferMethodEnum.DEBIT_CARD; // 'debit_card'
TransferMethodEnum.PAYPAL; // 'paypal'
TransferMethodEnum.CRYPTO; // 'crypto'
```

#### `varTypesEnum`

JavaScript variable types.

```typescript
import { varTypesEnum } from 'ts-buildkit';

varTypesEnum.STRING; // 'string'
varTypesEnum.NUMBER; // 'number'
varTypesEnum.BOOLEAN; // 'boolean'
varTypesEnum.OBJECT; // 'object'
varTypesEnum.ARRAY; // 'array'
varTypesEnum.FUNCTION; // 'function'
varTypesEnum.UNDEFINED; // 'undefined'
varTypesEnum.NULL; // 'null'
```

### Permission & Role Enums

#### `RoleEnum`

User roles.

```typescript
import { RoleEnum } from 'ts-buildkit';

RoleEnum.SUPER_ADMIN; // 'super_admin'
RoleEnum.ADMIN; // 'admin'
RoleEnum.MODERATOR; // 'moderator'
RoleEnum.USER; // 'user'
RoleEnum.GUEST; // 'guest'
```

#### `PermissionEnum`

System permissions.

```typescript
import { PermissionEnum } from 'ts-buildkit';

// Large enum with permissions like:
PermissionEnum.READ_USERS;
PermissionEnum.WRITE_USERS;
PermissionEnum.DELETE_USERS;
// ... many more
```

#### `PermissionTypeEnum`

Permission types.

```typescript
import { PermissionTypeEnum } from 'ts-buildkit';

PermissionTypeEnum.READ; // 'read'
PermissionTypeEnum.WRITE; // 'write'
PermissionTypeEnum.DELETE; // 'delete'
PermissionTypeEnum.ADMIN; // 'admin'
```

#### `PermissionCheckModeEnum`

Permission check modes.

```typescript
import { PermissionCheckModeEnum } from 'ts-buildkit';

PermissionCheckModeEnum.AND; // 'AND'
PermissionCheckModeEnum.OR; // 'OR'
```

### Firebase Enums

#### `FrbWhereConditionEnum`

Firebase where conditions.

```typescript
import { FrbWhereConditionEnum } from 'ts-buildkit';

FrbWhereConditionEnum.EQUAL; // '=='
FrbWhereConditionEnum.NOT_EQUAL; // '!='
FrbWhereConditionEnum.GREATER_THAN; // '>'
FrbWhereConditionEnum.GREATER_THAN_OR_EQUAL; // '>='
FrbWhereConditionEnum.LESS_THAN; // '<'
FrbWhereConditionEnum.LESS_THAN_OR_EQUAL; // '<='
FrbWhereConditionEnum.ARRAY_CONTAINS; // 'array-contains'
FrbWhereConditionEnum.ARRAY_CONTAINS_ANY; // 'array-contains-any'
FrbWhereConditionEnum.IN; // 'in'
FrbWhereConditionEnum.NOT_IN; // 'not-in'
```

#### `FrbOrderbyDirectionEnum`

Firebase order directions.

```typescript
import { FrbOrderbyDirectionEnum } from 'ts-buildkit';

FrbOrderbyDirectionEnum.ASC; // 'asc'
FrbOrderbyDirectionEnum.DESC; // 'desc'
```

#### `DBColumnKeysShortFormEnum`

Database column short forms.

```typescript
import { DBColumnKeysShortFormEnum } from 'ts-buildkit';

DBColumnKeysShortFormEnum.ID; // 'id'
DBColumnKeysShortFormEnum.CREATED_AT; // 'cat'
DBColumnKeysShortFormEnum.UPDATED_AT; // 'uat'
DBColumnKeysShortFormEnum.DELETED_AT; // 'dat'
DBColumnKeysShortFormEnum.IS_DELETED; // 'isd'
DBColumnKeysShortFormEnum.IS_BLOCKED; // 'isb'
// ... more
```

### API Enums

#### `ApiPathEnum`

API path patterns.

```typescript
import { ApiPathEnum } from 'ts-buildkit';

ApiPathEnum.AUTH; // '/auth'
ApiPathEnum.USERS; // '/users'
ApiPathEnum.ADMIN; // '/admin'
// ... more
```

#### `RequestContentTypeEnum`

Content types for requests.

```typescript
import { RequestContentTypeEnum } from 'ts-buildkit';

RequestContentTypeEnum.JSON; // 'application/json'
RequestContentTypeEnum.FORM_DATA; // 'multipart/form-data'
RequestContentTypeEnum.URL_ENCODED; // 'application/x-www-form-urlencoded'
```

### Other Enums

#### `FormFieldsEnum`

Form field types.

```typescript
import { FormFieldsEnum } from 'ts-buildkit';

FormFieldsEnum.TEXT; // 'text'
FormFieldsEnum.EMAIL; // 'email'
FormFieldsEnum.PASSWORD; // 'password'
FormFieldsEnum.NUMBER; // 'number'
FormFieldsEnum.DATE; // 'date'
FormFieldsEnum.SELECT; // 'select'
FormFieldsEnum.CHECKBOX; // 'checkbox'
FormFieldsEnum.RADIO; // 'radio'
FormFieldsEnum.TEXTAREA; // 'textarea'
```

#### `CharTypeEnum`

Chart types for data visualization.

```typescript
import { CharTypeEnum } from 'ts-buildkit';

CharTypeEnum.LINE; // 'line'
CharTypeEnum.BAR; // 'bar'
CharTypeEnum.PIE; // 'pie'
CharTypeEnum.DOUGHNUT; // 'doughnut'
CharTypeEnum.RADAR; // 'radar'
CharTypeEnum.POLAR; // 'polar'
```

#### `AddressComponentTypeEnum`

Google Maps address component types.

```typescript
import { AddressComponentTypeEnum } from 'ts-buildkit';

AddressComponentTypeEnum.STREET_NUMBER; // 'street_number'
AddressComponentTypeEnum.ROUTE; // 'route'
AddressComponentTypeEnum.LOCALITY; // 'locality'
AddressComponentTypeEnum.COUNTRY; // 'country'
AddressComponentTypeEnum.POSTAL_CODE; // 'postal_code'
// ... more
```

### Capacitor Enums

#### `CapacitorPlatformEnum`

Capacitor platform types.

```typescript
import { CapacitorPlatformEnum } from 'ts-buildkit';

CapacitorPlatformEnum.IOS; // 'ios'
CapacitorPlatformEnum.ANDROID; // 'android'
CapacitorPlatformEnum.WEB; // 'web'
```

#### `GeoLocationPermissionStateEnum`

Geolocation permission states.

```typescript
import { GeoLocationPermissionStateEnum } from 'ts-buildkit';

GeoLocationPermissionStateEnum.GRANTED; // 'granted'
GeoLocationPermissionStateEnum.DENIED; // 'denied'
GeoLocationPermissionStateEnum.PROMPT; // 'prompt'
```

#### `GeoLocationResponseCodeEnum`

Geolocation response codes.

```typescript
import { GeoLocationResponseCodeEnum } from 'ts-buildkit';

GeoLocationResponseCodeEnum.SUCCESS; // 'success'
GeoLocationResponseCodeEnum.PERMISSION_DENIED; // 'permission_denied'
GeoLocationResponseCodeEnum.POSITION_UNAVAILABLE; // 'position_unavailable'
GeoLocationResponseCodeEnum.TIMEOUT; // 'timeout'
```

## Types and Interfaces

### Generic Types

#### `IGenericObject`

Generic object type.

```typescript
import { IGenericObject } from 'ts-buildkit';

const obj: IGenericObject = {
  name: 'John',
  age: 30,
  active: true
};
```

#### `IPaginationOptions`

Pagination options interface.

```typescript
import { IPaginationOptions } from 'ts-buildkit';

const options: IPaginationOptions = {
  page: 1,
  limit: 20,
  offset: 0
};
```

#### `IDefaultDBColumns`

Default database columns interface.

```typescript
import { IDefaultDBColumns } from 'ts-buildkit';

interface User extends IDefaultDBColumns {
  name: string;
  email: string;
}
// Includes: id, createdAt, updatedAt, deletedAt, isDeleted, isBlocked
```

### Firebase Types

#### `DBItemGenericDataType`

Generic database item type.

```typescript
import { DBItemGenericDataType } from 'ts-buildkit';

const item: DBItemGenericDataType = {
  id: '123',
  isDeleted: false,
  isBlocked: false,
  // ... other properties
};
```

#### `IFrbCollectionQueryItem`

Firebase collection query item.

```typescript
import { IFrbCollectionQueryItem } from 'ts-buildkit';

const query: IFrbCollectionQueryItem = {
  field: 'status',
  condition: FrbWhereConditionEnum.EQUAL,
  value: 'active'
};
```

#### `FormItemGenericDataType`

Generic form item data type.

```typescript
import { FormItemGenericDataType } from 'ts-buildkit';

const formData: FormItemGenericDataType = {
  // Form field values
};
```

### Permission Types

#### `IHasRequiredPermissions`

Permission check parameters.

```typescript
import { IHasRequiredPermissions } from 'ts-buildkit';

const permCheck: IHasRequiredPermissions = {
  userPermissions: ['read', 'write'],
  requiredPermissions: ['read'],
  excludedPermissions: ['admin'],
  checkMode: PermissionCheckModeEnum.AND
};
```

#### `IUseHasRequiredPermissions`

Hook parameters for permission checking.

```typescript
import { IUseHasRequiredPermissions } from 'ts-buildkit';

const hookParams: IUseHasRequiredPermissions = {
  userPermissions: ['read', 'write'],
  requiredPermissions: ['read'],
  excludedPermissions: ['admin'],
  checkMode: PermissionCheckModeEnum.AND,
  skip: false
};
```

#### `IUseHasRequiredPermissionsReturn`

Return type for permission hook.

```typescript
import { IUseHasRequiredPermissionsReturn } from 'ts-buildkit';

const result: IUseHasRequiredPermissionsReturn = {
  hasRequiredPermissions: true,
  isLoading: false
};
```

### Capacitor Types

#### `GeolocationCoordinates`

Geolocation coordinates type.

```typescript
import { GeolocationCoordinates } from 'ts-buildkit';

const coords: GeolocationCoordinates = {
  latitude: 40.7128,
  longitude: -74.0060,
  accuracy: 10,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null
};
```

#### `GetCapGeoLocationApiDataResponse`

Capacitor geolocation response.

```typescript
import { GetCapGeoLocationApiDataResponse } from 'ts-buildkit';

const response: GetCapGeoLocationApiDataResponse = {
  coords: { /* GeolocationCoordinates */ },
  timestamp: 1234567890123
};
```

#### `PlatformData`

Platform information type.

```typescript
import { PlatformData } from 'ts-buildkit';

const platform: PlatformData = {
  platform: 'web',
  isNative: false,
  isWeb: true
};
```

## Gaming Module

Import from `ts-buildkit/play-and-win`:

```typescript
import { 
  GameTypeEnum, 
  IGame, 
  IGameRoom 
} from 'ts-buildkit/play-and-win';
```

### Gaming Enums

#### `GameTypeEnum`

Game types.

```typescript
GameTypeEnum.POKER; // 'poker'
GameTypeEnum.BLACKJACK; // 'blackjack'
GameTypeEnum.ROULETTE; // 'roulette'
// ... more
```

#### `GameRoomStatusEnum`

Game room statuses.

```typescript
GameRoomStatusEnum.WAITING; // 'waiting'
GameRoomStatusEnum.IN_PROGRESS; // 'in_progress'
GameRoomStatusEnum.COMPLETED; // 'completed'
GameRoomStatusEnum.CANCELLED; // 'cancelled'
```

#### `TransactionTypeEnum`

Transaction types.

```typescript
TransactionTypeEnum.DEPOSIT; // 'deposit'
TransactionTypeEnum.WITHDRAWAL; // 'withdrawal'
TransactionTypeEnum.BET; // 'bet'
TransactionTypeEnum.WIN; // 'win'
TransactionTypeEnum.REFUND; // 'refund'
```

#### `TopupStatusEnum`

Top-up statuses.

```typescript
TopupStatusEnum.PENDING; // 'pending'
TopupStatusEnum.PROCESSING; // 'processing'
TopupStatusEnum.COMPLETED; // 'completed'
TopupStatusEnum.FAILED; // 'failed'
```

#### `WithdrawRequestStatusEnum`

Withdrawal request statuses.

```typescript
WithdrawRequestStatusEnum.PENDING; // 'pending'
WithdrawRequestStatusEnum.APPROVED; // 'approved'
WithdrawRequestStatusEnum.REJECTED; // 'rejected'
WithdrawRequestStatusEnum.PROCESSING; // 'processing'
WithdrawRequestStatusEnum.COMPLETED; // 'completed'
```

### Gaming Types

#### `IGame`

Game interface.

```typescript
interface IGame {
  id: string;
  name: string;
  type: GameTypeEnum;
  minPlayers: number;
  maxPlayers: number;
  minBet: number;
  maxBet: number;
  // ... more properties
}
```

#### `IGameRoom`

Game room interface.

```typescript
interface IGameRoom {
  id: string;
  gameId: string;
  status: GameRoomStatusEnum;
  players: string[];
  currentBet: number;
  pot: number;
  // ... more properties
}
```

#### `IUser`

Gaming user interface.

```typescript
interface IUser {
  id: string;
  username: string;
  email: string;
  balance: number;
  // ... more properties
}
```

#### `ITransaction`

Transaction interface.

```typescript
interface ITransaction {
  id: string;
  userId: string;
  type: TransactionTypeEnum;
  amount: number;
  timestamp: number;
  // ... more properties
}
```

### Gaming Constants

#### `playAndWinFieldsValidation`

Validation rules for gaming forms.

```typescript
import { playAndWinFieldsValidation } from 'ts-buildkit/play-and-win';

// Contains validation rules for gaming-specific fields
```

#### `appServiceFee`

Service fee configuration.

```typescript
import { appServiceFee } from 'ts-buildkit/play-and-win';

// Service fee percentages and rules
```

#### `timeLimits`

Time limits for gaming operations.

```typescript
import { timeLimits } from 'ts-buildkit/play-and-win';

// Time limits for bets, turns, etc.
```

## Roommate Module

Import from `ts-buildkit/roommate`:

```typescript
import { 
  GenderEnum, 
  IPlace, 
  IRoommateUser 
} from 'ts-buildkit/roommate';
```

### Roommate Enums

#### `GenderEnum`

Gender options.

```typescript
GenderEnum.MALE; // 'male'
GenderEnum.FEMALE; // 'female'
GenderEnum.OTHER; // 'other'
GenderEnum.PREFER_NOT_TO_SAY; // 'prefer_not_to_say'
```

#### `OccupationEnum`

Occupation types.

```typescript
OccupationEnum.STUDENT; // 'student'
OccupationEnum.PROFESSIONAL; // 'professional'
OccupationEnum.FREELANCER; // 'freelancer'
OccupationEnum.BUSINESS_OWNER; // 'business_owner'
// ... more
```

#### `CleanlinessEnum`

Cleanliness levels.

```typescript
CleanlinessEnum.VERY_TIDY; // 'very_tidy'
CleanlinessEnum.TIDY; // 'tidy'
CleanlinessEnum.AVERAGE; // 'average'
CleanlinessEnum.MESSY; // 'messy'
```

#### `SmokeEnum`

Smoking preferences.

```typescript
SmokeEnum.YES; // 'yes'
SmokeEnum.NO; // 'no'
SmokeEnum.OCCASIONALLY; // 'occasionally'
SmokeEnum.OUTSIDE_ONLY; // 'outside_only'
```

#### `PetsEnum`

Pet preferences.

```typescript
PetsEnum.YES; // 'yes'
PetsEnum.NO; // 'no'
PetsEnum.CATS_OK; // 'cats_ok'
PetsEnum.DOGS_OK; // 'dogs_ok'
PetsEnum.SMALL_PETS_OK; // 'small_pets_ok'
```

#### `BuildingTypeEnum`

Building types.

```typescript
BuildingTypeEnum.APARTMENT; // 'apartment'
BuildingTypeEnum.HOUSE; // 'house'
BuildingTypeEnum.CONDO; // 'condo'
BuildingTypeEnum.TOWNHOUSE; // 'townhouse'
// ... more
```

#### `PlaceStatusEnum`

Place availability status.

```typescript
PlaceStatusEnum.AVAILABLE; // 'available'
PlaceStatusEnum.OCCUPIED; // 'occupied'
PlaceStatusEnum.PENDING; // 'pending'
PlaceStatusEnum.UNAVAILABLE; // 'unavailable'
```

### Roommate Types

#### `IRoommateUser`

Roommate user interface.

```typescript
interface IRoommateUser {
  id: string;
  name: string;
  age: number;
  gender: GenderEnum;
  occupation: OccupationEnum;
  lifestyle: ILifeStyle;
  preferences: IRoommatePreference;
  // ... more properties
}
```

#### `IPlace`

Place/property interface.

```typescript
interface IPlace {
  id: string;
  title: string;
  description: string;
  buildingType: BuildingTypeEnum;
  address: string;
  rent: IRent;
  amenities: string[];
  images: IPlaceImages;
  // ... more properties
}
```

#### `ILifeStyle`

Lifestyle preferences interface.

```typescript
interface ILifeStyle {
  cleanliness: CleanlinessEnum;
  smoking: SmokeEnum;
  pets: PetsEnum;
  guests: GuestsEnum;
  workSchedule: WorkScheduleEnum;
  // ... more properties
}
```

#### `IRoommatePreference`

Roommate preference interface.

```typescript
interface IRoommatePreference {
  ageRange: { min: number; max: number };
  gender: GenderEnum[];
  occupation: OccupationEnum[];
  cleanliness: CleanlinessEnum[];
  // ... more properties
}
```

#### `IRent`

Rent information interface.

```typescript
interface IRent {
  amount: number;
  currency: string;
  includes: RentInclusionsEnum[];
  deposit: number;
  // ... more properties
}
```

## Constants

### API Constants

#### `apiConstants`

API configuration constants.

```typescript
import { apiConstants } from 'ts-buildkit';

apiConstants.defaultTimeout; // 30000
apiConstants.maxRetries; // 3
// ... more
```

#### `apiHeaderKeys`

Standard API header keys.

```typescript
import { apiHeaderKeys } from 'ts-buildkit';

apiHeaderKeys.authorization; // 'Authorization'
apiHeaderKeys.contentType; // 'Content-Type'
apiHeaderKeys.accept; // 'Accept'
// ... more
```

### Messages

#### `ztkMessages`

Standard messages for responses.

```typescript
import { ztkMessages } from 'ts-buildkit';

ztkMessages.success; // 'Operation completed successfully'
ztkMessages.error; // 'An error occurred'
ztkMessages.notFound; // 'Resource not found'
// ... more
```

### SVG Icon Types

#### `svgIconTypes`

Available SVG icon types.

```typescript
import { svgIconTypes } from 'ts-buildkit';

// Array of available icon names
// ['home', 'user', 'settings', 'search', ...]
```

### Time Constants

#### `timeUnitType`

Time unit type mapping.

```typescript
import { timeUnitType } from 'ts-buildkit';

timeUnitType.ms; // 'milliseconds'
timeUnitType.s; // 'seconds'
timeUnitType.m; // 'minutes'
timeUnitType.h; // 'hours'
timeUnitType.d; // 'days'
```

## Validation Enum Values

These utilities help with form validation and enum value checking:

#### `booleanEnumVal`

Boolean enum values for validation.

```typescript
import { booleanEnumVal } from 'ts-buildkit';

// Array of valid boolean string values
// ['true', 'false']
```

#### `requestStatusVal`

Request status values for validation.

```typescript
import { requestStatusVal } from 'ts-buildkit';

// Array of valid request status values
// ['idle', 'pending', 'success', 'error']
```

#### `userRoleEnumVal`

User role values for validation.

```typescript
import { userRoleEnumVal } from 'ts-buildkit';

// Array of valid user role values
// ['super_admin', 'admin', 'moderator', 'user', 'guest']
```

## Error Handling

The library provides comprehensive error handling utilities:

### Custom Error Reporting

```typescript
import { reportCustomError } from 'ts-buildkit';

try {
  // Your code
} catch (error) {
  reportCustomError(error, 'Context: Processing user payment');
}
```

### Stripe Error Messages

```typescript
import { 
  getStripeErrorMessageByErrorCode,
  getStripeErrorMessageByRequirement,
  getStripeErrorMessageByDisabledCode 
} from 'ts-buildkit';

// Handle Stripe errors with user-friendly messages
const message = getStripeErrorMessageByErrorCode('card_declined');
// 'Your card was declined. Please try another payment method.'
```

## Best Practices

### 1. Configuration

Always configure the library before using cryptography features:

```typescript
import { configureZTK } from 'ts-buildkit';

// In your app initialization
configureZTK({ 
  cryptoSecret: process.env.CRYPTO_SECRET 
});
```

### 2. Type Safety

Use the provided types and interfaces for better type safety:

```typescript
import { IGenericObject, RequestTypeEnum } from 'ts-buildkit';

function makeRequest(
  url: string, 
  method: RequestTypeEnum, 
  data: IGenericObject
) {
  // Implementation
}
```

### 3. Validation

Always validate user input using the provided validators:

```typescript
import { validateEmail, validatePhoneNumber, validateURL } from 'ts-buildkit';

const emailResult = validateEmail(userEmail, ['company.com']);
if (!emailResult) {
  throw new Error('Invalid email domain');
}
```

### 4. Error Handling

Use the error reporting utilities for consistent error tracking:

```typescript
import { reportCustomError } from 'ts-buildkit';

async function riskyOperation() {
  try {
    // Your code
  } catch (error) {
    reportCustomError(error, 'Failed in riskyOperation');
    throw error; // Re-throw if needed
  }
}
```

### 5. Tree Shaking

Import only what you need for optimal bundle size:

```typescript
// Good - specific imports
import { isValidEmail, formatUSD } from 'ts-buildkit';

// Avoid - importing everything
import * as tk from 'ts-buildkit';
```

## Platform Compatibility

The library is designed to work in both Node.js and browser environments. Some utilities may have platform-specific behavior:

- File operations require appropriate environment
- Cryptography features require the crypto-js peer dependency
- Date operations require the dayjs peer dependency

## Migration Guide

If upgrading from an older version:

1. Update import paths for modular imports
2. Install required peer dependencies
3. Update any deprecated function calls
4. Review breaking changes in the changelog

## Support

For issues, feature requests, or questions:

- GitHub Issues: [Report an issue](https://github.com/your-repo/ts-buildkit/issues)
- Documentation: Check this comprehensive guide
- Examples: See the examples directory in the repository

---

This documentation covers all exported functions, types, interfaces, and enums from the ts-buildkit package. For the most up-to-date information, always refer to the TypeScript definitions included with the package.