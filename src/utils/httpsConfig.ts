
export class HTTPSConfig {
  static generateHTTPSConfigurations() {
    console.log('🔒 Generating HTTPS configurations for all platforms');
    
    return {
      // Apache .htaccess with HTTPS redirect
      apache: {
        '.htaccess': `# OCTA NETWORK - HTTPS Configuration
RewriteEngine On

# Force HTTPS redirect
RewriteCond %{HTTPS} off
RewriteCond %{HTTP_HOST} !^localhost
RewriteCond %{HTTP_HOST} !^127\.0\.0\.1
RewriteCond %{HTTP_HOST} !^192\.168\.
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# HSTS (HTTP Strict Transport Security)
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Mixed content policy
Header always set Content-Security-Policy "upgrade-insecure-requests"

# React Router - Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/(api|assets)/
RewriteRule . /index.html [L]

# Cache Control with HTTPS support
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/* "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>`
      },

      // Nginx configuration with SSL
      nginx: {
        'nginx-ssl.conf': `# OCTA NETWORK - Nginx HTTPS Configuration
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/html;
    index index.html;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Security headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "upgrade-insecure-requests" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json image/svg+xml;
    
    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API routes (if any)
    location /api/ {
        # Proxy configuration for API
        proxy_cache_bypass $http_upgrade;
        add_header Cache-Control "no-cache";
    }
}`,

        'certbot-setup.sh': `#!/bin/bash
# OCTA NETWORK - Let's Encrypt SSL Setup Script

# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal setup
sudo crontab -l | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet"; } | sudo crontab -

echo "✅ SSL certificate installed and auto-renewal configured"
echo "🔒 Your site is now secured with HTTPS"`
      },

      // Netlify configuration
      netlify: {
        '_headers': `/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: upgrade-insecure-requests

# Force HTTPS (handled automatically by Netlify)
# Cache static assets with HTTPS
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000

/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000`,

        'netlify.toml': `[build]
  publish = "dist"
  command = "npm run build"

# Force HTTPS
[[redirects]]
  from = "http://yourdomain.com/*"
  to = "https://yourdomain.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "upgrade-insecure-requests"`
      },

      // Vercel configuration
      vercel: {
        'vercel.json': JSON.stringify({
          buildCommand: "npm run build",
          outputDirectory: "dist",
          framework: "vite",
          
          // Force HTTPS
          redirects: [
            {
              source: "http://yourdomain.com/(.*)",
              destination: "https://yourdomain.com/$1",
              permanent: true
            }
          ],
          
          rewrites: [
            {
              source: "/((?!api|assets|src|_next|favicon.ico|manifest.json|\\.well-known|sw.js|.*\\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt|pdf|zip|mp3|mp4)).*)",
              destination: "/index.html"
            }
          ],
          
          headers: [
            {
              source: "/(.*)",
              headers: [
                { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "X-XSS-Protection", value: "1; mode=block" },
                { key: "Content-Security-Policy", value: "upgrade-insecure-requests" }
              ]
            }
          ]
        }, null, 2)
      },

      // GitHub Pages (requires custom domain)
      githubPages: {
        'CNAME': 'yourdomain.com',
        '.github/workflows/deploy-https.yml': `name: Deploy with HTTPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install and build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: yourdomain.com`
      },

      // Docker with SSL
      docker: {
        'Dockerfile.ssl': `FROM nginx:alpine

# Install certbot for SSL
RUN apk add --no-cache certbot certbot-nginx

# Copy application
COPY dist/ /usr/share/nginx/html/

# Copy nginx SSL configuration
COPY nginx-ssl.conf /etc/nginx/conf.d/default.conf

# Copy SSL setup script
COPY ssl-setup.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/ssl-setup.sh

# Expose ports
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f https://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]`,

        'docker-compose.ssl.yml': `version: '3.8'

services:
  octa-network-ssl:
    build:
      context: .
      dockerfile: Dockerfile.ssl
    ports:
      - "80:80"
      - "443:443"
    environment:
      - DOMAIN=yourdomain.com
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
      - ./logs:/var/log/nginx
    restart: unless-stopped
    
  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    command: certonly --webroot -w /var/www/certbot --force-renewal --email admin@yourdomain.com -d yourdomain.com --agree-tos
    depends_on:
      - octa-network-ssl`
      },

      // CloudFlare configuration
      cloudflare: {
        'cloudflare-settings.md': `# CloudFlare HTTPS Configuration

## SSL/TLS Settings
1. Go to SSL/TLS > Overview
2. Select "Full (strict)" encryption mode
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

## Security Settings
1. Go to Security > WAF
2. Enable "Security Level: Medium"
3. Go to Security > Bots
4. Enable "Bot Fight Mode"

## Speed Settings
1. Go to Speed > Optimization
2. Enable "Auto Minify" for CSS, JS, HTML
3. Enable "Brotli"
4. Go to Caching > Configuration
5. Set "Browser Cache TTL" to 1 year

## Page Rules (if needed)
Create a page rule: *yourdomain.com/*
- Always Use HTTPS: On
- Browser Cache TTL: 1 year
- Cache Level: Cache Everything`
      }
    };
  }

  static getHTTPSInstructions() {
    return {
      general: `
# HTTPS Implementation Guide

## 1. Choose Your Platform

### Free SSL Options:
- Let's Encrypt (recommended for VPS/dedicated servers)
- CloudFlare (free tier with proxy)
- Netlify/Vercel (automatic HTTPS)

### Paid SSL Options:
- DigiCert, Comodo, etc. (for enterprise)

## 2. Platform-Specific Setup

### GitHub Pages:
1. Add custom domain in repository settings
2. Enable "Enforce HTTPS" (automatic with custom domain)
3. DNS: Add CNAME record pointing to your GitHub Pages URL

### Netlify:
1. Deploy your site
2. Add custom domain in Site settings
3. HTTPS is enabled automatically
4. DNS: Point A record to Netlify's IP or CNAME to your Netlify URL

### Vercel:
1. Deploy your project
2. Add domain in Project settings
3. HTTPS is automatic
4. DNS: Add CNAME record to your Vercel deployment

### VPS/Dedicated Server:
1. Use our provided certbot script
2. Run: sudo ./certbot-setup.sh
3. Update domain in nginx configuration
4. Restart nginx: sudo systemctl restart nginx

### cPanel/Shared Hosting:
1. Most providers offer free Let's Encrypt
2. Enable in cPanel > SSL/TLS > Let's Encrypt
3. Upload our .htaccess file for redirects

## 3. DNS Configuration
- A Record: yourdomain.com → Your server IP
- CNAME: www.yourdomain.com → yourdomain.com
- Or use platform-specific instructions above

## 4. Testing HTTPS
- Test at: https://www.ssllabs.com/ssltest/
- Check mixed content: Open browser dev tools, look for insecure content warnings
- Verify redirects: Test http://yourdomain.com redirects to https://
      `,

      testing: `
# HTTPS Testing Checklist

✅ All HTTP requests redirect to HTTPS
✅ SSL certificate is valid and trusted
✅ No mixed content warnings
✅ HSTS header is present
✅ Security headers are configured
✅ Performance is not degraded
✅ All functionality works over HTTPS
✅ Forms submit over HTTPS
✅ API calls use HTTPS
✅ SSL Labs test shows A+ rating
      `
    };
  }

  static enableHTTPSRedirect() {
    // Client-side HTTPS enforcement for development/testing
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      // Only redirect in production environments
      if (location.hostname.includes('.') && !location.hostname.includes('192.168.')) {
        location.replace('https:' + window.location.href.substring(window.location.protocol.length));
      }
    }

    // Add HTTPS meta tags
    const httpsMetaTags = [
      { httpEquiv: 'Content-Security-Policy', content: 'upgrade-insecure-requests' },
      { name: 'referrer', content: 'strict-origin-when-cross-origin' }
    ];

    httpsMetaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.httpEquiv) meta.httpEquiv = tag.httpEquiv;
      if (tag.name) meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    console.log('🔒 HTTPS enforcement enabled');
  }
}
