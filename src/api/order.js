import request from '@/utils/request'

// 获取所有订单
export function getList() {
    return request({
      url: '/order/get-list',
      method: 'get'
    })
}

// 提交订单
export function submit(params) {
    return request({
      url: '/order/submit',
      method: 'post',
      data: params
    })
}