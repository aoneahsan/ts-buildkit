# Changelog

All notable changes to ts-buildkit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-07-11

### 🎉 Initial Release

This is the initial release of ts-buildkit (formerly zaions-tool-kit and ts-tool-kit), a comprehensive TypeScript utility library providing 100+ helper functions for modern web development.

### Added

#### Core Features
- 🔒 **Cryptography Module**: AES encryption/decryption with configurable secrets
- 🧩 **Type System**: Extensive TypeScript type definitions, enums, and interfaces
- 🛠️ **Utility Functions**: 100+ helper functions for common development tasks
- 🎮 **Gaming Module**: Specialized utilities and types for gaming applications
- 🏠 **Roommate Module**: Utilities for roommate matching and management
- 📦 **Modular Design**: Tree-shakeable exports with multiple entry points
- 🌐 **Cross-Platform**: Works in both Node.js (>=22.2.0) and browser environments

#### Utility Categories
- **String Manipulation**: Title case conversion, slug generation, truncation, HTML text extraction
- **Validation**: Email, URL, phone number, special characters, form validation
- **Type Guards**: Runtime type checking for arrays, objects, functions, null/undefined
- **Cryptography**: Data encryption/decryption with custom or configured secrets
- **Date/Time**: Timestamp conversion, countdown calculation, time unit conversion
- **Arrays/Objects**: Deep equality, flattening, key checking, safe property access
- **URL/Web**: Protocol handling, query param detection, dynamic URL replacement
- **Image/File**: Base64 conversion, dimension calculation, type validation, upload validation
- **ID Generation**: UUID, unique codes, random keys
- **Permissions**: Role-based access control, permission validation
- **JSON**: Safe stringify/parse with error handling

#### Modules
- **Main Module** (`ts-buildkit`): Core utilities and functions
- **Gaming Module** (`ts-buildkit/play-and-win`): Game types, room management, transactions
- **Roommate Module** (`ts-buildkit/roommate`): Roommate preferences, lifestyle matching
- **Optional Dependencies**: Wrapped peer dependencies for Zod, Day.js, and Crypto-js

#### Infrastructure
- Full TypeScript support with strict mode
- ESM and CommonJS builds
- Minified production builds
- Tree-shaking support
- Comprehensive JSDoc comments

### Changed
- **Package Name**: Renamed from `zaions-tool-kit`/`ts-tool-kit` to `ts-buildkit`
- **Author**: Updated from "Zaions Dev Team" to "Ahsan Mahmood"
- **Repository**: Moved from `https://github.com/zaions/tool-kit` to `https://github.com/aoneahsan/ts-buildkit`
- **License**: Changed from MIT to ISC

### Technical Details
- **Node.js**: Requires >= 22.2.0
- **TypeScript**: 5.8.3
- **Build Tool**: tsup 8.5.0
- **Test Framework**: Vitest 3.2.4
- **Package Manager**: Yarn 1.22.22

### Peer Dependencies
- `crypto-js`: ^4.2.0 (optional)
- `dayjs`: ^1.11.13 (optional)
- `zod`: ^4.0.5 (optional)

---

## Migration Notes

### From zaions-tool-kit or ts-tool-kit

1. Update package.json:
   ```bash
   npm uninstall zaions-tool-kit ts-tool-kit
   npm install ts-buildkit
   ```

2. Update imports:
   ```typescript
   // Old
   import { utility } from 'zaions-tool-kit';
   import { utility } from 'ts-tool-kit';
   
   // New
   import { utility } from 'ts-buildkit';
   ```

3. No API changes required - all functions maintain backward compatibility.

---

Made with ❤️ by Ahsan Mahmood