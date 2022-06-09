import request from '@/utils/request'

export function getSystemState() {
  return request({
    url: '/api/v1/system/serverInfo',
    method: 'get'
  })
}

export function reloadSystem() {
  return request({
    url: '/api/v1/system/reloadSystem',
    method: 'get'
  })
}
