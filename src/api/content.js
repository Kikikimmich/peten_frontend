import request from '@/utils/request'


// 列表
export function getList(page, pageSize, author) {
  return request(({
    url: '/content/list',
    method: 'get',
    params: { page: page, pageSize: pageSize, author: author }
  }))
}