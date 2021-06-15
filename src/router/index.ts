import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Home from '../views/todolist.vue';
import Login from '../views/login.vue';
import Oauth from '../views/oauth.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/auth/redirect',
    name: 'Oauth',
    component: Oauth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
