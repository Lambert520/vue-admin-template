import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  console.log("全局前置路由守卫执行了");

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } 
    else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        // 说明页面刷新了
        console.log("页面刷新了")
        try {
          // get user info
          await store.dispatch('user/getInfo')         
          next(to.path)
        } catch (error) {
          // token失效
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    console.log("没有token吧")
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log("是登陆界面");
      next()
    } else {
      console.log("不是登录界面",`${to.path}`);

      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)

      /*
        一开始浏览器访问 /，而 to.path 是 /dashboard的原因是：/ 路由配置了重定向到 /dashboard，
        重定向发生在导航路由守卫之前，故 to.path 变成了 /dashboard
      */ 
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
