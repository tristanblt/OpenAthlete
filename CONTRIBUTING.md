# Contributing to OpenAthlete

Thank you for your interest in contributing to OpenAthlete! This document provides guidelines and instructions for contributing to our project. We're excited to have you join our community of developers, athletes, and enthusiasts.

## Table of Contents

- [Contributing to OpenAthlete](#contributing-to-openathlete)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Project Structure](#project-structure)
  - [Development Setup](#development-setup)
    - [Prerequisites](#prerequisites)
    - [Initial Setup](#initial-setup)
  - [Development Workflow](#development-workflow)
  - [Code Standards](#code-standards)
    - [TypeScript/JavaScript](#typescriptjavascript)
    - [React (Frontend)](#react-frontend)
    - [NestJS (Backend)](#nestjs-backend)
    - [Database](#database)
  - [Pull Request Process](#pull-request-process)
  - [Documentation](#documentation)
  - [Community](#community)
  - [Getting Help](#getting-help)
  - [License](#license)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. We expect all contributors to:

- Be respectful and considerate of others
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Project Structure

OpenAthlete is a monorepo using pnpm workspaces with the following structure:

```
openathlete/
├── apps/
│   ├── api/         # NestJS backend application
│   └── web/         # React frontend application
├── libs/
│   ├── shared/      # Shared utilities and types
│   ├── database/    # Database models and migrations
│   └── config/      # Shared configuration
```

## Development Setup

### Prerequisites

- Node.js v22.14.0 (use `.nvmrc` for version management)
- pnpm v9.x
- PostgreSQL
- Git

### Initial Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/tristanblt/openathlete.git
   cd openathlete
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   # Frontend
   cp apps/web/.env.example apps/web/.env
   
   # Backend
   cp apps/api/.env.example apps/api/.env
   ```

4. Build shared packages:
   ```bash
   pnpm shared build
   ```

5. Set up the database:
   ```bash
   pnpm database run db:deploy
   ```

6. Start the development servers:
   ```bash
   pnpm dev
   ```

## Development Workflow

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. Make your changes following our code standards

3. Run tests and checks:
   ```bash
   pnpm tsc:check  # Type checking
   pnpm lint       # Linting
   pnpm format     # Code formatting
   ```

4. Commit your changes following our commit message convention:
   ```
   type(scope): description

   [optional body]

   [optional footer]
   ```
   Types: feat, fix, docs, style, refactor, test, chore

5. Push your branch and create a Pull Request

## Code Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow strict type checking
- Use async/await for asynchronous operations
- Prefer functional programming patterns
- Use meaningful variable and function names

### React (Frontend)

- Use functional components with hooks
- Follow the component structure in existing code
- Use Tailwind CSS for styling
- Implement responsive design
- Follow accessibility guidelines

### NestJS (Backend)

- Follow NestJS best practices
- Use dependency injection
- Implement proper error handling
- Write comprehensive API documentation
- Use DTOs for data validation

### Database

- Use Prisma for database operations
- Write migrations for schema changes
- Follow naming conventions in existing models
- Include proper indexes and relationships

## Pull Request Process

1. Update the README.md or documentation if necessary
2. The PR will be reviewed by maintainers
3. Address any feedback or requested changes
4. Once approved, a maintainer will merge your PR

## Documentation

- Keep documentation up to date
- Use JSDoc comments for functions and components
- Add comments for complex logic
- Write clear commit messages

## Community

- Join our GitHub Discussions
- Help others in the community
- Share your ideas and feedback
- Participate in issue discussions
- Review other contributors' PRs

## Getting Help

- Check existing issues and discussions
- Join our community chat
- Ask questions in GitHub Discussions
- Contact maintainers for urgent issues

## License

By contributing to OpenAthlete, you agree that your contributions will be licensed under the project's MPL-2.0 License.

---

Thank you for contributing to OpenAthlete! Together, we're building the future of open-source training platforms.
