import autoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import iconsResolver from 'unplugin-icons/resolver'
import icons from 'unplugin-icons/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import components from 'unplugin-vue-components/vite'
import { PluginOption } from 'vite'

export function configUnPlugins() {
  const plugins: PluginOption[] = []

  plugins.push(
    components({
      resolvers: [
        AntDesignVueResolver({ importStyle: 'less' }),
        iconsResolver({
          prefix: 'icon',
          alias: { 'park-outline': 'icon-park-outline' },
          customCollections: ['custom']
        })
      ],
      dirs: ['src/components'],
      extensions: ['vue', 'tsx'],
      dts: 'types/modules.d.ts'
    })
  )

  plugins.push(
    autoImport({
      resolvers: [AntDesignVueResolver()],
      imports: [
        'vue',
        'pinia',
        'vue-router',
        'vue-i18n',
        'vitest',
        '@vueuse/core'
        // { 'lodash-es': ['isNil', 'set', 'isString', 'filter', 'minBy'] }
      ],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: 'types/auto-import.d.ts'
    })
  )

  plugins.push(
    icons({
      autoInstall: true,
      jsx: 'react',
      compiler: 'vue3',
      customCollections: {
        // 项目自定义图标集
        custom: FileSystemIconLoader('src/assets/svg', svg =>
          svg.replace(/^<svg/, '<svg fill="currentColor"')
        )
      }
    })
  )

  return plugins
}
