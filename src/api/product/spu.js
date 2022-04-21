import request from '@/utils/request'

// 获取spu列表数据的接口
// /admin/product/{page}/{limit}  get
export const reqSpuList = (page, limit, category3Id)=>request({
    url: `/admin/product/${page}/${limit}`,
    method: 'GET',
    params: {category3Id}
})

// 获取spu基本信息
// /admin/product/getSpuById/{spuId}  get
export const reqSpuBaseInfo = (spuId)=>request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'GET'
})

// 获取品牌的信息
// /admin/product/baseTrademark/getTrademarkList get 
export const reqTradeMarkList = ()=>request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'GET'
})

// 获取Spu图片的接口
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId)=>request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'GET'
})

// 获取平台全部销售属性---整个平台销售属性一共三个
// /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList = ()=>request({
    url: '/admin/product/baseSaleAttrList',
    method: 'GET'
})