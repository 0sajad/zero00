
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Smart Vite Configuration for Universal Compatibility
export default defineConfig(({ mode, command }) => {
  const isProduction = mode === 'production';
  const isBuild = command === 'build';
  
  console.log(`🔧 Vite Configuration - Mode: ${mode}, Command: ${command}`);
  
  return {
    base: './', // Universal base path
    
    server: {
      host: "::",
      port: 8080,
      strictPort: false,
      hmr: {
        port: 8081,
        overlay: true
      },
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },
    
    preview: {
      host: "::",
      port: 4173,
      strictPort: false,
      cors: true
    },
    
    plugins: [
      react({
        jsxImportSource: 'react',
        plugins: [
          ['@swc/plugin-styled-components', {
            displayName: !isProduction,
            ssr: false
          }]
        ]
      }),
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
      
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-toast', '@radix-ui/react-tabs', 'lucide-react'],
            query: ['@tanstack/react-query'],
            i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
            charts: ['recharts'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId 
              ? chunkInfo.facadeModuleId.split('/').pop().replace(/\.[^/.]+$/, "") 
              : "chunk";
            return `assets/${facadeModuleId}-[hash].js`;
          },
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
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
            return `assets/[name]-[hash][extname]`;
          }
        },
        onwarn(warning, warn) {
          // Suppress specific warnings
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          if (warning.code === 'SOURCEMAP_ERROR') return;
          if (warning.code === 'INVALID_ANNOTATION') return;
          warn(warning);
        }
      },
      
      // Enhanced error handling
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
        'i18next',
        'react-i18next',
        'recharts',
        'date-fns',
        'sonner'
      ],
      exclude: ['@vite/client', '@vite/env']
    },
    
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
      global: 'globalThis',
      __DEV__: !isProduction
    },
    
    css: {
      devSourcemap: !isProduction,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    
    json: {
      namedExports: true,
      stringify: false
    },
    
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      target: 'es2020'
    }
  };
});
