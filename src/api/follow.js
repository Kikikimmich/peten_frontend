import request from '@/utils/request'

// 获取我的关注发布（文章）
export function getMyFollowPost() {
  return request(({
    url: `/user/get-my-follow-post`,
    method: 'get'
  }))
}




// 获取我的关注
export function getMyFollow() {
  return request(({
    url: `/user/get-my-follow`,
    method: 'get'
  }))
}



// 关注
export function follow(id) {
  return request(({
    url: `/relationship/subscribe/${id}`,
    method: 'get'
  }))
}

// 关注
export function unFollow(id) {
  return request(({
    url: `/relationship/unsubscribe/${id}`,
    method: 'get'
  }))
}

// 验证是否关注
export function hasFollow(topicUserId) {
  return request(({
    url: `/relationship/validate/${topicUserId}`,
    method: 'get'
  }))
}
