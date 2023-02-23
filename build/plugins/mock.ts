import { viteMockServe } from 'vite-plugin-mock'

export function configMock(isBuild: boolean) {
  return viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    watchFiles: true,
    logger: true,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `
  })
}
