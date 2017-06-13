import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app'; //模块的data放在moudles下面
import user from './modules/user';
import permission from './modules/permission';

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
});

export default store
