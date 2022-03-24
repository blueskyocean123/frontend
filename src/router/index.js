import Vue from 'vue';
import Router from 'vue-router';

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
import Profile from '@/components/dashboard/Profile';
import Search from '@/components/dashboard/Search';
import Tag from '@/components/dashboard/Tag';
import User from '@/components/search/User';
import Category from '@/components/search/Category';
import Content from '@/components/search/Content';
import Topic from '@/components/search/Topic';
import Notification from '@/components/dashboard/Notification';

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
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
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
          redirect: '/search/topic',
          component: Search,
          children: [
            {
              path: '/search/topic',
              name: 'Topic',
              component: Topic,
            },
            {
              path: '/search/content',
              name: 'Content',
              component: Content
            },
            {
              path: '/search/category',
              name: 'Category',
              component: Category
            },
            {
              path: '/search/user',
              name: 'User',
              component: User,
            }
          ]
        },
        {
          path: '/notification',
          name: 'Notification',
          component: Notification
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
  ]
});

router.beforeEach( async(to, from, next) => { 
  if (localStorage.getItem('accessToken') === null && localStorage.getItem('refreshToken') !== null) {
    await this.$store.dispatch('refreshToken');
  } else if (localStorage.getItem('accessToken') !== null) {
    return next();
  }
  return next();
})

export default router;
