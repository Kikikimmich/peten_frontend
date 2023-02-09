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
