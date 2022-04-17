// 平台属性管理模块的请求文件
import request from '@/utils/request'

// 获取一级分类数据的接口
// /admin/product/getCategory1  get
export const reqCategory1List = () => request({
    url: '/admin/product/getCategory1',
    method: 'GET'
})

// 获取二级分类数据接口
// /admin/product/getCategory2/{category1Id} get
export const reqCategory2List = (category1Id) => request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'GET'
})

// 获取三级分类数据接口
// /admin/product/getCategory3/{category2Id} get
export const reqCategory3List = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'GET'
})

// 获取平台属性数据的接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET'
})

// 添加属性与属性值的接口
// /admin/product/saveAttrInfo  post
export const reqAddOrUpdateAttrInfo = (data)=>request({
    url: '/admin/product/saveAttrInfo',
    method: 'POST',
    data
}) 
/*
{
    "attrName": "string",
    "attrValueList": [
        {
        "attrId": 0,
        "id": 0,
        "valueName": "string"
        }
    ],
    "categoryId": 0,
    "categoryLevel": 0,
    "id": 0
}
*/
// 