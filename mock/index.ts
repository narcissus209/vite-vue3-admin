import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import apis from './apis'
export function setupMockServer() {
  createProdMockServer(apis)
}
