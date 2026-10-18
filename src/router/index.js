
import { createRouter, createWebHistory } from 'vue-router'

import PostsView from '../views/PostsView.vue'
import PostView from '../views/PostView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserView,
    },
  ],
})

export default router
