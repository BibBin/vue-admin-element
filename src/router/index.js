/**
 * Created by zwb on 2017/12/29.
 */
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import $vx from '@/utils/vx';

Vue.use(Router);
var router =  new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
});
router.beforeEach((to, from, next) => {

  NProgress.start();
  if ($vx.localStorage.getItem('token')) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }else{
      next()
    }
  } else {
      next('/login')  // 重定向到登录页
      NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router;
