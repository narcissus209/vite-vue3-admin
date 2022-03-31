export const getToken = (): string => {
  let token = localStorage.getItem('token')
  if (!token) {
    token = ''
  }
  return token
}

export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const removeToken = (): void => {
  localStorage.removeItem('token')
}
