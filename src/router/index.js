import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import CreateBlog from '../views/CreateBlog.vue'
import CreateCategory from '../views/CreateCategory.vue'
import ListBlog from '../views/ListBlog.vue'
import UpdateBlog from '../views/UpdateBlog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/createBlog',
      name: 'createBlog',
      component: CreateBlog
    },
    {
      path: '/createCategory',
      name: 'createCategory',
      component: CreateCategory
    },
    {
      path: '/ListBlog',
      name: 'ListBlog',
      component: ListBlog
    },
    {
      path: '/UpdateBlog/:id',
      name: 'UpdateBlog',
      component: UpdateBlog
    },
  ]
})

export default router
