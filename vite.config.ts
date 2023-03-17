import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue2";
import vueJsx from '@vitejs/plugin-vue2-jsx'
import legacy from "@vitejs/plugin-legacy";
import defineOptions from 'unplugin-vue-define-options/vite';
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '~': pathResolve('src/assets/styles')
}

// 处理的css前缀 和 css文件合并导入
import poscssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('command, mode：', command, mode)
   // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());
  console.log(env.VITE_BASE_URL);
  return {
    plugins: [
      // Vue2单文件组件支持
      vue(),
      // Vue2 支持jsx tsx
      vueJsx({
        // options are passed on to @vue/babel-preset-jsx
      }),
      // 为生产构建提供传统浏览器支持。
      legacy({
        targets: ["defaults"],
      }),
      defineOptions(),
    ],
    // 静态资源服务的文件夹
    publicDir: "public",
    base: "./",
    resolve: {
      // 配置路径别名
      alias,
      extensions:['.js','.ts','.jsx','.tsx','.vue', '.scss']
    },
    //静态资源处理
    assetsInclude: "",
    //控制台输出的级别 info 、warn、error、silent
    logLevel: "info",
    // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
    clearScreen: true,
    css: {
      postcss: {
        plugins: [
          poscssImport,
          autoprefixer
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/index.scss";'
        }
      }
    },
    //本地运行配置，以及反向代理配置
    server: {
      host: "localhost",
      https: false, //是否启用 http 2
      cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
      open: true, //服务启动时自动在浏览器中打开应用
      port: 9000,
      strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
      hmr: true, //禁用或配置 HMR 连接
      // 传递给 chockidar 的文件系统监视器选项
      watch: {
        ignored: ["!**/node_modules/your-package-name/**"],
      },
      // 反向代理配置
      proxy: {
        "/api": {
          // target: "https://xxxx.com/",
          // changeOrigin: true,
          // rewrite: (path) => path.replace(/^/api/, '')
        },
      },
    },
    build: {
      // 默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。Benchmarks
      minify: 'terser',
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位
      terserOptions: {
        compress: {
            //生产环境时移除console
            drop_console: true,
            drop_debugger: true,
        },
      },
      // 自定义底层的 Rollup 打包配置。
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    optimizeDeps: {
      force: false // 强制进行依赖预构建
    },
  }
})
