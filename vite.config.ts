
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Enhanced Vite Configuration for Universal Compatibility
export default defineConfig(({ mode, command }) => {
  const isProduction = mode === 'production';
  
  console.log(`🚀 OCTA NETWORK - تكوين متقدم - النمط: ${mode}`);
  
  // Smart base path detection for GitHub Pages
  const getBasePath = () => {
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      return `/${repoName}/`;
    }
    return '/';
  };
  
  return {
    base: isProduction ? getBasePath() : './',
    
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
        'X-Content-Type-Options': 'nosniff'
      },
      fs: {
        strict: false
      },
      middlewareMode: false
    },
    
    preview: {
      host: "0.0.0.0",
      port: 4173,
      strictPort: false,
      cors: true
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
      target: ['es2020', 'chrome80', 'firefox78', 'safari13'],
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
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/css/i.test(ext)) {
              return `assets/styles/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            if (/mp3|wav|ogg|m4a|aac/i.test(ext)) {
              return `assets/sounds/[name]-[hash][extname]`;
            }
            return `assets/misc/[name]-[hash][extname]`;
          }
        },
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          if (warning.code === 'SOURCEMAP_ERROR') return;
          if (warning.code === 'INVALID_ANNOTATION') return;
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
      exclude: ['@vite/client', '@vite/env']
    },
    
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_APP_VERSION': JSON.stringify('3.0.0'),
      global: 'globalThis',
      __DEV__: !isProduction
    },
    
    css: {
      devSourcemap: !isProduction,
    },
    
    json: {
      namedExports: true,
      stringify: false
    },
    
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      target: 'es2020',
      drop: isProduction ? ['console', 'debugger'] : []
    },
    
    assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg', '**/*.m4a'],
    
    worker: {
      format: 'es'
    }
  };
});
