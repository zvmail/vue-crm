import {
  loginByEmail,
  logout,
  getInfo
} from 'api/login';
import Cookies from 'js-cookie';

// 所有的getter放在一起，方便查找
const getters = {
  token: state => state.token,
  avatar: state => state.avatar,
  name: state => state.name,
  uid: state => state.uid,
  email: state => state.email,
  introduction: state => state.introduction,
  auth_type: state => state.auth_type,
  status: state => state.status,
  roles: state => state.roles,
  setting: state => state.setting
};

// 数据
const state = {
  user: '',
  status: '',
  email: '',
  code: '',
  uid: undefined,
  auth_type: '',
  token: Cookies.get('Admin-Token'),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: []
  }
};

const actions = {
  // 邮箱登录，返回promise对象，异步调用后台
  LoginByEmail({
    commit
  }, userInfo) {
    const email = userInfo.email.trim();
    return new Promise((resolve, reject) => {
      loginByEmail(email, userInfo.password).then(response => {
        const data = response.data;
        Cookies.set('Admin-Token', response.data.token);
        // 用commit mutation通知，改变数据
        commit('SET_TOKEN', data.token);
        commit('SET_EMAIL', email);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },


  // 获取用户信息
  GetInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data;
        commit('SET_ROLES', data.role);
        commit('SET_NAME', data.name);
        commit('SET_AVATAR', data.avatar);
        commit('SET_UID', data.uid);
        commit('SET_INTRODUCTION', data.introduction);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 第三方验证登录
  LoginByThirdparty({
    commit,
    state
  }, code) {
    return new Promise((resolve, reject) => {
      commit('SET_CODE', code);
      loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
        commit('SET_TOKEN', response.data.token);
        Cookies.set('Admin-Token', response.data.token);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 登出
  LogOut({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        Cookies.remove('Admin-Token');
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 前端 登出
  FedLogOut({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      Cookies.remove('Admin-Token');
      resolve();
    });
  },

  // 动态修改权限
  ChangeRole({
    commit
  }, role) {
    return new Promise(resolve => {
      commit('SET_ROLES', [role]);
      commit('SET_TOKEN', role);
      Cookies.set('Admin-Token', role);
      resolve();
    })
  }
};


// 修改数据的同步事件
const mutations = {
  // 第一个参数都是state
  SET_AUTH_TYPE: (state, type) => {
    state.auth_type = type;
  },
  SET_CODE: (state, code) => {
    state.code = code;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_UID: (state, uid) => {
    state.uid = uid;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_SETTING: (state, setting) => {
    state.setting = setting;
  },
  SET_STATUS: (state, status) => {
    state.status = status;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  LOGIN_SUCCESS: () => {
    console.log('login success')
  },
  LOGOUT_USER: state => {
    state.user = '';
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};