import request from '@/utils/request'

// 获取图片列表
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId)=>request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'GET'
})

// 获取销售属性列表
// /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId)=>request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'GET'
})

// 获取属性信息
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET'
})  