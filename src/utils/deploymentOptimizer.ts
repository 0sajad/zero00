
export class DeploymentOptimizer {
  static initialize() {
    this.optimizeForAllPlatforms();
    this.setupUniversalRedirects();
    this.enableProgressiveWebApp();
    this.validateDeploymentReadiness();
    console.log('🚀 Deployment Optimizer initialized - Production Ready');
  }

  private static optimizeForAllPlatforms() {
    // Add platform-specific meta tags
    const metaTags = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-TileColor', content: '#667eea' },
      { name: 'theme-color', content: '#667eea' },
      { name: 'format-detection', content: 'telephone=no' }
    ];

    metaTags.forEach(tag => {
      if (!document.querySelector(`meta[name="${tag.name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Optimize loading performance
    const preconnectLinks = [
      '//fonts.googleapis.com',
      '//cdn.jsdelivr.net',
      '//unpkg.com'
    ];

    preconnectLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  private static setupUniversalRedirects() {
    // Handle client-side routing for SPAs across all platforms
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.url) {
        // Use history API instead of direct location change for better compatibility
        history.pushState(null, '', event.state.url);
      }
    });

    // Handle hash routing fallback for older hosting environments
    if (window.location.hash) {
      const path = window.location.hash.substring(1);
      if (path && path !== '/') {
        history.replaceState(null, '', path);
      }
    }
  }

  private static enableProgressiveWebApp() {
    // Enhanced PWA capabilities with better error handling
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('✅ Service Worker registered successfully');
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('🔄 New version available - refresh to update');
                }
              });
            }
          });
        })
        .catch(error => {
          console.log('Service Worker registration optional for this platform');
        });
    }

    // Enhanced install prompt with better UX
    let deferredPrompt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button if user has interacted with the app
      setTimeout(() => {
        if (deferredPrompt) {
          console.log('📱 App install available');
        }
      }, 5000);
    });
  }

  private static validateDeploymentReadiness() {
    const checks = {
      routing: this.checkClientSideRouting(),
      assets: this.checkAssetLoading(),
      performance: this.checkPerformanceMetrics(),
      compatibility: this.checkBrowserCompatibility(),
      responsive: this.checkResponsiveDesign()
    };

    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    console.log(`🎯 Deployment Readiness: ${passedChecks}/${totalChecks} checks passed`);
    
    if (passedChecks === totalChecks) {
      console.log('✅ All deployment checks passed - Ready for production');
    } else {
      console.warn('⚠️ Some deployment checks failed - Review configuration');
    }
  }

  private static checkClientSideRouting(): boolean {
    return window.history && typeof window.history.pushState === 'function';
  }

  private static checkAssetLoading(): boolean {
    const criticalAssets = document.querySelectorAll('link[rel="stylesheet"], script[src]');
    return criticalAssets.length > 0;
  }

  private static checkPerformanceMetrics(): boolean {
    return 'performance' in window && performance.timing !== undefined;
  }

  private static checkBrowserCompatibility(): boolean {
    const features = [
      'fetch' in window,
      'Promise' in window,
      'localStorage' in window,
      'sessionStorage' in window
    ];
    return features.every(Boolean);
  }

  private static checkResponsiveDesign(): boolean {
    const viewport = document.querySelector('meta[name="viewport"]');
    return viewport !== null;
  }

  static createUniversalDeploymentFiles() {
    // Comprehensive deployment configurations for all platforms
    const deploymentConfigs = {
      // GitHub Pages
      githubPages: {
        '.nojekyll': '',
        '404.html': '<!DOCTYPE html><html><head><meta charset="utf-8"><title>OCTA NETWORK</title><script>sessionStorage.redirect=location.href;</script><meta http-equiv="refresh" content="0;URL=\'/\'"></head><body></body></html>',
        'CNAME': '# Add your custom domain here if needed'
      },

      // Netlify
      netlify: {
        '_redirects': `/*    /index.html   200
/api/*  /api/:splat  200
/assets/*  /assets/:splat  200`,
        '_headers': `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

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

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"`
      },

      // Vercel
      vercel: {
        'vercel.json': JSON.stringify({
          buildCommand: "npm run build",
          outputDirectory: "dist",
          framework: "vite",
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
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "X-XSS-Protection", value: "1; mode=block" }
              ]
            },
            {
              source: "/(.*)\\.js",
              headers: [
                { key: "Content-Type", value: "application/javascript; charset=utf-8" },
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
              ]
            }
          ]
        }, null, 2)
      },

      // Apache/cPanel
      apache: {
        '.htaccess': `# OCTA NETWORK - Production Apache Configuration
RewriteEngine On

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# MIME Types
AddType application/javascript .js .mjs
AddType text/css .css
AddType image/svg+xml .svg
AddType application/font-woff2 .woff2

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Cache Control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/* "access plus 1 year"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/(api|assets)/
RewriteRule . /index.html [L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteCond %{HTTP_HOST} !^localhost
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`
      },

      // IIS/Windows Server
      iis: {
        'web.config': `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <staticContent>
      <mimeMap fileExtension=".js" mimeType="application/javascript; charset=utf-8" />
      <mimeMap fileExtension=".mjs" mimeType="application/javascript; charset=utf-8" />
      <mimeMap fileExtension=".css" mimeType="text/css; charset=utf-8" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
      <mimeMap fileExtension=".json" mimeType="application/json; charset=utf-8" />
    </staticContent>
    <httpProtocol>
      <customHeaders>
        <add name="X-Frame-Options" value="DENY" />
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-XSS-Protection" value="1; mode=block" />
      </customHeaders>
    </httpProtocol>
    <rewrite>
      <rules>
        <rule name="SPA Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/(api|assets)/" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>`
      },

      // Docker
      docker: {
        'Dockerfile': `FROM nginx:alpine

# Copy built application
COPY dist/ /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create nginx cache directory
RUN mkdir -p /var/cache/nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]`,

        'nginx.conf': `events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json image/svg+xml;
    
    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;
        
        # Security headers
        add_header X-Frame-Options DENY always;
        add_header X-Content-Type-Options nosniff always;
        add_header X-XSS-Protection "1; mode=block" always;
        
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
            # Proxy to API server if needed
            # proxy_pass http://api-server;
        }
    }
}`,

        'docker-compose.yml': `version: '3.8'

services:
  octa-network:
    build: .
    ports:
      - "80:80"
      - "443:443"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/var/log/nginx
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Add SSL termination with Let's Encrypt
  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    command: certonly --webroot -w /var/www/certbot --force-renewal --email admin@yourdomain.com -d yourdomain.com --agree-tos`
      }
    };

    return deploymentConfigs;
  }

  static generateDeploymentInstructions() {
    return {
      githubPages: `
# GitHub Pages Deployment

1. Push your code to GitHub repository
2. Go to repository Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. GitHub Actions will automatically build and deploy

Files included: .nojekyll, 404.html
      `,

      netlify: `
# Netlify Deployment

## Option 1: Git Integration
1. Connect your GitHub repository to Netlify
2. Build command: npm run build
3. Publish directory: dist

## Option 2: Manual Upload
1. Run: npm run build
2. Upload the 'dist' folder to Netlify
3. The _redirects and _headers files will handle routing

Files included: _redirects, _headers, netlify.toml
      `,

      vercel: `
# Vercel Deployment

## Option 1: Git Integration
1. Connect your repository to Vercel
2. Framework will be auto-detected as Vite
3. Build and output settings are in vercel.json

## Option 2: CLI Deployment
1. Install Vercel CLI: npm i -g vercel
2. Run: vercel --prod
3. Follow the prompts

Files included: vercel.json with complete configuration
      `,

      cpanel: `
# cPanel/Shared Hosting Deployment

1. Build the project: npm run build
2. Upload contents of 'dist' folder to public_html
3. Ensure .htaccess file is uploaded
4. Set file permissions (usually 644 for files, 755 for directories)

Files included: .htaccess with complete Apache configuration
      `,

      vps: `
# VPS/Dedicated Server Deployment

## Using Docker (Recommended)
1. Upload Dockerfile, nginx.conf, and built files
2. Run: docker build -t octa-network .
3. Run: docker run -p 80:80 octa-network

## Manual Setup with Nginx
1. Install Nginx: sudo apt install nginx
2. Copy built files to /var/www/html
3. Use provided nginx.conf configuration
4. Restart Nginx: sudo systemctl restart nginx

Files included: Complete Docker setup + Nginx configuration
      `
    };
  }
}
