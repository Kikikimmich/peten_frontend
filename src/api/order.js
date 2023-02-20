import request from '@/utils/request'

export function submit(params) {
    return request({
      url: '/order/submit',
      method: 'post',
      data: params
    })
  }