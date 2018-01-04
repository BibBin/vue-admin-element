/**
 * Created by zwb on 2017/12/29.
 */
const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'

var routes = [
  { path: '/login', component: _import('login/index'), hidden: true,meta: { keepAlive: false } },
  { path: '/404', component: _import('errorPage/404'), hidden: true,meta: { keepAlive: false } },
  { path: '/401', component: _import('errorPage/401'), hidden: true,meta: { keepAlive: false } },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    name: '首页',
    children: [{ path: 'dashboard', component: _import('dashboard/index'),meta: { keepAlive: false } }]
  },
  {
    path: '/menber',
    component: Layout,
    redirect: '/menber/active-list',
    name: '会员管理',
    icon: 'el-icon-menu',
    children: [
      { path: 'active-list', component: _import('menber/menberList'), meta: { keepAlive: true },name: '会员列表 ' },
      { path: 'add-new-member', component: _import('menber/menberAdd'),meta: { keepAlive: true }, name: '添加会员 ' },
      { path: 'member-activity', component: _import('menber/activity'),meta: { keepAlive: true }, name: '创建活动 ' }
    ]
  },
  {
    path: '/rpt',
    component: Layout,
    redirect: '/rpt/demo',
    name: '报表管理',
    icon: 'el-icon-document',
    children: [
      { path: 'demo', component: _import('echarts/index'), meta: { keepAlive: true },name: 'Echarts-demo' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404',meta: { keepAlive: false } }
  }
];

export default routes;
