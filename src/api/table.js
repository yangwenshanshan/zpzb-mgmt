import request from '@/utils/request'

export function getPicture(params) {
  return request({
    url: '/picture/public/searchByType',
    method: 'get',
    params
  })
}
