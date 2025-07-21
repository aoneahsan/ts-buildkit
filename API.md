# ts-buildkit API Documentation

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Module Entry Points](#module-entry-points)
3. [Utility Functions](#utility-functions)
4. [Enums](#enums)
5. [Types & Interfaces](#types--interfaces)
6. [Constants](#constants)
7. [Package Utilities](#package-utilities)
8. [Play & Win Module](#play--win-module)
9. [Roommate Module](#roommate-module)
10. [Optional Dependencies](#optional-dependencies)

## Installation & Setup

### Basic Installation

```bash
npm install ts-buildkit
```

### Configuration

Some features require configuration before use:

```typescript
import { configureZTK } from 'ts-buildkit';

configureZTK({
  cryptoSecret: 'your-secure-secret-key',
});
```

## Module Entry Points

- **Main module**: `ts-buildkit` - Core utilities
- **Gaming module**: `ts-buildkit/play-and-win` - Gaming types and utilities
- **Roommate module**: `ts-buildkit/roommate` - Roommate finding functionality
- **Optional dependencies**:
  - `ts-buildkit/require-package/zod` - Zod schema validation
  - `ts-buildkit/require-package/dayjs` - Date manipulation
  - `ts-buildkit/require-package/crypto-js` - Cryptography

## Utility Functions

### String Manipulation

#### `convertToTitleCase(s: string): string`

Converts camelCase string to title case.

```typescript
convertToTitleCase('helloWorld'); // 'Hello World'
```

#### `truncateString(text: string, length?: number): string`

Truncates string to specified length with ellipsis.

```typescript
truncateString('This is a long text', 10); // 'This is a...'
```

#### `generateSlug(options: {text: string, options?: SlugOptions}): string | undefined`

Generates URL-friendly slug from text.

```typescript
generateSlug({ text: 'Hello World!' }); // 'hello-world'
```

#### `escapeRegex(str: string): string`

Escapes special regex characters in string.

```typescript
escapeRegex('test.com'); // 'test\\.com'
```

#### `getTextOnly(html: string): string`

Extracts plain text from HTML string.

```typescript
getTextOnly('<p>Hello <b>World</b></p>'); // 'Hello World'
```

### Validation Functions

#### `isValidEmail(email: string): boolean`

Validates email address format.

```typescript
isValidEmail('user@example.com'); // true
isValidEmail('invalid-email'); // false
```

#### `isValidUrl(url: string): boolean`

Validates URL format.

```typescript
isValidUrl('https://example.com'); // true
isValidUrl('not-a-url'); // false
```

#### `validatePhoneNumber(phone: string): boolean`

Validates phone number format.

```typescript
validatePhoneNumber('+1234567890'); // true
validatePhoneNumber('123'); // false
```

#### `containSpecialCharacters(text: string): boolean`

Checks if text contains special characters.

```typescript
containSpecialCharacters('hello@world'); // true
containSpecialCharacters('helloworld'); // false
```

#### `isZNonEmptyString(value: string | undefined | null): boolean`

Checks if value is a non-empty string.

```typescript
isZNonEmptyString('hello'); // true
isZNonEmptyString(''); // false
isZNonEmptyString(null); // false
```

#### `isZValidNumber(value: number | string | undefined | null, checkPositive?: boolean): boolean`

Validates if value is a valid number.

```typescript
isZValidNumber(123); // true
isZValidNumber('123'); // true
isZValidNumber('abc'); // false
isZValidNumber(-5, true); // false (checkPositive=true)
```

### Type Checking

#### `isArray(arr: unknown, checkLength?: boolean): boolean`

Checks if value is an array.

```typescript
isArray([1, 2, 3]); // true
isArray([], true); // false (checkLength=true, empty array)
isArray('not array'); // false
```

#### `isObject(obj: unknown, checkKeys?: boolean): boolean`

Checks if value is an object.

```typescript
isObject({ key: 'value' }); // true
isObject({}, true); // false (checkKeys=true, no keys)
isObject(null); // false
```

#### `isFunction(fn: unknown): boolean`

Checks if value is a function.

```typescript
isFunction(() => {}); // true
isFunction(function () {}); // true
isFunction('not function'); // false
```

#### `isNullOrUndefined(value: any): boolean`

Checks if value is null or undefined.

```typescript
isNullOrUndefined(null); // true
isNullOrUndefined(undefined); // true
isNullOrUndefined(0); // false
isNullOrUndefined(''); // false
```

### Cryptography Functions

> **Note**: Requires `configureZTK` to be called with `cryptoSecret`.

#### `encryptData(val: unknown): string | null`

Encrypts data using configured secret.

```typescript
const encrypted = encryptData({ message: 'secret data' });
// Returns encrypted string
```

#### `decryptData<T>(val: string): T | null`

Decrypts data using configured secret.

```typescript
const data = decryptData<{ message: string }>(encrypted);
// Returns: { message: 'secret data' }
```

#### `encryptWithSecretKey(data: unknown, secretKey: string): string`

Encrypts data with custom secret key.

```typescript
const encrypted = encryptWithSecretKey({ data: 'sensitive' }, 'custom-secret');
```

#### `decryptWithSecretKey<T>(encryptedData: string, secretKey: string): T`

Decrypts data with custom secret key.

```typescript
const data = decryptWithSecretKey<{ data: string }>(encrypted, 'custom-secret');
```

### Date/Time Functions

#### `convertToDateTimestampToStoreInDB(date: string | Date): number`

Converts date to timestamp for database storage.

```typescript
const timestamp = convertToDateTimestampToStoreInDB(new Date());
// Returns: 1234567890123
```

#### `getDateFromFrbTimestamp(timestamp: number | string): string`

Converts Firebase timestamp to date string.

```typescript
const dateStr = getDateFromFrbTimestamp(1234567890123);
// Returns: '2009-02-13T23:31:30.123Z'
```

#### `getRemainingTimeForCountDown(endTime: string | Date): RemainingTime`

Calculates remaining time for countdown.

```typescript
const remaining = getRemainingTimeForCountDown('2025-12-31');
// Returns: { days: 30, hours: 12, minutes: 45, seconds: 30 }
```

#### `getTimeInUnit(value: number, unit: TimeUnitEnum): number`

Converts time between units.

```typescript
getTimeInUnit(3600, TimeUnitEnum.Minutes); // 60
getTimeInUnit(24, TimeUnitEnum.Days); // 1
```

### Array/Object Utilities

#### `flattenArray<T>(arr: T[][]): T[]`

Flattens nested arrays.

```typescript
flattenArray([[1, 2], [3, 4], [5]]); // [1, 2, 3, 4, 5]
```

#### `checkEqualityOfTwoArray(arr1: any[], arr2: any[]): boolean`

Checks if two arrays are equal.

```typescript
checkEqualityOfTwoArray([1, 2, 3], [1, 2, 3]); // true
checkEqualityOfTwoArray([1, 2], [2, 1]); // false
```

#### `isEqual(x: any, y: any): boolean`

Deep equality check for any values.

```typescript
isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true
isEqual([1, 2, 3], [1, 2, 3]); // true
```

#### `checkIfKeyExists(obj: Record<string, unknown>, key: string, checkNull?: boolean): boolean`

Checks if key exists in object.

```typescript
checkIfKeyExists({ name: 'John' }, 'name'); // true
checkIfKeyExists({ name: null }, 'name', true); // false
```

#### `getObjectKey(obj: any, key: string, defaultValue?: any, checkNull?: boolean): any`

Safely gets object key with optional default.

```typescript
getObjectKey({ name: 'John' }, 'name'); // 'John'
getObjectKey({}, 'name', 'Default'); // 'Default'
```

### URL/Web Utilities

#### `addUrlProtocolHandler(url: string, isLocalhost?: boolean): string`

Adds protocol to URL if missing.

```typescript
addUrlProtocolHandler('example.com'); // 'https://example.com'
addUrlProtocolHandler('localhost:3000', true); // 'http://localhost:3000'
```

#### `containQueryParams(url: string): boolean | ''`

Checks if URL contains query parameters.

```typescript
containQueryParams('https://example.com?param=value'); // true
containQueryParams('https://example.com'); // false
```

#### `replaceUrlDynamicParts(options: UrlReplaceOptions): string`

Replaces dynamic parts in URL template.

```typescript
replaceUrlDynamicParts({
  url: '/users/:id/posts/:postId',
  itemsId: ['123', '456'],
  urlDynamicParts: [':id', ':postId'],
});
// Returns: '/users/123/posts/456'
```

### Image/File Utilities

#### `imageUrlToBase64(url?: string, authToken?: string): Promise<string>`

Converts image URL to base64 string.

```typescript
const base64 = await imageUrlToBase64('https://example.com/image.jpg');
// Returns: 'data:image/jpeg;base64,...'
```

#### `getImageDimensions(src: string): Promise<{width: number, height: number}>`

Gets image dimensions from URL.

```typescript
const dimensions = await getImageDimensions('image.jpg');
// Returns: { width: 800, height: 600 }
```

#### `imageTypeAllowed(type: string): boolean`

Checks if image MIME type is allowed.

```typescript
imageTypeAllowed('image/jpeg'); // true
imageTypeAllowed('image/bmp'); // false
```

#### `validateFileBeforeUpload(file: File, options: FileValidationOptions): ValidationResult`

Validates file before upload.

```typescript
const result = await validateFileBeforeUpload(file, {
  maxSizeInMB: 5,
  allowedTypes: ['image/jpeg', 'image/png'],
});
// Returns: { isValid: true/false, error?: string }
```

### ID/Code Generation

#### `getZUniqueKey(): string`

Generates unique random key.

```typescript
const key = getZUniqueKey();
// Returns: 'k7x9m2p4n8'
```

#### `generateUniqueCode(length?: number): string`

Generates unique alphanumeric code.

```typescript
const code = generateUniqueCode(8);
// Returns: 'ABC12DEF'
```

#### `generateUUID(): string`

Generates UUID v4.

```typescript
const uuid = generateUUID();
// Returns: '550e8400-e29b-41d4-a716-446655440000'
```

### Permission/Role Functions

#### `hasPermission(userPermissions: string[], requiredPermission: string): boolean`

Checks if user has specific permission.

```typescript
hasPermission(['read', 'write'], 'read'); // true
hasPermission(['read'], 'delete'); // false
```

#### `validateRequiredPermissions(options: RequiredPermissionsOptions): boolean`

Validates if user has required permissions.

```typescript
validateRequiredPermissions({
  userPermissions: ['read', 'write'],
  requiredPermissions: ['read'],
  checkModeForRequiredPermissions: PermissionCheckModeEnum.every,
}); // true
```

#### `getPermissions(role: RoleEnum): string[]`

Gets permissions for a specific role.

```typescript
const permissions = getPermissions(RoleEnum.Admin);
// Returns: ['read', 'write', 'delete', ...]
```

### JSON Utilities

#### `zStringify(_data: unknown): string`

Safe JSON stringify with error handling.

```typescript
zStringify({ name: 'John', age: 30 });
// Returns: '{"name":"John","age":30}'
```

#### `zJsonParse<T>(_data: string): T | undefined`

Safe JSON parse with error handling.

```typescript
const data = zJsonParse<{ name: string }>('{"name":"John"}');
// Returns: { name: 'John' }
```

## Enums

### Response/Status Enums

```typescript
enum ResponseStatusEnum {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}

enum ResponseCodeEnum {
  success = 'success',
  failed = 'failed',
  notFound = 'notFound',
  alreadyExists = 'alreadyExists',
}
```

### Permission/Role Enums

```typescript
enum RoleEnum {
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  User = 'user',
}

enum PermissionEnum {
  read = 'read',
  write = 'write',
  delete = 'delete',
  update = 'update',
}

enum PermissionCheckModeEnum {
  every = 'every',
  any = 'any',
}
```

### Type Checking Enums

```typescript
enum varTypesEnum {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
  FUNCTION = 'function',
  NULL = 'null',
  UNDEFINED = 'undefined',
}
```

### Time Unit Enums

```typescript
enum TimeUnitEnum {
  Years = 'years',
  Months = 'months',
  Days = 'days',
  Hours = 'hours',
  Minutes = 'minutes',
  Seconds = 'seconds',
  Milliseconds = 'milliseconds',
}
```

### Platform Enums

```typescript
enum PlatformTypeEnum {
  web = 'web',
  android = 'android',
  ios = 'ios',
}
```

## Types & Interfaces

### Generic Types

```typescript
interface IGenericObject {
  [key: string]: any;
}

interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface IDefaultDBColumns {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
  isBlocked?: boolean;
}
```

### Permission Types

```typescript
interface IHasRequiredPermissions {
  userPermissions: string[];
  requiredPermissions: string[];
  checkModeForRequiredPermissions?: PermissionCheckModeEnum;
  excludedPermissions?: string[];
}
```

### Database Types

```typescript
type DBItemGenericDataType = IGenericObject & IDefaultDBColumns;

type FormItemGenericDataType = Omit<
  DBItemGenericDataType,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
```

## Constants

### API Constants

```typescript
const apiConstants = {
  headerKeys: {
    authorization: 'authorization',
    contentType: 'content-type',
  },
  contentTypes: {
    json: 'application/json',
    formData: 'multipart/form-data',
  },
};
```

### Date Format Constants

```typescript
const dateFormat = {
  default: 'YYYY-MM-DD',
  withTime: 'YYYY-MM-DD HH:mm:ss',
  display: 'MMM DD, YYYY',
  time: 'HH:mm',
  full: 'MMMM DD, YYYY HH:mm:ss',
};
```

### Validation Constants

```typescript
const fieldsValidation = {
  generic: {
    title: { min: { val: 1 }, max: { val: 100 } },
    description: { min: { val: 1 }, max: { val: 500 } },
    shortDescription: { min: { val: 1 }, max: { val: 200 } },
  },
  user: {
    name: { min: { val: 2 }, max: { val: 50 } },
    email: { min: { val: 5 }, max: { val: 100 } },
    password: { min: { val: 8 }, max: { val: 100 } },
  },
};
```

### Image Constants

```typescript
const allowedImageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];
```

## Package Utilities

### Array Move Utilities

```typescript
// Immutable array move
function arrayMoveImmutable<T>(array: T[], from: number, to: number): T[];

// Mutable array move (modifies original)
function arrayMoveMutable<T>(array: T[], from: number, to: number): void;
```

### Class Name Utilities

```typescript
// Combine class names conditionally
classNames('foo', { bar: true, baz: false }, ['qux']);
// Returns: 'foo bar qux'

// Bind styles object
const cx = classNamesBind(styles);
cx('button', { active: isActive });

// Remove duplicate class names
classNamesDedupe('foo foo bar baz bar');
// Returns: 'foo bar baz'
```

### Coupon Code Utilities

```typescript
// Generate coupon code
const coupon = generateCouponCode({
  parts: 3,
  partLen: 4,
});
// Returns: 'ABCD-EFGH-IJKL'

// Validate coupon format
validateCouponCode('ABCD-EFGH-IJKL'); // true

// Check for inappropriate words
checkIfCouponCodeHasBadWord('DAMN-CODE-HERE'); // true
```

## Play & Win Module

Import from `ts-buildkit/play-and-win`:

### Enums

```typescript
enum GameTypeEnum {
  Quiz = 'quiz',
  Puzzle = 'puzzle',
  Trivia = 'trivia',
}

enum GameRoomStatusEnum {
  Waiting = 'waiting',
  InProgress = 'inProgress',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

enum TransactionTypeEnum {
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
  Transfer = 'transfer',
  Reward = 'reward',
}
```

### Types

```typescript
interface IGame {
  id: string;
  title: string;
  description: string;
  type: GameTypeEnum;
  minPlayers: number;
  maxPlayers: number;
  entryFee: number;
  prizePool: number;
  status: string;
}

interface IGameRoom {
  id: string;
  gameId: string;
  hostId: string;
  players: string[];
  status: GameRoomStatusEnum;
  startTime?: Date;
  endTime?: Date;
}

interface IUser {
  id: string;
  username: string;
  email: string;
  balance: number;
  totalGamesPlayed: number;
  totalWinnings: number;
  level: number;
  experience: number;
}

interface ITransaction {
  id: string;
  userId: string;
  type: TransactionTypeEnum;
  amount: number;
  description: string;
  status: string;
  createdAt: Date;
}
```

### Constants

```typescript
const playAndWinFieldsValidation = {
  username: { min: { val: 3 }, max: { val: 20 } },
  roomCode: { min: { val: 6 }, max: { val: 6 } },
  withdrawAmount: { min: { val: 10 }, max: { val: 10000 } },
};

const appServiceFee = {
  percentage: 5, // 5% service fee
  minimum: 1, // Minimum $1 fee
  maximum: 100, // Maximum $100 fee
};
```

## Roommate Module

Import from `ts-buildkit/roommate`:

### Enums

```typescript
enum GenderEnum {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  PreferNotToSay = 'preferNotToSay',
}

enum OccupationEnum {
  Student = 'student',
  Professional = 'professional',
  Freelancer = 'freelancer',
  Business = 'business',
  Retired = 'retired',
  Other = 'other',
}

enum CleanlinessEnum {
  VeryClean = 'veryClean',
  Clean = 'clean',
  Average = 'average',
  Messy = 'messy',
}

enum SmokeEnum {
  NonSmoker = 'nonSmoker',
  Smoker = 'smoker',
  OccasionalSmoker = 'occasionalSmoker',
}

enum PetsEnum {
  NoPets = 'noPets',
  HasPets = 'hasPets',
  PetFriendly = 'petFriendly',
  NotPetFriendly = 'notPetFriendly',
}
```

### Types

```typescript
interface IRoommateUser {
  id: string;
  userInfo: IUserInfo;
  preferences: IUserPreference;
  lifestyle: ILifeStyle;
  roommatePreferences: IRoommatePreference;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserInfo {
  name: string;
  age: number;
  gender: GenderEnum;
  occupation: OccupationEnum;
  phone: string;
  email: string;
  bio?: string;
  profilePicture?: string;
}

interface IUserPreference {
  budget: {
    min: number;
    max: number;
  };
  moveInDate: Date;
  preferredLocations: string[];
  roomType: 'private' | 'shared';
}

interface ILifeStyle {
  workSchedule: WorkScheduleEnum;
  sleepSchedule: {
    bedtime: string;
    wakeTime: string;
  };
  cleanliness: CleanlinessEnum;
  smoking: SmokeEnum;
  drinking: 'noDrinking' | 'socialDrinking' | 'regularDrinking';
  pets: PetsEnum;
  guests: GuestsEnum;
  hobbies: string[];
}

interface IRoommatePreference {
  ageRange: {
    min: number;
    max: number;
  };
  gender: GenderEnum | 'any';
  occupation: OccupationEnum | 'any';
  cleanliness: CleanlinessEnum | 'any';
  smoking: SmokeEnum | 'any';
  pets: PetsEnum | 'any';
}
```

### Constants

```typescript
const constellationsVal = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];
```

## Optional Dependencies

### Zod Integration

```typescript
// Import from ts-buildkit/require-package/zod
import { z } from 'ts-buildkit/require-package/zod';

// Use Zod normally
const schema = z.object({
  name: z.string(),
  age: z.number(),
});
```

### Day.js Integration

```typescript
// Import from ts-buildkit/require-package/dayjs
import dayjs from 'ts-buildkit/require-package/dayjs';

// Use dayjs normally
const date = dayjs().format('YYYY-MM-DD');
```

### Crypto-js Integration

```typescript
// Import from ts-buildkit/require-package/crypto-js
import CryptoJS from 'ts-buildkit/require-package/crypto-js';

// Use crypto-js normally
const encrypted = CryptoJS.AES.encrypt('message', 'secret').toString();
```

## Error Handling

All functions that can fail return `null` or `undefined` instead of throwing errors, unless explicitly documented otherwise. Always check return values:

```typescript
const encrypted = encryptData(data);
if (!encrypted) {
  // Handle encryption failure
}

const parsed = zJsonParse<MyType>(jsonString);
if (!parsed) {
  // Handle parse failure
}
```

## Best Practices

1. **Always configure before using crypto functions**:

   ```typescript
   configureZTK({ cryptoSecret: 'your-secret' });
   ```

2. **Use type guards for runtime type checking**:

   ```typescript
   if (isArray(data) && isObject(data[0])) {
     // Safe to use as array of objects
   }
   ```

3. **Prefer specific validation functions**:

   ```typescript
   // Good
   isValidEmail(email);

   // Less specific
   containSpecialCharacters(email);
   ```

4. **Use enums for type safety**:

   ```typescript
   // Good
   if (status === ResponseStatusEnum.OK) {
   }

   // Avoid
   if (status === 200) {
   }
   ```

5. **Handle optional peer dependencies**:
   ```typescript
   try {
     import dayjs from 'ts-buildkit/require-package/dayjs';
   } catch (error) {
     // dayjs not installed
   }
   ```

---

Made with ❤️ by Ahsan Mahmood
