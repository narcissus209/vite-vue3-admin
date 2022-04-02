import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'

const apis: MockMethod[] = [
  {
    url: '/mock/account/:id', // 修改
    method: 'delete',
    response: (req: any): any => {
      console.log(req)
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
