import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

export function plugins(viteEnv: any) {
  const plugins = [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, '../src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
  if (viteEnv.VITE_MOCK === 'true') {
    plugins.push(
      viteMockServe({
        mockPath: 'mock',
        injectCode: `
        import { setupMockServer } from '../mock';
        setupMockServer();
      `
      })
    )
  }
  return plugins
}
