# Cybersecurity Training Platform

A comprehensive platform for cybersecurity education with hands-on labs, challenges, and learning paths.

## Project Structure

```
cybersecurity-training-platform/
├── frontend/                              # React + TypeScript + Tailwind
├── backend/                              # Node.js + Express + TypeScript
├── lab-templates/                         # Pre-built lab templates
├── docker-images/                         # Custom Docker image builds
├── docker-compose/                        # Multi-container setups
├── docker-host/                          # Docker host configuration
├── infrastructure/                       # Infrastructure as Code
├── scripts/                             # Deployment & maintenance
├── docs/                                # Documentation
├── tests/                               # Testing
├── .github/                             # CI/CD
├── .vscode/                             # Editor configuration
```

## Quick Start

1. Clone the repository
2. Copy environment files: `cp .env.example .env`
3. Run with Docker Compose: `docker-compose up -d`
4. Access the platform at `http://localhost:3000`

## Documentation

- [Setup Guide](docs/SETUP.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/api/API.md)
