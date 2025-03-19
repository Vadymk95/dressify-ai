import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        cors: true,
    },
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, './src'),
        },
    },
});
