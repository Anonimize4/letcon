# Cybersecurity Training Platform - Setup Guide

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- npm 9+ or yarn
- Git
- OpenSSL (for SSL certificate generation)

## Quick Start

### Option 1: Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cybersecurity-training-platform
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Setup SSL certificates (Development only)**
   ```bash
   ./scripts/docker/setup-ssl.sh
   ```

4. **Start the platform**
   ```bash
   # For development
   ./scripts/docker/docker-up.sh development
   
   # For production
   ./scripts/docker/docker-up.sh production
   ```

### Option 2: Manual Docker Compose

1. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

2. **Start with Docker Compose**
   ```bash
   # Development
   docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
   
   # Production
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

3. **Access the platform**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432
   - Nginx Proxy: http://localhost (port 80) / https://localhost (port 443)

## Docker Management Scripts

### Start Services
```bash
./scripts/docker/docker-up.sh [environment] [--logs]
```

### Stop Services
```bash
./scripts/docker/docker-down.sh [environment] [--clean]
```

### Check Status
```bash
./scripts/docker/docker-status.sh
```

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

See `.env.example` for all available configuration options. Key variables:

- `NODE_ENV`: application environment (development/production)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing secret (change in production)
- `POSTGRES_*`: Database configuration

## Docker Services

- **Frontend**: React application with Vite (Port 3000)
- **Backend**: Node.js/Express API server (Port 5000)
- **Database**: PostgreSQL database (Port 5432)
- **Nginx**: Reverse proxy and load balancer (Ports 80/443)

## Health Checks

All services include health checks that monitor:
- **Frontend**: HTTP response on port 3000
- **Backend**: Health endpoint at /health
- **Database**: PostgreSQL readiness check
- **Nginx**: Health endpoint at /health

## SSL Configuration

### Development
Self-signed certificates are generated automatically by `setup-ssl.sh`

### Production
Use proper SSL certificates from a trusted CA:
1. Place certificates in `infrastructure/nginx/ssl/`
2. Update `docker-compose.prod.yml` with certificate paths
3. Configure environment variables for production domains

## Troubleshooting

### Common Issues

1. **Port conflicts**: Check if ports 3000, 5000, 5432, 80, 443 are available
2. **Database connection**: Verify PostgreSQL is healthy with `docker-compose ps`
3. **Docker permissions**: Ensure user is in docker group
4. **Environment variables**: Verify all required vars are set in `.env`
5. **Service dependencies**: Check health checks with `docker-compose ps`

### Logs and Monitoring

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f [service-name]

# Check service status
./scripts/docker/docker-status.sh

# View resource usage
docker stats
```

### Health Check Commands

```bash
# Check individual service health
docker-compose ps

# Test backend health
curl http://localhost:5000/health

# Test frontend
curl http://localhost:3000

# Test nginx
curl http://localhost/health

# Check database readiness
docker-compose exec postgres pg_isready -U postgres
```

### Resource Management

```bash
# Clean up unused Docker resources
./scripts/docker/docker-down.sh development --clean

# Manual cleanup
docker system prune -f
docker volume prune -f
```

## Production Deployment

### Environment Preparation
1. Set up production environment variables
2. Configure SSL certificates
3. Set up monitoring and logging
4. Configure backup procedures

### Security Considerations
- Change default passwords and secrets
- Use proper SSL certificates
- Configure firewall rules
- Set up proper monitoring
- Enable audit logging

### Performance Optimization
- Configure resource limits
- Enable caching strategies
- Set up load balancing
- Monitor performance metrics

For detailed production deployment instructions, see `DEPLOYMENT.md`.
