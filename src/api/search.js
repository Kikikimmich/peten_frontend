import request from '@/utils/request'

// 关键词检索
export function search(keyword, page, pageSize) {
  return request({
    url: `/search/content`,
    method: 'get',
    params: {
      keyword: keyword,
      page: page,
      pageSize: pageSize
    }
  })
}
