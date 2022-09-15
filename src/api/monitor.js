import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/api/v1/monitor/index',
    method: 'get'
  })
}
