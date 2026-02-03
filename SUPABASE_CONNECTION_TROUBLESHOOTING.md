# Supabase Connection Troubleshooting Guide

## 🔍 Error Analysis

```
Error: P1001: Can't reach database server at `db.abcdefghijk.supabase.co:5432`
```

This error means your machine cannot establish a connection to your Supabase database.

## 🎯 Most Common Causes & Solutions

### 1. **IP Address Not Whitelisted** (Most Common!)

**Problem**: Supabase requires your IP address to be whitelisted.

**Solution**:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Database**
4. Look for "IP Whitelist" or "Allowed IPs"
5. Add your current IP address:
   - **For development**: Add `0.0.0.0/0` (allows all IPs - not for production!)
   - **For production**: Add your server's static IP
6. Save changes and wait ~30 seconds for it to propagate

**Find your IP**:
```bash
# Method 1: Check your public IP
curl ifconfig.me

# Method 2: Check local IP
hostname -I
```

### 2. **Incorrect Connection String Format**

**Problem**: Wrong DATABASE_URL format or password contains special characters.

**Solution**:
1. Go to Supabase Dashboard → **Settings** → **Database**
2. Copy the connection string directly (don't type manually)
3. Ensure the password is URL-encoded if it contains special characters

**Example of problematic characters**:
- `@` should be encoded as `%40`
- `#` should be encoded as `%23`
- `!` should be encoded as `%21`

**Correct format**:
```
postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres
```

### 3. **SSL/TLS Connection Required**

**Problem**: Supabase requires SSL connections.

**Solution**: Add `?sslmode=require` to your connection string:

```
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres?sslmode=require
```

### 4. **Network/Firewall Issues**

**Problem**: Corporate firewall or network restrictions blocking port 5432.

**Solution**:
```bash
# Test if the port is reachable
telnet db.your-project.supabase.co 5432

# Or use nc (netcat)
nc -zv db.your-project.supabase.co 5432

# Or test with a simple connection
psql "postgresql://postgres:password@db.your-project.supabase.co:5432/postgres?sslmode=require"
```

**If blocked**, try:
- Using a VPN
- Working from a different network
- Configuring firewall rules

### 5. **Supabase Project Status**

**Problem**: Project might be paused or experiencing issues.

**Solution**:
1. Check Supabase Dashboard for project status
2. Ensure project is "Active" (not paused)
3. Check [Supabase Status Page](https://status.supabase.com/)

## 🔧 Step-by-Step Fix Process

### Step 1: Verify Your IP is Allowed

1. Log into Supabase Dashboard
2. Go to **Settings** → **Database**
3. Check "IP Whitelist" section
4. Add your IP address
5. Wait 1-2 minutes for changes to apply

### Step 2: Update Your Connection String

Edit `backend/.env`:
```env
# Make sure it ends with ?sslmode=require
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres?sslmode=require
```

### Step 3: Test Connection

```bash
cd backend

# Reload environment variables
source .env  # or just use the npm script

# Test with prisma
npx prisma db push
```

### Step 4: If Still Failing, Test Manually

```bash
# Install PostgreSQL client temporarily
npm install -g pg

# Test direct connection
psql "postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres?sslmode=require"

# If pg is not installed, try:
docker run --rm postgres:15 psql "postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres?sslmode=require" -c "SELECT 1"
```

## 🆘 Advanced Troubleshooting

### Check DNS Resolution
```bash
# Verify the domain resolves correctly
nslookup db.your-project.supabase.co

# Or
dig db.your-project.supabase.co
```

### Test with Different Tools
```bash
# Using openssl (checks SSL connection)
openssl s_client -connect db.your-project.supabase.co:5432 -starttls postgres

# Using curl (basic connectivity)
curl -v telnet://db.your-project.supabase.co:5432
```

### Check Supabase Project Configuration
1. Go to Supabase Dashboard
2. **Settings** → **API**
3. Verify project is active
4. Check for any alerts or warnings

## 📋 Pre-Flight Checklist

Before running `npm run db:push`, verify:

- [ ] IP address whitelisted in Supabase
- [ ] DATABASE_URL has `?sslmode=require`
- [ ] Password is correct and URL-encoded
- [ ] Project status is "Active" in Supabase Dashboard
- [ ] No firewall blocking port 5432
- [ ] DNS resolves correctly (`db.your-project.supabase.co`)

## 🎯 Quick Fix Commands

Run these in order:

```bash
# 1. Update connection string with SSL
cd backend
# Edit .env and add ?sslmode=require to DATABASE_URL

# 2. Verify environment is loaded
cat .env | grep DATABASE_URL

# 3. Generate Prisma client
npx prisma generate

# 4. Try push again
npx prisma db push
```

## 📞 Still Having Issues?

If you've tried all the above and still can't connect:

1. **Check Supabase Status**: Visit https://status.supabase.com/
2. **Try from a different network**: Test from home/mobile hotspot
3. **Contact Supabase Support**: Through your dashboard
4. **Check project limits**: Free tier has connection limits

## 🔒 Security Best Practices

Once connected, secure your setup:

1. **Restrict IP whitelist** to your production IPs
2. **Enable Row Level Security (RLS)** in Supabase
3. **Use environment variables** for all secrets
4. **Regularly rotate API keys**
5. **Set up database backups** in Supabase dashboard
