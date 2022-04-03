import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'

const apis: MockMethod[] = [
  {
    url: '/mock/upload',
    method: 'post',
    response: (): any => {
      return {
        code: 200,
        data: {
          url: Random.image('100×100', '#FF6600', '#333333', 'png', '上传')
        },
        message: '上传成功'
      }
    }
  }
]

export default apis
