export const sleep = (timeout: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, timeout)
  })
}

export const cloneDeep = (_: any) => {
  return JSON.parse(JSON.stringify(_))
}

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
