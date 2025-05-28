
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: './',
    server: {
      host: "::",
      port: 8080,
      strictPort: false,
      hmr: {
        port: 8081
      }
    },
    preview: {
      host: "::",
      port: 4173,
      strictPort: false
    },
    plugins: [
      react({
        jsxImportSource: 'react'
      }),
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
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-toast', '@radix-ui/react-tabs', 'lucide-react'],
            routing: ['react-router-dom'],
            query: ['@tanstack/react-query'],
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        },
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          if (warning.code === 'SOURCEMAP_ERROR') return;
          warn(warning);
        }
      }
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
      global: 'globalThis',
    }
  };
});
