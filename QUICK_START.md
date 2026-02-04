# LETHCON Quick Start Guide

## Issue: "Failed to fetch" Error During Login

This error occurs when the backend server is not running or not accessible.

## Solution

### Option 1: Automated Startup (Linux/Mac)

Use the provided startup script:

```bash
./start-dev.sh
```

This will:
- ✅ Check PostgreSQL connection
- ✅ Install dependencies
- ✅ Run database migrations
- ✅ Start backend server (port 5000)
- ✅ Start frontend server (port 3000)

To stop the servers:
```bash
./stop-dev.sh
```

### Option 2: Manual Startup

#### Step 1: Start PostgreSQL

**Using Docker:**
```bash
docker-compose up -d postgres
```

**Using System Service:**
```bash
# Linux
sudo systemctl start postgresql

# Mac
brew services start postgresql
```

#### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Setup database
npm run db:generate
npm run db:push

# Start server
npm run dev
```

Backend should now be running on: `http://localhost:5000`

#### Step 3: Setup Frontend (in a new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend should now be running on: `http://localhost:3000`

### Option 3: Using Docker Compose

```bash
# Start all services
docker-compose up

# Or run in background
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Verify Setup

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```
   
   Expected response:
   ```json
   {
     "status": "OK",
     "timestamp": "...",
     "environment": "development"
   }
   ```

2. **Frontend:**
   Open browser and navigate to: `http://localhost:3000`

3. **Test Login:**
   - Navigate to `http://localhost:3000/login`
   - The login page should load without errors
   - Try logging in (you may need to create an account first)

## Troubleshooting

### Port Already in Use

**Backend (port 5000):**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

**Frontend (port 3000):**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Connection Error

1. **Check PostgreSQL is running:**
   ```bash
   pg_isready
   ```

2. **Check database credentials in `backend/.env`:**
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/cybersecurity_training
   ```

3. **Create database if it doesn't exist:**
   ```bash
   psql -U postgres -c "CREATE DATABASE cybersecurity_training;"
   ```

### CORS Errors

Make sure the `CORS_ORIGIN` in `backend/.env` matches your frontend URL:
```env
CORS_ORIGIN=http://localhost:3000
```

### Environment Variables Not Loading

1. **Backend:** Make sure `backend/.env` exists
2. **Frontend:** Make sure `frontend/.env` exists with:
   ```env
   VITE_API_URL=/api/v1
   ```

## First Time Setup

If this is your first time running the application:

1. **Create Admin User:**
   ```bash
   cd backend
   npm run db:seed
   ```

2. **Default Credentials:**
   - Email: admin@lethcon.com
   - Password: admin123
   
   ⚠️ **Change these credentials immediately after first login!**

## Common Commands

```bash
# Install all dependencies (root)
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd frontend && npm install

# Run database migrations
cd backend && npm run db:migrate

# Run database seed
cd backend && npm run db:seed

# View database in Prisma Studio
cd backend && npm run db:studio

# Build for production
npm run build
```

## Next Steps

- Change default admin password
- Configure email settings for password reset
- Set up Docker containers for labs
- Review security settings in production

## Need Help?

- Check logs: `tail -f backend.log` or `tail -f frontend.log`
- Review documentation in `/docs` folder
- Check backend health: `http://localhost:5000/health`
