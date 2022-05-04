// 引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
// 获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
// 重置路由
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    // 存储用户名
    name: '',
    // 存储用户头像
    avatar: '',
    // 菜单标记
    routes: [],
    // 按钮权限
    buttons: [],
    // 角色信息
    roles: []
  }
}

const state = getDefaultState()

// 唯一修改state的地方
const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO: (state,userInfo)=>{
    // 用户名
    state.name = userInfo.name
    // 用户头像
    state.avatar = userInfo.avatar
    // 菜单按钮的标记
    state.routes = userInfo.routes
    // 按钮权限的标记
    state.buttons = userInfo.buttons
    // 用户角色的信息
    state.roles = userInfo.roles
  }
  
}

const actions = {
  // user login ---处理登录业务
  async login({ commit }, userInfo) {
    //解构出用户名与密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    if(result.code == 20000){
      // vuex存储token
      commit('SET_TOKEN', result.data.token);
      // 本地持久化存储token
      setToken(result.data.token);
      return Promise.resolve('ok');
    }else{
      return Promise.reject(new Error('fail'));
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info----获取用户信息
  getInfo({ commit, state }) {
    
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        /*
          获取用户的信息：返回数据包含：
          用户名name、用户头像avatar、
          routes[返回的标志：不同的用户应该展示哪些菜单的标记]、
          buttons[按钮的信息：按钮权限用的标记]
        */ 
        const { data } = response
        // vuex存储用户全部的信息
        commit('SET_USERINFO',data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

