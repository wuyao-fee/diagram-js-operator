import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  //   build: { outDir: 'dist-demo' },
  server: {
    open: true, // 自动打开浏览器
    port: 3000,
  },
});
