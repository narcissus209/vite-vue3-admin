import type { App } from 'vue'
const coms = import.meta.globEager('./**.vue')
export function UseComponents(app: App) {
  Object.keys(coms).forEach((key: string) => {
    const nameMatch = key.match(/\.\/(.+)\.vue/)
    if (!nameMatch) return
    const name = nameMatch[1]
    app.component(name, coms[key].default)
  })
}
