import request from '@/utils/request'


// 商品种类
export function getCart() {
    return request({
      url: `/shopping-cart/get-shopping-cart`,
      method: 'get',
    })
}


// 更新购物车数量
export function updateShoppingCart(productId, count) {
    return request({
      url: `/shopping-cart/update-shoppingCart`,
      method: 'post',
      params: { 
        productId: productId,
        count: count 
    }
    })
}

// 更新购物车数量
export function deleteShoppingCart(id) {
    return request({
      url: `/shopping-cart/delete-shoppingCart`,
      method: 'post',
      params: {
        id: id
      }
    })
}