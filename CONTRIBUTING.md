# Contributing to Multiverse MVP

Thank you for your interest in contributing to the Multiverse MVP! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find that the bug is already known. Please don't duplicate existing bug reports.

When creating a bug report, please include:

- **Description**: A clear and concise description of what the bug is
- **Steps to reproduce**: Steps to reproduce the behavior
- **Expected behavior**: What you expected to happen
- **Screenshots**: If applicable, add screenshots
- **Environment**: OS, browser, and version information
- **Additional context**: Any other relevant information

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Description**: A clear and concise description of the enhancement
- **Motivation**: Why this enhancement would be useful
- **Alternatives**: Any alternative solutions or features you've considered
- **Additional context**: Any other relevant information

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the coding standards
3. **Add tests** if applicable
4. **Update documentation** if needed
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and submit a pull request

## 📋 Development Setup

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/multiversecoin/multiverse-mvp.git
cd multiverse-mvp

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode in `tsconfig.json`
- Avoid `any` types when possible
- Use interfaces for object shapes

### React

- Use functional components with hooks
- Follow React best practices
- Use TypeScript for component props
- Keep components small and focused

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first approach
- Ensure responsive design
- Use the existing color palette

### Security

- Never trust user input
- Always sanitize and validate
- Follow the security guidelines in `SECURITY.md`
- Use the security utilities in `src/lib/security.ts`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- filename.test.ts

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests

- Write tests for new features
- Ensure tests cover edge cases
- Keep tests fast and reliable
- Use descriptive test names

## 📝 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add merchant search functionality
fix: resolve transaction validation bug
docs: update security documentation
```

## 🚀 Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a git tag
4. Push to GitHub
5. Create GitHub release

## 📖 Documentation

- Keep documentation up to date
- Use clear and concise language
- Include examples when helpful
- Update the README for user-facing changes

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## 📧 Getting Help

- Open an issue for bugs or questions
- Check existing documentation
- Reach out to maintainers

## 🙏 Acknowledgments

Thank you for contributing to Multiverse MVP!

---

For more information, please contact the maintainers or open an issue.
