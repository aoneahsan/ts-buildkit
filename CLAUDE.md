# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
ts-buildkit is a TypeScript utility library providing 100+ helper functions for modern web development. It's designed to work in both Node.js and browser environments with full TypeScript support and tree-shaking capabilities.

## Essential Commands

### Development
```bash
yarn dev        # Start development with watch mode
yarn build      # Create production build
yarn test       # Run tests with simple test runner
yarn test:vitest # Run unit tests with Vitest
yarn prettier   # Format code
yarn deploy     # Build and publish to npm
```

### Before Development
1. Ensure Node.js v24.2.0 is installed (check `.nvmrc`)
2. Install dependencies: `yarn install`
3. For linked packages: `yarn update:linked-packages`

## Architecture Overview

### Module Structure
The library exports multiple entry points for tree-shaking:
- **Main module**: Core utilities via `ts-buildkit`
- **Gaming module**: `ts-buildkit/play-and-win` - Gaming types and utilities
- **Roommate module**: `ts-buildkit/roommate` - Roommate finding functionality
- **Optional deps**: `ts-buildkit/require-package/{zod,dayjs,crypto-js}` - Wrapped peer dependencies

### Path Aliases
TypeScript is configured with these aliases:
- `@app/*` → `./src/*`
- `@app-types/*` → `./src/types/*`
- `@app-enums/*` → `./src/enums/*`
- `@app-utils/*` → `./src/utils/*`

### Key Directories
- `/src/utils/`: Core utility functions (constants, helpers, messages)
- `/src/enums/`: Extensive enum definitions
- `/src/types/`: TypeScript type definitions
- `/src/configure/`: Library configuration (crypto setup)
- `/src/packages/`: External utility packages
- `/src/validationEvalEnums/`: Validation-specific enums

## Critical Development Notes

### TypeScript Requirements
- **Strict mode** is enabled - no implicit any
- **isolatedDeclarations**: All exported functions MUST have explicit return types
- **isolatedModules**: Use `import type` for type-only imports
- Target: ES2017, Module: ES2020

### Cryptography Configuration
Any code using crypto utilities requires initialization:
```typescript
import { configureZTK } from 'ts-buildkit';
configureZTK({ cryptoSecret: 'secure-key' });
```

### Testing Approach
- Framework: Vitest
- Test files: `*.test.{js,ts}` in `/src` or `/tests`
- Simple integration test: `/tests/index.js`
- Run specific test: Use Vitest's built-in filtering

### Build System
- Bundler: tsup
- Output formats: CommonJS (.js) and ESM (.mjs)
- Generates TypeScript declarations (.d.ts)
- Minification and tree-shaking enabled

### Platform Compatibility
Code must work in both Node.js (>=22.2.0) and browser environments. Avoid Node.js-specific APIs unless wrapped with platform checks.

### Peer Dependencies
Optional dependencies (crypto-js, dayjs, zod) are wrapped in `/src/require-package/`. These throw helpful errors if used without installation.

## Common Development Tasks

### Adding a New Utility Function
1. Add to appropriate file in `/src/utils/`
2. Export from `/src/utils/index.ts`
3. Ensure explicit return type (TypeScript requirement)
4. Add corresponding test file
5. Update README.md if it's a public API

### Adding a New Module
1. Create directory under `/src/`
2. Add entry point in `tsup.config.ts`
3. Add export path in `package.json`
4. Update build output in `package.json` files array

### Working with Enums
Enums are centralized in `/src/enums/`. Follow existing patterns for consistency and always export from the main enum index.

## Code Style
- Use Prettier (configured in repository)
- Follow existing patterns for consistency
- Maintain comprehensive JSDoc comments for public APIs
- Keep platform-neutral code