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

// 修改Spu|添加Spu：对于修改或添加，携带给服务器的参数大致是一样的，唯一的区别就是携带的参数是否携带Id
// /admin/product/updateSpuInfo post /admin/product/saveSpuInfo post  
export const reqAddOrUpdateSpu = (spuInfo)=>{
    // 如果携带的参数有id ----修改spu
    if(spuInfo.id){
        return request({
            url: '/admin/product/updateSpuInfo',
            method: 'POST',
            data: spuInfo
        })
    }else{
        return request({
            url: '/admin/product/saveSpuInfo',
            method: 'POST',
            data: spuInfo
        })
    }
}

// 删除Spu
// /admin/product/deleteSpu/{spuId} delete
export const reqDeleteSpu = (spuId)=>request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'DELETE'
})

// Spu模块的Sku接口

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

// 保存信息
// /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo)=>request({
    url: '/admin/product/saveSkuInfo',
    method: 'POST',
    data: skuInfo
})

// 获取Sku列表数据的接口
// /admin/product/findBySpuId/{spuId} get
export const reqSkuList = (spuId)=>request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'GET'
})