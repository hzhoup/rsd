import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'

export function configStylePlugin() {
  return createStyleImportPlugin({
    resolves: [VxeTableResolve()]
  })
}
