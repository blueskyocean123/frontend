import Vue from 'vue';
import Router from 'vue-router';

// import { store } from '@/store/store';

import Landing from '@/view/Landing';
import Login from '@/view/Login';
import Standby from '@/view/Standby';
import Signup from '@/view/Signup';
import Confirmed from '@/view/Confirmed';
import Dashboard from '@/view/Dashboard';
import Home from '@/components/dashboard/Home';
import Indiv from '@/components/dashboard/Indiv';
import Write from '@/components/dashboard/Write';
import Edit from '@/components/dashboard/Edit';
import Read from '@/components/dashboard/Read';
import List from '@/components/dashboard/List';
import Profile from '@/components/dashboard/newProfile';
import Search from '@/components/dashboard/Search';
import Tag from '@/components/dashboard/Tag';

import Test from '@/view/Test';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [    
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    { // http://localhost:8080/#/login
      path: '/login',
      name: 'Login',
      component: Login
    },
    { // http://localhost:8080/#/signup
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    { // http://localhost:8080/#/dashboard
      path: '/dashboard',
      name: 'Dashboard',
      redirect: '/home',
      component: Dashboard,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
        },
        {
          path: '/indiv',
          name: 'Indiv',
          component: Indiv
        },
        {
          path: '/list',
          name: 'List',
          component: List
        },
        {
          path: '/write',
          name: 'Write',
          component: Write,
        },
        {
          path: '/edit',
          name: 'Edit',
          component: Edit
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
        },
        {
          path: '/read',
          name: 'Read',
          component: Read
        },
        {
          path: '/search',
          name: 'Search',
          component: Search
        },
        {
          path: '/tag',
          name: 'Tag',
          component: Tag
        }
      ]
    },
    {
      path: '/standby',
      name: 'Standby',
      component: Standby
    },
    {
      path: '/confirmed/',
      name: 'Confirmed',
      component: Confirmed
    }
    // {
    //   path: '/view',
    //   name: 'ViewBlog',
    //   component: ViewBlog
    // }
  ]
});

router.beforeEach( async(to, from, next) => { //여기서 모든 라우팅이 대기상태가 됨
  /**
   * to: 이동할 url 정보가 담긴 라우터 객체
   * from: 현재 url 정보가 담긴 라우터 객체
   * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
   * next() 가 호출되기 전까지 화면 전환되지 않음
   */
  if (localStorage.getItem('accessToken') === null && localStorage.getItem('refreshToken') !== null) {
    // refreshToken은 있고 accessToken이 없을 경우 토큰 재발급 요청.
    // alert('AccessToken Reissue is required.');
    await this.$store.dispatch('refreshToken');
  } else if (localStorage.getItem('accessToken') !== null) {
    // accessToken이 있을 경우 다음 미들웨어로 전환.
    // alert('OK. You are verified');
    return next();
  }
  //둘다 없을 경우에는 여기서 요청을 너무 때려서 주석처리하고 App.uve에다가 created 훅에다가 추가함
  // if(VueCookies.get('accessToken')===null && VueCookies.get('refreshToken') === null){
  //   //2개 토큰이 모두 없을 경우 로그인페이지로
  //   return next({name: 'Login'});
  // }
  // return next();
  return next();
})

export default router;
