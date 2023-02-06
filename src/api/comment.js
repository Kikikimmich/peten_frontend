import request from '@/utils/request'

export function getCommentByArticleId(articleId) {
  return request({
    url: '/comment/get-comments',
    method: 'get',
    params: {
      articleId: articleId
    }
  })
}

export function pushComment(data) {
  return request({
    url: '/comment/add',
    method: 'post',
    data: data
  })
}

