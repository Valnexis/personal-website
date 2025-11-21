# Deployment Guide

This guide covers deploying the Personal Website with Admin Panel to production environments.

## Pre-Deployment Checklist

Before deploying to production, ensure you have completed all items in this checklist:

### Security
- [ ] Changed `JWT_SECRET` to a strong, random string (at least 32 characters)
- [ ] Set up HTTPS/SSL certificates
- [ ] Configured proper CORS policies
- [ ] Enabled rate limiting on API routes
- [ ] Set up MongoDB authentication
- [ ] Enabled MongoDB encryption at rest
- [ ] Reviewed and removed any debug/console logs
- [ ] Disabled source maps in production (if sensitive)
- [ ] Implemented proper error handling without information leakage
- [ ] Set up monitoring and logging

### Database
- [ ] MongoDB instance is running and accessible
- [ ] Database backup strategy is in place
- [ ] Connection string uses secure credentials
- [ ] Database indexes are created for performance
- [ ] Test data has been removed (if any)

### Code Quality
- [ ] All tests pass (`npm run build`)
- [ ] No ESLint errors
- [ ] Dependencies are up to date and secure
- [ ] Removed unused dependencies
- [ ] Code has been reviewed

### Documentation
- [ ] README is up to date
- [ ] API documentation is complete
- [ ] Environment variables are documented
- [ ] Deployment process is documented

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Configure Environment Variables:**
   - Go to your project settings on Vercel dashboard
   - Add environment variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `NEXT_PUBLIC_API_URL`

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

#### MongoDB Setup for Vercel:
- Use MongoDB Atlas (cloud-hosted)
- Get connection string from Atlas
- Add to Vercel environment variables
- Ensure IP whitelist includes Vercel's IPs (or allow all)

### Option 2: AWS Elastic Beanstalk

#### Steps:

1. **Install EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB:**
   ```bash
   eb init
   ```

3. **Create Environment:**
   ```bash
   eb create production
   ```

4. **Set Environment Variables:**
   ```bash
   eb setenv MONGODB_URI="your-mongodb-uri" JWT_SECRET="your-secret"
   ```

5. **Deploy:**
   ```bash
   eb deploy
   ```

### Option 3: Docker Deployment

#### Create Dockerfile:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Update next.config.ts:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

#### Docker Compose (with MongoDB):

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/personal-website
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USER}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
    restart: unless-stopped

volumes:
  mongo-data:
```

#### Deploy with Docker:

```bash
# Build image
docker build -t personal-website .

# Run with docker-compose
docker-compose up -d
```

### Option 4: Traditional VPS (Ubuntu/Debian)

#### Prerequisites:
- Ubuntu 20.04+ or Debian 11+ server
- Node.js 18+ installed
- MongoDB installed or MongoDB Atlas connection
- Nginx installed
- PM2 for process management

#### Steps:

1. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

3. **Clone Repository:**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/personal-website.git
   cd personal-website
   ```

4. **Install Dependencies:**
   ```bash
   npm install
   ```

5. **Create Environment File:**
   ```bash
   cat > .env.local << EOF
   MONGODB_URI=mongodb://localhost:27017/personal-website
   JWT_SECRET=your-super-secure-secret-key
   NEXT_PUBLIC_API_URL=https://yourdomain.com
   EOF
   ```

6. **Build Application:**
   ```bash
   npm run build
   ```

7. **Start with PM2:**
   ```bash
   pm2 start npm --name "personal-website" -- start
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx:**

   Create `/etc/nginx/sites-available/personal-website`:

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/personal-website /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## MongoDB Setup

### Option A: MongoDB Atlas (Recommended for Production)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose your tier (Free tier available)
   - Select a region close to your deployment

3. **Configure Access:**
   - Database Access: Create a user with password
   - Network Access: Add your application's IP or allow all (0.0.0.0/0)

4. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

5. **Update Environment Variable:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/personal-website?retryWrites=true&w=majority
   ```

### Option B: Self-Hosted MongoDB

1. **Install MongoDB:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb-org
   ```

2. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Secure MongoDB:**
   ```bash
   # Create admin user
   mongosh
   use admin
   db.createUser({
     user: "admin",
     pwd: "secure-password",
     roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase"]
   })
   ```

4. **Enable Authentication:**
   Edit `/etc/mongod.conf`:
   ```yaml
   security:
     authorization: enabled
   ```

5. **Restart MongoDB:**
   ```bash
   sudo systemctl restart mongod
   ```

6. **Update Connection String:**
   ```
   MONGODB_URI=mongodb://admin:secure-password@localhost:27017/personal-website?authSource=admin
   ```

## Environment Variables

Create a `.env.production` or configure in your hosting platform:

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/personal-website

# Authentication
JWT_SECRET=generate-a-secure-random-string-at-least-32-characters-long

# Application
NEXT_PUBLIC_API_URL=https://yourdomain.com
NODE_ENV=production
```

### Generating a Secure JWT Secret:

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Using /dev/urandom
head -c 32 /dev/urandom | base64
```

## Initial Data Setup

After deployment, you need to create the first admin user:

### Method 1: Using the Registration API

```bash
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@yourdomain.com",
    "password": "secure-password-here",
    "role": "admin"
  }'
```

### Method 2: Using MongoDB Shell

```javascript
// Connect to your database
mongosh "your-connection-string"

use personal-website

// Hash the password (run this in Node.js first)
// const bcrypt = require('bcryptjs');
// const hash = await bcrypt.hash('your-password', 10);

db.users.insertOne({
  name: "Admin",
  email: "admin@yourdomain.com",
  password: "$2a$10$...", // Use the hashed password
  role: "admin",
  profileStatus: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Method 3: SSH and Run Script

If you have SSH access:

```bash
ssh your-server
cd /var/www/personal-website
node scripts/create-admin.js
```

## Post-Deployment Steps

1. **Verify Deployment:**
   - Visit your website
   - Check homepage loads correctly
   - Try logging in to admin panel
   - Test creating/editing/deleting users

2. **Set Up Monitoring:**
   - Configure uptime monitoring (e.g., UptimeRobot)
   - Set up error tracking (e.g., Sentry)
   - Configure log aggregation

3. **Set Up Backups:**
   - MongoDB automatic backups
   - Application files backup
   - Environment variables backup (secure storage)

4. **Configure Domain:**
   - Point DNS to your server
   - Wait for DNS propagation
   - Verify SSL certificate

5. **Security Hardening:**
   - Enable firewall (ufw)
   - Configure fail2ban
   - Regular security updates
   - Monitor access logs

## Maintenance

### Updating the Application:

```bash
# Pull latest changes
git pull

# Install dependencies
npm install

# Build
npm run build

# Restart application
pm2 restart personal-website
```

### Database Backups:

```bash
# Manual backup
mongodump --uri="your-connection-string" --out=/backup/$(date +%Y%m%d)

# Restore from backup
mongorestore --uri="your-connection-string" /backup/20240101
```

### Monitoring Logs:

```bash
# PM2 logs
pm2 logs personal-website

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Rollback Procedure

If something goes wrong:

1. **Stop the application:**
   ```bash
   pm2 stop personal-website
   ```

2. **Revert to previous version:**
   ```bash
   git checkout previous-commit-hash
   npm install
   npm run build
   ```

3. **Restart:**
   ```bash
   pm2 restart personal-website
   ```

## Troubleshooting

### Issue: Application Won't Start
- Check PM2 logs: `pm2 logs`
- Verify environment variables
- Check port availability

### Issue: Can't Connect to Database
- Verify MongoDB is running
- Check connection string
- Verify network access/firewall rules

### Issue: 502 Bad Gateway
- Check if application is running: `pm2 status`
- Verify Nginx configuration
- Check application logs

### Issue: SSL Certificate Error
- Renew certificate: `sudo certbot renew`
- Check Nginx SSL configuration

## Support

For deployment issues:
- Check application logs
- Review server logs
- Verify environment configuration
- Check MongoDB connection
- Ensure all dependencies are installed

## Scaling Considerations

For high-traffic deployments:

1. **Horizontal Scaling:**
   - Use load balancer
   - Deploy multiple instances
   - Session persistence with Redis

2. **Database Scaling:**
   - MongoDB replica sets
   - Read replicas
   - Sharding for large datasets

3. **Caching:**
   - Redis for session storage
   - CDN for static assets
   - API response caching

4. **Monitoring:**
   - Application performance monitoring
   - Database query optimization
   - Resource usage tracking

## Cost Estimates

- **Hobby/Small:** $0-25/month (Vercel free + MongoDB Atlas free tier)
- **Small Business:** $25-100/month (Vercel Pro + MongoDB shared)
- **Medium:** $100-500/month (Vercel Enterprise + MongoDB dedicated)
- **Self-Hosted:** $5-50/month (VPS) + time investment

## Conclusion

This deployment guide covers multiple deployment options from simple (Vercel) to advanced (self-hosted). Choose the option that best fits your needs, budget, and technical expertise. Always prioritize security and regular backups in production environments.
