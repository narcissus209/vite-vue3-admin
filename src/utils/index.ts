/* eslint-disable prefer-rest-params */
// 休眠
export const sleep = (timeout: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, timeout)
  })
}

// 深度克隆
export const cloneDeep = (_: any) => {
  return JSON.parse(JSON.stringify(_))
}

// params对象转query字符串
export const params2query = (params: any) => {
  if (!params || !Object.keys(params).length) {
    return ''
  }
  let res = ''
  for (const k in params) {
    res += `&${k}=${params[k]}`
  }
  return res.slice(1)
}

// query字符串转params对象
export const query2params = (query: string) => {
  if (!query.includes('=')) {
    return {}
  }
  const map: any = {}
  query.includes('?') && (query = query.split('?')[1])
  query
    .split('&')
    .map(el => el.split('='))
    .forEach(el => {
      map[el[0]] = el[1]
    })
  return map
}

type imgSize = {
  height: number
  width: number
}
// 获取图片尺寸大小
export const getImgSize = (file: File): Promise<imgSize> => {
  return new Promise(resolve => {
    const img = new Image()
    const _URL = window.URL || window.webkitURL
    img.src = _URL.createObjectURL(file)
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width
      })
    }
    img.onerror = () => {
      resolve({
        height: 0,
        width: 0
      })
    }
  })
}

/**
 * 校验图片大小
 * @param file 图片文件
 * @param ratio 图片宽高比 [传0使用宽高限制]
 * @param width 图片宽 [可选]
 * @param height 图片高 [可选]
 * @returns boolean
 */
export const checkImgSize = async (file: File, ratio: number, width?: number, height?: number): Promise<boolean> => {
  const img = await getImgSize(file)
  if (ratio !== 0) {
    if (ratio !== img.width / img.height) {
      return false
    } else {
      return true
    }
  } else {
    if (width !== 0 && img.width !== width) {
      return false
    }
    if (height !== 0 && img.height !== height) {
      return false
    }
  }
  return true
}

/**
 * 数组转树形数组
 * @param source 一维数组
 * @param id 数组的id
 * @param pid 数组的pid
 */
export const arr2tree = (source: any, id = 'id', pid = 'parentId'): any => {
  const treeData: any = []
  if (!Array.isArray(source)) return treeData
  const data = JSON.parse(JSON.stringify(source))
  data.forEach((item: any) => {
    delete item.children
  })
  const map: any = {}
  data.forEach((item: any) => {
    map[item[id]] = item
  })
  data.forEach((item: any) => {
    if (!item[pid] || item[pid] === '0') {
      treeData.push(item)
    } else {
      const parent = map[item[pid]]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }
  })
  return treeData
}

/**
 * 数组排序
 * @param property 属性  数组对象排序使用
 * @param type 排序方式  true从小到大，false从大到小
 * @returns boolean
 */
export const compare = (property?: any, type = true) => {
  return function (a: any, b: any) {
    if (property) {
      return type ? a[property] - b[property] : b[property] - a[property]
    } else {
      return type ? a - b : b - a
    }
  }
}

/**
 * 防抖函数最终优化版
 * @param fn 需要防抖的函数
 * @param wait 时间间隔
 * @param immediate 是否立即执行
 * immediate = true; 立即执行第一次，在最后一次调用的 wait 毫秒后，可再次点击继续触发
 * immediate = false; 在函数最后一次调用的 wait 毫秒之后执行
 */
export const debounce = (fn: any, wait = 500, immediate = true) => {
  let timeout: any = null
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    } else if (immediate) {
      fn.apply(this, arguments)
    }
    timeout = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, arguments)
      }
      timeout = null
    }, wait)
  }
}
/**
 * 节流函数
 * @param fn 需要防抖的函数
 * @param wait 时间间隔
 * @param immediate 是否立即执行
 * immediate = false; 不会立即执行，每隔 wait 毫秒后执行一次。
 * immediate = true; 立即执行一次，后续每隔 wait 毫秒后执行一次。
 */
export const throttle = (fn: any, wait = 500, immediate = true) => {
  let isRuning = false
  let timeout: any = null
  return function () {
    if (isRuning) {
      return
    }
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    } else if (immediate) {
      fn.apply(this, arguments)
    }
    isRuning = true
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
      immediate = false
      isRuning = false
      timeout = null
    }, wait)
  }
}
