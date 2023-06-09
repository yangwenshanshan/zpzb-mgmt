import Cookies from 'js-cookie'

const TokenKey = 'zpzb_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {expires: 30})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
