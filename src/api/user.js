import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/v1/user/list',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: '/api/v1/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/api/v1/user',
    method: 'put',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/api/v1/user/' + data,
    method: 'delete',
    data
  })
}

export function login(data) {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/v1/user/info',
    method: 'get'
  })
}

export function refreshToken() {
  return request({
    url: '/api/v1/refreshToken',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/v1/logout',
    method: 'post'
  })
}
