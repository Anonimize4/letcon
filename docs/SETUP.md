# Cybersecurity Training Platform - Setup Guide

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- npm 9+ or yarn
- Git

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cybersecurity-training-platform
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the platform**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432
   - Redis: localhost:6379

## Development Setup

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Database Setup
```bash
cd backend
npm run db:generate
npm run db:push
npm run db:seed
```

## Environment Variables

See `.env.example` for all available configuration options.

## Docker Services

- **Frontend**: React application with Vite
- **Backend**: Node.js/Express API server
- **Database**: PostgreSQL database
- **Redis**: Caching and session storage
- **Nginx**: Reverse proxy and load balancer

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `docker-compose.yml`
2. **Database connection**: Check PostgreSQL is running
3. **Docker permissions**: Ensure user is in docker group
4. **Environment variables**: Verify all required vars are set

### Logs
```bash
docker-compose logs -f [service-name]
```

## Production Deployment

See `DEPLOYMENT.md` for detailed production deployment instructions.
