//将四个模块请求的接口函数统一暴露
import * as trademark from './product/trademark'
import * as attr from './product/attr'
import * as spu from './product/spu'
import * as sku from './product/sku'

// 引入权限相关的接口文件
// 导出的是一个对象，不需要import * as permission
import permission from './acl/permission'
import role from './acl/role'
import * as user from './acl/user'

//对外暴露
export default {
    trademark,
    attr,
    spu,
    sku,
    permission,
    role,
    user
}