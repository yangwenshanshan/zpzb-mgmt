import request from '@/utils/request'

export function getPicture(params) {
  return request({
    url: '/picture/public/searchByType',
    method: 'get',
    params
  })
}
export function uploadImg(data) {
  return request({
    url: '/picture/upload',
    method: 'post',
    data
  })
}
export function postPicture(data) {
  return request({
    url: '/picture',
    method: 'post',
    data
  })
}
export function putPicture(data) {
  return request({
    url: '/picture',
    method: 'put',
    data
  })
}
export function getPictureDetail(params) {
  return request({
    url: '/picture/' + params.id,
    method: 'get',
    params
  })
}
