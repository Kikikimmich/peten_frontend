import request from '@/utils/request'


// 热门列表
export function getTopGroup() {
  return request(({
    url: '/group/get-hot-group',
    method: 'get',
  }))
}

// 热门列表
export function getAllGroup() {
  return request(({
    url: '/super-group/all',
    method: 'get',
  }))
}