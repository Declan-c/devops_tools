import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 与tsconfig保持一致
    },
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'Roles', // 确保这里的标签名正确
      },
    },
  })],
})
