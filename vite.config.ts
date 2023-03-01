/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { wrapperEnv } from './build/helpers/env'
import { createProxy } from './build/helpers/proxy'
import { createVitePlugins } from './build/plugins'

const resolvePath = (...paths: string[]) => resolve(__dirname, ...paths)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const isBuild = command === 'build'

  const env = loadEnv(mode, root, ['VITE_', 'APP_'])
  const viteEnv = wrapperEnv(env)
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } = viteEnv

  return {
    root,
    base: VITE_PUBLIC_PATH,
    envPrefix: ['VITE_', 'APP_'],
    resolve: {
      alias: [{ find: /@\//, replacement: resolvePath('src') + '/' }]
    },
    server: {
      cors: true,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    esbuild: {
      pure: isBuild ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'esnext',
      cssTarget: 'chrome80',
      brotliSize: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2048,
      assetsInlineLimit: 2048
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'c8'
      },
      transformMode: {
        web: [/.[tj]sx$/]
      }
    }
  }
})
