import request from '@/utils/request'

// 获取spu列表数据的接口
// /admin/product/{page}/{limit}  get
export const reqSpuList = (page, limit, category3Id)=>request({
    url: `/admin/product/${page}/${limit}`,
    method: 'GET',
    params: {category3Id}
})