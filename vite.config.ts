
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// OCTA NETWORK - Enhanced Universal Vite Configuration
export default defineConfig(({ mode, command }) => {
  const isProduction = mode === 'production';
  
  console.log(`🚀 OCTA NETWORK - Universal Build System - Mode: ${mode}`);
  
  // Smart base path detection for all hosting platforms
  const getUniversalBasePath = () => {
    // GitHub Pages detection
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      return `/${repoName}/`;
    }
    
    // Netlify/Vercel/Other platforms
    if (process.env.NETLIFY || process.env.VERCEL || process.env.NODE_ENV === 'production') {
      return '/';
    }
    
    // Development
    return '/';
  };
  
  return {
    base: isProduction ? getUniversalBasePath() : '/',
    
    server: {
      host: "0.0.0.0",
      port: 8080,
      strictPort: false,
      hmr: {
        port: 8081,
        overlay: true
      },
      cors: true,
      headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block'
      },
      fs: {
        strict: false
      }
    },
    
    preview: {
      host: "0.0.0.0",
      port: 4173,
      strictPort: false,
      cors: true,
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      }
    },
    
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./"),
      },
    },
    
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      target: ['es2020', 'chrome80', 'firefox78', 'safari13', 'edge80'],
      assetsDir: 'assets',
      cssCodeSplit: true,
      
      rollupOptions: {
        external: [],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-toast', '@radix-ui/react-tabs', 'lucide-react'],
            query: ['@tanstack/react-query'],
            charts: ['recharts'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
            
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            
            // تصنيف الملفات حسب النوع
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/css/i.test(ext)) {
              return `assets/styles/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            if (/mp3|wav|ogg|m4a|aac|flac/i.test(ext)) {
              return `assets/sounds/[name]-[hash][extname]`;
            }
            if (/mp4|webm|ogv|avi|mov/i.test(ext)) {
              return `assets/videos/[name]-[hash][extname]`;
            }
            if (/json|xml|txt|md/i.test(ext)) {
              return `assets/data/[name]-[hash][extname]`;
            }
            return `assets/misc/[name]-[hash][extname]`;
          }
        },
        onwarn(warning, warn) {
          // تجاهل التحذيرات غير المهمة
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          if (warning.code === 'SOURCEMAP_ERROR') return;
          if (warning.code === 'INVALID_ANNOTATION') return;
          if (warning.code === 'CIRCULAR_DEPENDENCY') return;
          warn(warning);
        }
      },
      
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        'recharts',
        'date-fns',
        'sonner'
      ],
      exclude: ['@vite/client', '@vite/env'],
      force: true
    },
    
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_APP_VERSION': JSON.stringify('4.0.0'),
      'process.env.VITE_APP_NAME': JSON.stringify('OCTA NETWORK'),
      global: 'globalThis',
      __DEV__: !isProduction
    },
    
    css: {
      devSourcemap: !isProduction,
      postcss: {
        plugins: []
      }
    },
    
    json: {
      namedExports: true,
      stringify: false
    },
    
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      target: 'es2020',
      drop: isProduction ? ['console', 'debugger'] : [],
      legalComments: 'none'
    },
    
    assetsInclude: [
      '**/*.mp3', '**/*.wav', '**/*.ogg', '**/*.m4a', '**/*.aac',
      '**/*.mp4', '**/*.webm', '**/*.ogv',
      '**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf', '**/*.otf'
    ],
    
    worker: {
      format: 'es'
    },
    
    // تحسينات إضافية للأداء
    experimental: {
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') {
          return { js: `"${filename}"` };
        }
        return { relative: true };
      }
    }
  };
});
