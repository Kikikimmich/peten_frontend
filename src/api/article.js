import request from '@/utils/request'


// 文章详情
export function getDetail(id) {
    return request({
      url: `/article`,
      method: 'get',
      params: {
        id: id
      }
    })
  }

// 列表
export function getList(page, pageSize, query) {
  return request(({
    url: '/article/list',
    method: 'get',
    params: { page: page, pageSize: pageSize, query: query }
  }))
}