
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  console.log(`🚀 OCTA NETWORK - Performance Optimized Build Configuration - Mode: ${mode}`);
  
  return {
    base: '/',
    
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
        'Access-Control-Allow-Origin': '*'
      }
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
            utils: ['clsx', 'tailwind-merge']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
            
            const ext = assetInfo.name.split('.').pop();
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext!)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/css/i.test(ext!)) {
              return 'assets/styles/[name]-[hash][extname]';
            }
            if (/woff|woff2|ttf|eot/i.test(ext!)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            return 'assets/misc/[name]-[hash][extname]';
          }
        },
        
        treeshake: {
          moduleSideEffects: false,
          unknownGlobalSideEffects: false
        }
      },
      
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      assetsInlineLimit: 4096
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'lucide-react',
        'clsx',
        'tailwind-merge'
      ]
    },
    
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      global: 'globalThis'
    },
    
    esbuild: {
      target: 'es2020',
      drop: isProduction ? ['console', 'debugger'] : [],
      legalComments: isProduction ? 'none' : 'inline'
    },
    
    css: {
      devSourcemap: !isProduction,
      postcss: {}
    }
  };
});
