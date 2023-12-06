const USER_INFO_KEY_NAME = 'realworld-blog-userinfo'

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO_KEY_NAME)
  return userInfo ? JSON.parse(userInfo) : null
}

export const saveUserInfo = (userInfo) => {
  localStorage.setItem(USER_INFO_KEY_NAME, JSON.stringify(userInfo))
}

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY_NAME)
}
