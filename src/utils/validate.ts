// 校验手机号
export const phoneReg = /^1\d{10}$/
export const testPhone = (value: any) => {
  return phoneReg.test(value)
}
export const validatePhone = (rule: any, value: any, callback: any) => {
  if (!testPhone(value)) {
    return callback(new Error('请输入正确的手机号'))
  }
  callback()
}

export const emailReg = /^.+@.+\..+$/
export const testEmail = (value: any) => {
  return emailReg.test(value)
}
export const validateEmail = (rule: any, value: any, callback: any) => {
  if (!testEmail(value)) {
    return callback(new Error('请输入正确的邮箱'))
  }
  callback()
}

// 必须包含大写小写数字的密码
export const passwordComplexReg = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(.{8,16})$/
export const testPasswordComplex = (value: any) => {
  return passwordComplexReg.test(value)
}
export const validatePasswordComplex = (rule: any, value: any, callback: any) => {
  if (!testPasswordComplex(value)) {
    return callback(new Error('请输入8-16位包含大写小写与数字的密码'))
  }
  callback()
}

// 简单密码包含字母与数字
export const passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/
export const testPassword = (value: any) => {
  return passwordReg.test(value)
}
export const validatePassword = (rule: any, value: any, callback: any) => {
  if (!testPassword(value)) {
    return callback(new Error('请输入8-16位字母与数字组合的密码'))
  }
  callback()
}
