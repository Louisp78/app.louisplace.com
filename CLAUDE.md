# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**louisplace** is a personal full-stack web application for app.louisplace.com with:
- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS, Monaco Editor
- **Backend**: Spring Boot 4.0 (Java 17) with Spring Security, PostgreSQL
- **Orchestration**: Docker Compose (client, backend, PostgreSQL, Apache reverse proxy)

The application is deployed via GitHub Actions workflows and Docker Compose.

## Architecture

### Frontend (Client)

**Location**: `/client`

**Structure**:
```
src/
  app/              # Next.js app router (pages, layouts)
  components/       # Shared UI components (app-bar, etc.)
  plugins/          # Feature modules (auth, code-piece, post, user, storage)
    */
      components/   # Feature-specific components
      hooks/        # Feature-specific hooks
      index.ts      # Barrel export (required pattern)
  constants/        # Constants and text
  environment/      # Environment config
  utils/            # Utility functions
  tests/            # Unit tests
```

**Key Patterns**:
- **Plugins as feature modules**: Each feature (auth, code-piece, post, user) is a plugin with its own barrel export
- **ESLint enforcement**: Imports must come from plugin barrel exports (`@/plugins/*/index`), not internal paths
- **API client generation**: TypeScript API types are auto-generated from Spring Boot OpenAPI spec (`src/plugins/api-repository-generated/`)
- **Package manager**: Uses `pnpm` (see workflow files for version 10)

### Backend

**Location**: `/backend`

**Structure**:
```
src/main/java/com/louisplace/backend/
  features/         # Feature modules (auth, code_piece, user)
    code_piece/     # Example: Controller, Service, Entity, DTOs, Repository
    auth/
    user/
  config/           # Spring configuration (Security, WebClient)
  LouisPlaceBackendApplication.java  # Main entry point
```

**Key Architecture**:
- **Feature-based organization**: Each feature has Controller, Service, Entity, DTOs, and Repository interface
- **Spring Security**: Configured for OAuth2/authentication
- **OpenAPI/Swagger**: Exposed at `/v3/api-docs` for client code generation
- **PostgreSQL database**: Configured via environment variables

## Development Commands

### Frontend (Client)

```bash
cd client

# Development
pnpm install          # Install dependencies
pnpm dev              # Run dev server (http://localhost:3000) with Turbopack
pnpm build            # Build for production
pnpm start            # Run production build

# Quality checks
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix lint issues
pnpm prettier:check   # Check formatting
pnpm prettier:fix     # Format code
pnpm format           # Run lint:fix (shorthand)
pnpm lint_format:check # Check both lint AND format (used in CI)
pnpm test             # Run Jest tests
pnpm test --watch     # Run tests in watch mode

# API
pnpm api-generate     # Generate TypeScript API client from OpenAPI spec
# Requires: NEXT_PUBLIC_BACKEND_URL, API_GENERATED_OUTPUT_DIR env vars
pnpm api-patch        # Patch generated OpenAPI runtime (after generation)
```

**Frontend Tests**:
- Test runner: Jest with ts-jest preset
- Test environment: jsdom (for React components)
- Config: `jest.config.ts`
- Coverage collection enabled automatically

### Backend

```bash
cd backend

# Build and test
./mvnw clean package                    # Build JAR and run tests
./mvnw test                             # Run unit tests
./mvnw test -Dtest=CodePieceServiceTest # Run single test class
./mvnw clean                            # Clean build artifacts

# Development
./mvnw spring-boot:run                  # Run app locally
```

**Backend Tests**:
- Test framework: Spring Boot Test with MockMvc
- Config: Uses Spring test starters for web, WebClient, WebFlux testing

### Docker & Deployment

```bash
# From repository root

# Development with all services (using Docker Compose)
docker compose up --build              # Build and run all services
docker compose up -d --build           # Run in background

# Production deploy (uses deploy.sh)
./deploy.sh                            # Pulls latest main, builds with Docker Compose

# Environment setup (first time)
cp ./client/.env.example ./client/.env
cp ./backend/.env.example ./backend/.env
cp .env.db.example .env.db
cp .env.oauth.example .env.oauth
```

## Important Conventions

### Frontend Code Patterns

1. **Plugin Imports**: Always import from barrel files
   ```typescript
   // ✓ Correct
   import { CodePieceCard } from '@/plugins/code-piece'

   // ✗ Wrong (ESLint enforces this)
   import { CodePieceCard } from '@/plugins/code-piece/components/code-piece-card'
   ```

2. **API Client**: Auto-generated types are in `src/plugins/api-repository-generated/`
   - Generate with: `pnpm api-generate`
   - Don't manually edit, regenerate when backend API changes

3. **Component Organization**: UI components go in `src/components/`, feature-specific ones in `src/plugins/*/components/`

### Backend Code Patterns

1. **Feature Structure**: Each feature module includes:
   - Controller: HTTP endpoints
   - Service/IService: Business logic interface + implementation
   - Entity: JPA entity (data model)
   - DTOs: Data transfer objects (Create, Update, response)
   - IRepository: JPA repository interface

2. **OpenAPI Docs**: Always available at `http://localhost:8080/v3/api-docs` (when running)

### Environment Variables

**Backend** (`.env.oauth`, `.env.db`):
- Database credentials
- OAuth2 configuration

**Client** (`.env`):
- `NEXT_PUBLIC_BACKEND_URL`: Points to backend API (used for code generation)

## Database

- **Type**: PostgreSQL
- **Setup**: Runs in Docker Compose container
- **Configuration**: Via `.env.db` environment file

## CI/CD Pipelines

**lint.yml**: Runs on PRs to main
- Installs Node 20, pnpm 10
- Runs: `pnpm install` → `pnpm run lint_format:check` → `pnpm test`

**build_and_deploy.yml**: Runs after PR merge to main (if title contains `[BUILD]`)
- Builds Docker images
- Deploys via SSH to production

## Local Development Workflow

1. **First time setup**:
   ```bash
   cp ./client/.env.example ./client/.env
   cp ./backend/.env.example ./backend/.env
   cp .env.db.example .env.db
   cp .env.oauth.example .env.oauth
   ```

2. **Option A - Frontend only** (recommended for UI work):
   ```bash
   cd client
   pnpm install
   pnpm dev  # Runs on http://localhost:3000
   ```

3. **Option B - Full stack** (with Docker):
   ```bash
   docker compose up --build
   # Frontend: http://localhost:3000
   # Backend API: http://localhost:8080
   # Swagger UI: http://localhost:8080/swagger-ui.html
   ```

4. **Generate API client** after backend changes:
   ```bash
   cd client
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080 \
   API_GENERATED_OUTPUT_DIR=src/plugins/api-repository-generated \
   pnpm api-generate
   ```
