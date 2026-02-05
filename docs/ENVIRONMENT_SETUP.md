# Environment Configuration Setup

This document explains how to set up and manage environment variables for the LETHCON cybersecurity training platform.

## Overview

The project uses a structured approach to environment configuration with separate files for different environments and purposes. All real secrets are kept out of version control, and only example values are committed.

## File Structure

### Project Root Environment Files

- `.env.example` - Main example configuration with all possible variables
- `.env.development` - Development-specific example configuration
- `.env.production` - Production-specific example configuration
- `.env` - **Local file (not committed)** - Your actual local development values

### Backend Environment Files

- `backend/.env.example` - Backend-specific example configuration
- `backend/.env` - **Local file (not committed)** - Backend local development values
- `backend/.env.production` - Production backend example configuration

### Frontend Environment Files

- `frontend/.env.example` - Frontend-specific example configuration
- `frontend/.env.local` - **Local file (not committed)** - Frontend local development values

## Loading Order

Environment variables are loaded in the following order of precedence (later files override earlier ones):

1. `.env.local` (for local overrides)
2. `.env.${NODE_ENV}` (environment-specific)
3. `.env` (default)
4. Backend-specific files are checked after project root files

## Setup Instructions

### 1. Local Development Setup

1. Copy the main example file:
   ```bash
   cp .env.example .env
   ```

2. Copy the backend example file:
   ```bash
   cp backend/.env.example backend/.env
   ```

3. Update the copied files with your actual values:
   - Supabase URL and keys
   - Database connection strings
   - JWT secrets
   - Email configuration
   - Other service credentials

### 2. Environment-Specific Setup

For different environments, you can create environment-specific files:

```bash
# For development
cp .env.development .env

# For production (use CI/hosting environment variables instead)
# Do not commit real secrets to .env.production
```

### 3. Production Deployment

**Important**: Never commit real secrets to version control. Use one of these approaches:

1. **CI/CD Environment Variables**: Set secrets in your CI/CD platform (GitHub Actions, GitLab CI, etc.)
2. **Hosting Provider Environment Variables**: Set secrets in your hosting platform (Render, Vercel, AWS, etc.)
3. **Secrets Management**: Use a secrets management service (AWS Secrets Manager, HashiCorp Vault, etc.)

The `.env.production` files should only contain example values and serve as documentation.

## Key Environment Variables

### Application Settings

- `NODE_ENV` - Environment (development, production, test)
- `PORT` - Backend API port
- `FRONTEND_PORT` - Frontend development port

### Database Configuration

- `DATABASE_URL` - Primary database connection string
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` - PostgreSQL credentials

### Supabase Configuration

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Public key (safe for client-side)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (keep secret)

### Security Settings

- `JWT_SECRET` - JWT signing secret (use strong random values)
- `SESSION_SECRET` - Session encryption secret
- `BCRYPT_ROUNDS` - Password hashing rounds (12+ for production)

### External Services

- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` - Payment processing
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` - Email configuration
- `SENTRY_DSN` - Error tracking

## Security Best Practices

1. **Never commit real secrets** to version control
2. **Use strong, random secrets** for production
3. **Rotate secrets regularly** in production
4. **Use different secrets** for different environments
5. **Limit access** to production secrets
6. **Audit secrets usage** and access logs

## Environment-Specific Considerations

### Development

- Use debug logging level
- Enable hot reloading and development tools
- Use local or test databases
- Use test email services (Mailtrap, etc.)
- Shorter token expiration times

### Production

- Use warn/error logging level
- Enable all security features
- Use connection pooling for databases
- Use production email services
- Longer token expiration times
- Enable monitoring and metrics

## Troubleshooting

### Environment Variables Not Loading

1. Check that files exist in the correct locations
2. Verify file permissions
3. Check the console output for loading messages
4. Ensure no syntax errors in .env files

### Database Connection Issues

1. Verify DATABASE_URL format
2. Check network connectivity
3. Validate credentials
4. Ensure database is running

### Supabase Authentication Issues

1. Verify Supabase URL and keys
2. Check key permissions (anon vs service role)
3. Ensure CORS is configured correctly
4. Verify RLS policies

## CI/CD Integration

### GitHub Actions Example

```yaml
env:
  NODE_ENV: production
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
  SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

### Render Example

Set environment variables in the Render dashboard:
1. Go to your service settings
2. Add environment variables
3. Restart the service

## Validation

The application validates required environment variables on startup. Missing required variables will cause the application to fail with clear error messages.

## Additional Resources

- [dotenv documentation](https://github.com/motdotla/dotenv)
- [Supabase environment setup](https://supabase.com/docs/guides/environment-variables)
- [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices)
