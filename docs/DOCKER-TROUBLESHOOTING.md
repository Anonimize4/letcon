# Docker Troubleshooting Guide

## Quick Diagnostics

### Check Docker Status
```bash
./scripts/docker/docker-status.sh
```

### Common Commands
```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f [service-name]

# Check resource usage
docker stats
```

## Common Issues and Solutions

### 1. Port Conflicts

**Symptoms:**
- Error: "port is already allocated"
- Services fail to start

**Solutions:**
```bash
# Check what's using the port
netstat -tulpn | grep [port]

# Kill process using the port (replace [port])
sudo kill -9 $(sudo lsof -t -i:[port])

# Or change ports in docker-compose.yml
# Edit the ports section for the conflicting service
```

### 2. Database Connection Issues

**Symptoms:**
- Backend fails to connect to database
- "Connection refused" errors

**Solutions:**
```bash
# Check if PostgreSQL container is running
docker-compose ps postgres

# Check PostgreSQL logs
docker-compose logs postgres

# Test database connection
docker-compose exec postgres pg_isready -U postgres

# Restart PostgreSQL service
docker-compose restart postgres
```

### 3. Frontend/Backend Communication Issues

**Symptoms:**
- Frontend can't reach backend API
- CORS errors in browser

**Solutions:**
```bash
# Check network connectivity
docker-compose exec frontend ping backend

# Check backend health
curl http://localhost:5000/health

# Check environment variables
docker-compose exec frontend env | grep REACT_APP

# Restart services
docker-compose restart frontend backend
```

### 4. Docker Permission Issues

**Symptoms:**
- "permission denied" errors
- Cannot access Docker daemon

**Solutions:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in, or run:
newgrp docker

# Check Docker permissions
docker ps
```

### 5. Volume Mount Issues

**Symptoms:**
- Files not updating in containers
- Permission denied on mounted volumes

**Solutions:**
```bash
# Check volume mounts
docker-compose exec [service] ls -la [mount-path]

# Fix permissions (for development)
sudo chown -R $USER:$USER [local-path]

# Recreate containers to refresh mounts
docker-compose down
docker-compose up -d
```

### 6. SSL Certificate Issues

**Symptoms:**
- HTTPS connections fail
- "Certificate verification failed" errors

**Solutions:**
```bash
# Regenerate certificates
./scripts/docker/setup-ssl.sh

# Check certificate files
ls -la infrastructure/nginx/ssl/

# Restart nginx
docker-compose restart nginx
```

### 7. Memory/Resource Issues

**Symptoms:**
- Containers being killed
- "Out of memory" errors

**Solutions:**
```bash
# Check system resources
free -h
df -h

# Check container resource usage
docker stats --no-stream

# Adjust memory limits in docker-compose.yml
# Or increase system resources
```

### 8. Build Issues

**Symptoms:**
- Build failures
- "No space left on device"

**Solutions:**
```bash
# Clean up Docker resources
docker system prune -a

# Build without cache
docker-compose build --no-cache

# Check disk space
df -h
```

## Service-Specific Troubleshooting

### Frontend Issues

**Frontend not loading:**
```bash
# Check frontend logs
docker-compose logs frontend

# Test frontend directly
curl http://localhost:3000

# Check if build completed
docker-compose exec frontend ls -la /usr/share/nginx/html
```

**Hot reload not working:**
```bash
# Verify volume mounts
docker-compose config | grep -A 10 frontend

# Check file permissions
docker-compose exec frontend ls -la /app
```

### Backend Issues

**API endpoints not responding:**
```bash
# Check backend logs
docker-compose logs backend

# Test health endpoint
curl http://localhost:5000/health

# Check database connection
docker-compose exec backend npm run db:ping
```

**Build failures:**
```bash
# Clear node_modules
docker-compose exec backend rm -rf node_modules
docker-compose exec backend npm install

# Check TypeScript errors
docker-compose exec backend npm run type-check
```

### Database Issues

**Database not starting:**
```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Verify data directory permissions
ls -la postgres_data/

# Reset database (WARNING: This deletes all data)
docker-compose down -v
docker-compose up -d
```

### Nginx Issues

**Reverse proxy not working:**
```bash
# Check nginx configuration
docker-compose exec nginx nginx -t

# Reload nginx configuration
docker-compose exec nginx nginx -s reload

# Check nginx logs
docker-compose logs nginx
```

## Performance Optimization

### Resource Limits
Adjust resource limits in `docker-compose.prod.yml`:
```yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
```

### Database Optimization
```sql
-- Connect to database and run:
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
SELECT pg_reload_conf();
```

### Frontend Optimization
- Enable gzip compression in nginx
- Use production build for production
- Implement proper caching headers

## Monitoring and Alerting

### Health Check Monitoring
```bash
# Monitor service health
watch -n 5 'docker-compose ps'

# Set up health check alerts
./scripts/docker/docker-status.sh | grep -i unhealthy
```

### Log Monitoring
```bash
# Follow logs for specific service
docker-compose logs -f --tail=100 [service]

# Export logs to file
docker-compose logs [service] > service.log
```

## Recovery Procedures

### Complete Reset
```bash
# Stop all services
./scripts/docker/docker-down.sh development --clean

# Remove all containers and volumes
docker system prune -a --volumes

# Rebuild from scratch
./scripts/docker/docker-up.sh development
```

### Backup Data
```bash
# Backup database
docker-compose exec postgres pg_dump -U postgres cybersecurity_training > backup.sql

# Backup uploaded files
tar -czf uploads-backup.tar.gz uploads/
```

### Restore Data
```bash
# Restore database
docker-compose exec -T postgres psql -U postgres cybersecurity_training < backup.sql

# Restore uploaded files
tar -xzf uploads-backup.tar.gz
```

## Getting Help

### Information to Collect
When reporting issues, include:
1. Docker and docker-compose versions
2. Operating system details
3. Error messages and logs
4. Steps to reproduce
5. Environment configuration

### Log Collection
```bash
# Collect all relevant logs
mkdir docker-logs-$(date +%Y%m%d-%H%M%S)
cd docker-logs-*

# Save system information
docker version > system-info.txt
docker-compose version >> system-info.txt
docker system df >> system-info.txt

# Save service status
docker-compose ps > service-status.txt

# Save recent logs
docker-compose logs --tail=1000 > all-logs.txt

# Save nginx configuration
docker-compose exec nginx nginx -T > nginx-config.txt
```

### Useful Commands Reference
```bash
# System information
docker version
docker system info
docker system df

# Container management
docker ps -a
docker stats
docker top [container]

# Image management
docker images
docker system prune -f

# Volume management
docker volume ls
docker volume prune -f

# Network management
docker network ls
docker network inspect [network]
