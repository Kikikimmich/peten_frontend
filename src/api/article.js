import request from '@/utils/request'


// 文章推荐
export function recommend(id) {
  return request({
    url: `/article/recommend`,
    method: 'get',
    params: {
      id: id
    }
  })
}



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

// 热门列表
export function getTopHot() {
  return request(({
    url: '/article/get-top-hot',
    method: 'get',
  }))
}