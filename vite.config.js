import { defineConfig } from "vite";
import path  from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    root: path.join(__dirname, 'src-react'),
    build:{
        outDir: path.join(__dirname, 'build'),
        emptyOutDir: true
    },
    server: {
        port: 3000,
        strictPort: true,
        host: true,
        open: true
    }
})