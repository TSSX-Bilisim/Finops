# Finops

This project is a simplified monorepo structure focusing on the web application for easier development and deployment.

## 🏗️ Project Structure

This repository includes the following application:

### Applications
- `web/`: React web application built with [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)

All packages and applications are written in 100% [TypeScript](https://www.typescriptlang.org/).

## 🛠️ Utilities and Tools

This project uses the following tools:

- **[TypeScript](https://www.typescriptlang.org/)**: Static type checking
- **[ESLint](https://eslint.org/)**: Code quality and standards
- **[Prettier](https://prettier.io)**: Code formatting
- **[NPM](https://www.npmjs.com/)**: Package manager

## 🚀 Getting Started

### Installing Dependencies

```bash

# Or install dependencies for the web application
cd web && npm install
```

### Environment Setup

Before starting the development environment, you need to set up your environment variables for each application:

```bash
# For web application
cd web
cp .env.example .env

# Edit the .env file with your specific configuration for the web application
# Each application has its own .env.example file with application-specific variables
```

**Important**: The `.env` files contain sensitive information and should never be committed to version control. Always use the respective `.env.example` files as templates for each application.

### Starting Development Environment

```bash
# Start the web application development server
cd web && npm run dev
```

**Note**: Parallel build and development scripts for multiple applications haven't been implemented yet. Each application needs to be started individually.

### Building

```bash
# Build the web application
cd web && npm run build
```

**Note**: Parallel build scripts for multiple applications haven't been implemented yet.

### Starting Production

```bash
# Start the web application production server after building
cd web && npm run start
```

## 📁 Application Structure

### Web Application (`web/`)
The web application is built with React and Vite, featuring:
- Modern React with TypeScript
- Vite for fast development and building
- Component-based architecture
- Internationalization (i18n) support
- Responsive design with Tailwind CSS
- Application-specific environment configuration

## 🔄 Development Workflow

This project follows a structured Git workflow for development. Here's the step-by-step process:

### 1. Create Feature Branch

```bash
# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Example: git checkout -b feature/user-authentication
```

### 2. Development Process

```bash
# Make your changes
# Add files
# Test your changes locally

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add user authentication system

- Add login and register components
- Implement JWT token handling
- Add protected route wrapper
- Update navigation for authenticated users"
```

### 3. Push Feature Branch

```bash
# Push branch to remote
git push origin feature/your-feature-name
```

### 4. Create Pull Request

When you push a feature branch, GitHub will provide a link to create a Pull Request:

```
Create a pull request for 'feature/your-feature-name' on GitHub by visiting:
https://github.com/ilcann/infrawatch/pull/new/feature/your-feature-name
```

**Pull Request Template:**
- **Title**: Use conventional commits format (`feat:`, `fix:`, `docs:`, etc.)
- **Description**: Include detailed explanation of changes
- **Add GitHub Copilot as Reviewer**: Always add `@github-copilot` as a reviewer for automated code review

### 5. Review Process

1. **Automated Review**: GitHub Copilot will automatically review your code
2. **Team Review**: Wait for human reviewers to approve
3. **Address Feedback**: Make necessary changes based on review comments
4. **Update PR**: Push additional commits if needed

### 6. Merge Pull Request

After approval, merge the Pull Request:

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Merge feature branch (if merging locally)
git merge feature/your-feature-name

# Push merged changes
git push origin main

# Clean up: Delete local feature branch
git branch -d feature/your-feature-name

# Clean up: Delete remote feature branch
git push origin --delete feature/your-feature-name
```

### 📋 Pull Request Checklist

Before creating a Pull Request, ensure:

- [ ] Code follows project conventions
- [ ] All tests pass locally
- [ ] Documentation is updated if needed
- [ ] Commit messages follow conventional format
- [ ] GitHub Copilot is added as reviewer
- [ ] PR description clearly explains the changes
- [ ] No sensitive data is committed

### 🤖 GitHub Copilot Integration

This project uses GitHub Copilot for automated code reviews:

1. **Automatic Assignment**: Copilot is automatically assigned as a reviewer
2. **Code Analysis**: Provides suggestions for code improvements
3. **Security Scanning**: Identifies potential security issues
4. **Best Practices**: Ensures code follows established patterns

To enable Copilot reviews:
- Add `@github-copilot` as a reviewer in every Pull Request
- Address Copilot's suggestions before requesting human review
- Use Copilot's feedback to improve code quality

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [NPM Documentation](https://docs.npmjs.com/)
