# Support

## How to Get Help

If you need help with ts-buildkit, here are some ways to get support:

### 📚 Documentation

- **README**: Start with our [comprehensive README](README.md)
- **API Documentation**: Check our [detailed API documentation](API.md)
- **Examples**: Look at code examples in the documentation

### 🐛 Bug Reports

Found a bug? Please help us fix it!

1. Search [existing issues](https://github.com/aoneahsan/ts-buildkit/issues) to see if it's already reported
2. If not found, [create a new issue](https://github.com/aoneahsan/ts-buildkit/issues/new)
3. Include:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (Node.js version, OS, etc.)
   - Code samples if applicable

### 💡 Feature Requests

Have an idea for a new feature?

1. Check if it's already suggested in [issues](https://github.com/aoneahsan/ts-buildkit/issues)
2. If not, create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Example code showing how it would work

### 💬 Discussions

For general questions and discussions:

- Open a [GitHub Discussion](https://github.com/aoneahsan/ts-buildkit/discussions)
- Share your use cases
- Help other community members

### 📧 Direct Support

For urgent or private matters:

- **Email**: [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com)
- **Website**: [https://aoneahsan.com](https://aoneahsan.com)

### 💰 Commercial Support

Need professional support or custom features?

- Contact via email for consulting services
- [Support on Patreon](https://www.patreon.com/aoneahsan)

## Response Times

- **GitHub Issues**: Usually within 2-3 business days
- **Security Issues**: Within 24 hours (see [SECURITY.md](SECURITY.md))
- **Email**: Within 3-5 business days

## Before Asking for Help

Please try these steps first:

1. **Read the documentation** thoroughly
2. **Search existing issues** for similar problems
3. **Check the FAQ** section below
4. **Try debugging** with console logs or debugger
5. **Isolate the problem** in a minimal reproduction

## FAQ

### Q: How do I configure the crypto secret?

```typescript
import { configureZTK } from 'ts-buildkit';

configureZTK({
  cryptoSecret: process.env.CRYPTO_SECRET,
});
```

### Q: Why am I getting "cryptoSecret not configured" error?

You need to call `configureZTK()` before using any cryptographic functions.

### Q: Can I use this in the browser?

Yes! ts-buildkit works in both Node.js and browser environments.

### Q: How do I use optional peer dependencies?

Install them separately:

```bash
npm install crypto-js dayjs zod
```

Then import from the require-package path:

```typescript
import dayjs from 'ts-buildkit/require-package/dayjs';
```

### Q: Is TypeScript required?

No, but it's highly recommended. The library works with JavaScript too.

### Q: How do I report security vulnerabilities?

See our [Security Policy](SECURITY.md). Email security issues privately.

## Community

Join our community:

- Star the [GitHub repository](https://github.com/aoneahsan/ts-buildkit)
- Follow updates on [npm](https://www.npmjs.com/package/ts-buildkit)
- Share your projects using ts-buildkit

## Contributing

Want to help improve ts-buildkit? See our [Contributing Guide](CONTRIBUTING.md).

---

Made with ❤️ by Ahsan Mahmood
