import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    server: {
        port: 3000,
        cors: true
    },
    base: '/',
    plugins: [
        react(),
        eslint(),
        svgr(),
        tailwindcss(),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            deleteOriginFile: false
        })
    ],
    build: {
        minify: 'esbuild',
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks: {
                    'firebase-app': ['firebase/app'],
                    'firebase-auth': ['firebase/auth'],
                    'firebase-firestore': ['firebase/firestore'],
                    'firebase-storage': ['firebase/storage'],
                    'react-core': ['react', 'react-dom'],
                    'react-router': ['react-router-dom']
                },
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]'
            }
        },
        terserOptions: {
            format: {
                comments: false
            },
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        outDir: 'dist',
        chunkSizeWarningLimit: 1000,
        sourcemap: process.env.NODE_ENV === 'production' ? false : true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
        exclude: [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
            'firebase/storage'
        ]
    }
});
