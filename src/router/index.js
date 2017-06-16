import Vue from 'vue';
import Router from 'vue-router';

// 定义所有的路由表
/* layout */
import Layout from '../views/layout/Layout';

/* login */
import Login from '../views/login/';
import authRedirect from '../views/login/authredirect';
import sendPWD from '../views/login/sendpwd';
import reset from '../views/login/reset';

/* dashboard */
import dashboard from '../views/dashboard/index';

/* Introduction */
import Introduction from '../views/introduction/index';

/* components */
const componentsIndex = () => import('../views/components/index');
// const componentsIndex = resolve => require(['../views/components/index'], resolve);
// import componentsIndex from '../views/components/index';
import Tinymce from '../views/components/tinymce';
import Markdown from '../views/components/markdown';
import JsonEditor from '../views/components/jsoneditor';
import DndList from '../views/components/dndlist';
import AvatarUpload from '../views/components/avatarUpload';
import Dropzone from '../views/components/dropzone';
import Sticky from '../views/components/sticky';
import SplitPane from '../views/components/splitpane';
import CountTo from '../views/components/countTo';
import Mixin from '../views/components/mixin';


/* charts */
import chartIndex from '../views/charts/index';
import KeyboardChart from '../views/charts/keyboard';
import KeyboardChart2 from '../views/charts/keyboard2';
import LineMarker from '../views/charts/line';
import MixChart from '../views/charts/mixchart';
import BaseCharts from '../views/charts/BaseCharts';

/* error page */
import Err404 from '../views/error/404';
import Err401 from '../views/error/401';

/* error log */
import ErrorLog from '../views/errlog/index';

/* excel */
import ExcelDownload from '../views/excel/index';

/* theme  */
import Theme from '../views/theme/index';

/* example*/
import TableLayout from '../views/example/table/index';
import DynamicTable from '../views/example/table/dynamictable';
import Table from '../views/example/table/table';
import DragTable from '../views/example/table/dragTable';
import InlineEditTable from '../views/example/table/inlineEditTable';
import VueTable from '../views/example/table/VueTable';

import Form1 from '../views/example/form1';

/* permission */
import Permission from '../views/permission/index';

/* user mantance */
// 试验几种动态加载和打包方法
// const UserManage = () => import('../views/usermanage/index');
// const UserManage = resolve => require(['../views/usermanage/index'], resolve);
const UserManage = r => require.ensure([], () => r(require('../views/usermanage/index.vue')), 'group-mantance')
// import UserManage from '../views/usermanage/index';
import LocalStorage from '../views/usermanage/localstorage';
import Indexeddb from '../views/usermanage/indexeddb';
import Websocket from '../views/usermanage/websocket';



Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/
// 通用权限组件
export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/authredirect', component: authRedirect, hidden: true },
    { path: '/sendpwd', component: sendPWD, hidden: true },
    { path: '/reset', component: reset, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'xinrenzhinan',
    noDropdown: true,
    children: [{ path: 'index', component: Introduction, name: '简述' }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'quanxian',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['admin'] } }]
  },
  {
    path: '/test',
    component: Layout,
    redirect: 'noredirect',
    name: '演练功能',
    icon: 'theme',
    noDropdown: false,
    children: [{ path: 'index', component: UserManage, name: '用户管理' },
               { path: 'localstorage', component: LocalStorage, name: '本地存储' },
               { path: 'indexeddb', component: Indexeddb, name: '本地数据库' },
               { path: 'websocket', component: Websocket, name: 'WebSocket' }
    ]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'zujian',
    children: [
      { path: 'index', component: componentsIndex, name: '介绍 ' },
      { path: 'tinymce', component: Tinymce, name: '富文本编辑器' },
      { path: 'markdown', component: Markdown, name: 'Markdown' },
      { path: 'jsoneditor', component: JsonEditor, name: 'JSON编辑器' },
      { path: 'dndlist', component: DndList, name: '列表拖拽' },
      { path: 'splitpane', component: SplitPane, name: 'SplitPane' },
      { path: 'avatarupload', component: AvatarUpload, name: '头像上传' },
      { path: 'dropzone', component: Dropzone, name: 'Dropzone' },
      { path: 'sticky', component: Sticky, name: 'Sticky' },
      { path: 'countto', component: CountTo, name: 'CountTo' },
      { path: 'mixin', component: Mixin, name: '小组件' }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '图表',
    icon: 'tubiaoleixingzhengchang',
    children: [
      { path: 'index', component: chartIndex, name: '介绍' },
      { path: 'keyboard', component: KeyboardChart, name: '键盘图表' },
      { path: 'keyboard2', component: KeyboardChart2, name: '键盘图表2' },
      { path: 'line', component: LineMarker, name: '折线图' },
      { path: 'mixchart', component: MixChart, name: '混合图表' },
      { path: 'basecharts', component: BaseCharts, name: 'vue-echart3' }
    ]
  },
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      { path: '401', component: Err401, name: '401' },
      { path: '404', component: Err404, name: '404' }
    ]
  },
  {
    path: '/errlog',
    component: Layout,
    redirect: 'noredirect',
    name: 'errlog',
    icon: 'bug',
    noDropdown: true,
    children: [{ path: 'log', component: ErrorLog, name: '错误日志' }]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: 'noredirect',
    name: 'excel',
    icon: 'EXCEL',
    noDropdown: true,
    children: [{ path: 'download', component: ExcelDownload, name: '导出excel' }]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    name: 'theme',
    icon: 'theme',
    noDropdown: true,
    children: [{ path: 'index', component: Theme, name: '换肤' }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    icon: 'zonghe',
    children: [
      {
        path: '/table',
        component: TableLayout,
        redirect: '/table/table',
        name: 'table',
        children: [
          { path: 'dynamictable', component: DynamicTable, name: '动态table' },
          { path: 'dragtable', component: DragTable, name: '拖拽table' },
          { path: 'inline_edit_table', component: InlineEditTable, name: 'table内编辑' },
          { path: 'table', component: Table, name: '综合table' },
          { path: 'vuetable', component: VueTable, name: 'vue-datasource' }
        ]
      },
      { path: 'form1', component: Form1, name: '综合form1' }
    ]
  },
  // 404 页面最后加载，才不会阻止其他页面
  { path: '*', redirect: '/404', hidden: true }
];
