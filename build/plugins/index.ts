import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueMacros from 'unplugin-vue-macros'
import type { PluginOption } from 'vite'
import eslint from 'vite-plugin-eslint'
import { configMock } from './mock'
import { configUnocss } from './unocss'
import { configUnPlugins } from './unplugin'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_MOCK } = viteEnv

  const plugins: PluginOption[] = [vue(), vueJsx(), vueMacros.vite({}), eslint()]

  plugins.push(configUnocss())

  plugins.push(...configUnPlugins())

  VITE_MOCK && configMock(isBuild)

  return plugins
}
