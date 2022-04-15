// 这个模块主要获取的是品牌管理模块的数据
import request from '@/utils/request'

// 获取品牌管理列表接口
// /admin/product/baseTrademark/{page}/{limit} get
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
})

// 处理添加品牌
// /admin/product/baseTrademark/save post 携带两个参数：品牌名称、品牌的logo
// 切记：对于新增的品牌，给服务器传递数据，不需要传递id，后台数据库生成

// 修改品牌
// /admin/product/baseTrademark/update put 携带三个参数:id、品牌名称、品牌logo
// 切记：对于修改一个品牌的操作，前端携带的参数要带上id，你需要告诉服务器修改的是哪一个品牌

export const reqAddOrUpdateTradeMark = (trademark) => {
    // 带给服务器的数据携带Id---修改
    if (trademark.id) {
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'PUT',
            data: trademark
        })
    } else {
        // 添加(新增)品牌
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'POST',
            data: trademark
        })
    }
}

//删除品牌信息
// /admin/product/baseTrademark/remove/{id} delete
export const reqDeleteTradeMark = (id)=>request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'DELETE'
})

