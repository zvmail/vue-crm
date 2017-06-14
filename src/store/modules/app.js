import Cookies from 'js-cookie';

const getters = {
  sidebar: state => state.sidebar
};

const state = {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus')
  },
  theme: 'default',
  livenewsChannels: Cookies.get('livenewsChannels') || '[]'
};
const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
    state.sidebar.opened = !state.sidebar.opened;
  }
};
const actions = {
  ToggleSideBar: ({
    commit
  }) => {
    commit('TOGGLE_SIDEBAR')
  }
};


export default {
  getters,
  state,
  mutations,
  actions
};