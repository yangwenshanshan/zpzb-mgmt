import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: '/picture/upload',
    method: 'post',
    data
  })
}




export function getPicture(params) {
  return request({
    url: '/picture/public/searchByType',
    method: 'get',
    params
  })
}
export function postPicture(data) {
  return request({
    url: '/picture',
    method: 'post',
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
export function putPicture(data) {
  return request({
    url: '/picture',
    method: 'put',
    data
  })
}
export function delPicture(params) {
  return request({
    url: '/picture/' + params.id,
    method: 'delete'
  })
}



export function getArticle(params) {
  return request({
    url: '/article/public/searchByType',
    method: 'get',
    params
  })
}

export function postArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}
export function putArticle(data) {
  return request({
    url: '/article',
    method: 'put',
    data
  })
}
export function getArticleDetail(params) {
  return request({
    url: '/article/' + params.id,
    method: 'get',
    params
  })
}
export function delArticle(params) {
  return request({
    url: '/article/' + params.id,
    method: 'delete'
  })
}






export function getPartnerlink(params) {
  return request({
    url: '/partner-link/public/list',
    method: 'get',
    params
  })
}

export function getPartnerlinkDetail(params) {
  return request({
    url: '/partner-link/' + params.id,
    method: 'get',
    params
  })
}

export function postPartnerlink(data) {
  return request({
    url: '/partner-link',
    method: 'post',
    data
  })
}
export function putPartnerlink(data) {
  return request({
    url: '/partner-link',
    method: 'put',
    data
  })
}

export function delPartnerlink(params) {
  return request({
    url: '/partner-link/' + params.id,
    method: 'delete'
  })
}