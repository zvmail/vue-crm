import Vue from 'vue';
import Vuex from 'vuex';

// 模块的data放在moudles下面
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  }
});

export default store
