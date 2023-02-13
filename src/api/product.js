import request from '@/utils/request'


// 商品种类
export function getCategory() {
    return request({
      url: `/product/get-category`,
      method: 'get',
    })
}

// 商品种类
export function getProduct(page, pageSize, categoryId) {
    return request({
      url: `/product/get-product`,
      method: 'get',
      params: { page: page, pageSize: pageSize, categoryId: categoryId }
    })
}

// 商品详情
export function getDetail(id) {
  return request({
    url: `/product/get-detail`,
    method: 'get',
    params: { id: id }
  })
}

// 添加收藏
export function addCollection(id) {
  return request({
    url: `/product/add-collect`,
    method: 'post',
    params: { id: id }
  })
}

// 添加购物车
export function addCart(id) {
  return request({
    url: `/product/add-shopping-cart`,
    method: 'post',
    params: { id: id }
  })
}
