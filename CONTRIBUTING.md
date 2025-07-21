# Contributing to ts-buildkit

First off, thank you for considering contributing to ts-buildkit! It's people like you that make ts-buildkit such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by the [ts-buildkit Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for ts-buildkit. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report).

#### Before Submitting A Bug Report

- **Check the documentation** for a list of common questions and problems.
- **Perform a [cursory search](https://github.com/aoneahsan/ts-buildkit/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://github.com/aoneahsan/ts-buildkit/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.
- **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for ts-buildkit, including completely new features and minor improvements to existing functionality.

#### Before Submitting An Enhancement Suggestion

- **Check the documentation** to see if the enhancement is already available.
- **Perform a [cursory search](https://github.com/aoneahsan/ts-buildkit/issues)** to see if the enhancement has already been suggested.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/aoneahsan/ts-buildkit/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Explain why this enhancement would be useful** to most ts-buildkit users.

### Your First Code Contribution

Unsure where to begin contributing to ts-buildkit? You can start by looking through these `beginner` and `help-wanted` issues:

- [Beginner issues](https://github.com/aoneahsan/ts-buildkit/labels/beginner) - issues which should only require a few lines of code, and a test or two.
- [Help wanted issues](https://github.com/aoneahsan/ts-buildkit/labels/help%20wanted) - issues which should be a bit more involved than `beginner` issues.

### Pull Requests

The process described here has several goals:

- Maintain ts-buildkit's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible ts-buildkit
- Enable a sustainable system for ts-buildkit's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing

## Development Setup

### Prerequisites

- Node.js >= 22.2.0
- Yarn >= 1.22.22
- Git

### Setting Up Your Local Environment

1. Fork the repository
2. Clone your fork:

   ```bash
   git clone https://github.com/your-username/ts-buildkit.git
   cd ts-buildkit
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Create a branch:
   ```bash
   git checkout -b my-feature-branch
   ```

### Development Workflow

1. Make your changes
2. Run tests:

   ```bash
   yarn test:vitest
   yarn test
   ```

3. Format your code:

   ```bash
   yarn prettier
   ```

4. Build the project:

   ```bash
   yarn build
   ```

5. Commit your changes (see [commit message guidelines](#commit-message-guidelines))
6. Push to your fork and submit a pull request

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐎 `:racehorse:` when improving performance
  - 🚱 `:non-potable_water:` when plugging memory leaks
  - 📝 `:memo:` when writing docs
  - 🐛 `:bug:` when fixing a bug
  - 🔥 `:fire:` when removing code or files
  - 💚 `:green_heart:` when fixing the CI build
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies

### TypeScript Styleguide

- Use TypeScript for all new code
- Enable strict mode
- All exported functions must have explicit return types
- Use `import type` for type-only imports
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for all public APIs

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Place opening braces on the same line
- Use async/await instead of promises when possible
- Prefer const over let, never use var
- Use template literals for string concatenation
- Use optional chaining and nullish coalescing

### Testing

- Write tests for all new functionality
- Ensure all tests pass before submitting PR
- Aim for high test coverage
- Use descriptive test names
- Group related tests using describe blocks

## Project Structure

```
ts-buildkit/
├── src/
│   ├── utils/       # Core utility functions
│   ├── enums/       # Enum definitions
│   ├── types/       # TypeScript type definitions
│   ├── configure/   # Configuration module
│   ├── packages/    # External utility packages
│   ├── play-and-win/# Gaming module
│   ├── roommate/    # Roommate module
│   └── require-package/ # Optional dependency wrappers
├── tests/           # Test files
├── dist/           # Build output (generated)
└── docs/           # Documentation
```

## Adding New Features

When adding a new utility function:

1. Add the function to the appropriate file in `/src/utils/`
2. Export it from `/src/utils/index.ts`
3. Add TypeScript types with explicit return type
4. Add comprehensive JSDoc comments
5. Write tests for the function
6. Update the API documentation
7. Add an example to the README if it's a major feature

## Questions?

Feel free to contact the project maintainer:

- **Ahsan Mahmood**
- Email: [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com)
- Website: [https://aoneahsan.com](https://aoneahsan.com)

## Recognition

Contributors who submit accepted pull requests will be recognized in the project's contributors list.

Thank you for your interest in contributing to ts-buildkit! 🎉
