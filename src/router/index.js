import { createRouter, createWebHistory } from 'vue-router'
import PostsView from '../views/PostsView.vue'
import PostView from '../views/PostView.vue'
import CommentView from '../views/CommentView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PostsView,
    },
    {
      path: '/posts/:id',
      component: PostView,
    },
    {
      path: '/posts/:postId/comments/:commentId',
      component: CommentView,
    },
    {
      path: '/users/:id',
      component: UserView,
    }
  ],
})

export default router
