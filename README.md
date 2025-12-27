# Cybersecurity Training Platform

A Docker-based cybersecurity training platform for beginners to advanced users.

## Features

- **Docker-based labs**: Isolated lab environments using Docker containers
- **Admin lab creation**: Create custom labs through admin panel
- **Learning paths**: Structured paths for beginners, intermediate, and advanced
- **CTF challenges**: Capture the Flag with flag submission
- **Real-time terminals**: Web-based terminal access to labs
- **Progress tracking**: Track user progress and achievements

## Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env` and configure
3. Run: `docker-compose up -d`
4. Access frontend at: http://localhost:3000
5. Access backend at: http://localhost:3001

## For Development

```bash
# Install dependencies
cd frontend && npm install
cd backend && npm install

# Run development servers
cd backend && npm run dev
cd frontend && npm run dev
```

## Admin Lab Creation

1. Login as admin
2. Navigate to Admin Panel → Lab Creation
3. Use the Lab Wizard to:
   - Select template or create from scratch
   - Edit Dockerfile
   - Define tasks and flags
   - Build and test the lab
   - Publish for users

## Project Structure

```
cybersecurity-platform/
├── frontend/           # React frontend
├── backend/            # Node.js backend
├── lab-templates/      # Pre-built lab templates
├── docker-images/      # Custom Docker images
├── docker-compose-labs/# Multi-container setups
├── docker-host/        # Docker host config
├── admin-tools/        # Admin management scripts
├── docs/              # Documentation
└── tests/             # Test files
```
