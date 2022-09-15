import request from '@/utils/request'

export function getNotices(params) {
  return request({
    url: '/api/v1/msg/notice',
    method: 'get',
    params
  })
}

export function createNotice(data) {
  return request({
    url: '/api/v1/msg/notice',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/api/v1/msg/notice',
    method: 'put',
    data
  })
}

export function deleteNotice(data) {
  return request({
    url: '/api/v1/msg/notice/' + data,
    method: 'delete',
    data
  })
}

