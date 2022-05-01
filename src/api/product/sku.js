// Sku模块
import request from '@/utils/request'

// Sku列表的接口
// /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'GET'
})

// 商品上架
// /admin/product/onSale/{skuId} get
export const reqOnSale = (skuId)=>request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'GET'
})

// 商品下架
// /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId)=>request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'GET'
})

// 获取Sku详情的接口
// /admin/product/getSkuById/{skuId} get
export const reqSkuById = (skuId)=>request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'GET'
})