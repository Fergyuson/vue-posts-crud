<script setup>
import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import PostContent from '@/components/PostContent.vue'

import CommentCard from '@/components/CommentCard.vue'

const route = useRoute()

const post = ref(null)

const comments = ref([])

const isLoading = ref(true)

const error = ref(null)

const getData = async () => {
  try {
    const [postResponse, commentsResponse] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`),

      fetch(`https://jsonplaceholder.typicode.com/posts/${route.params.id}/comments`),
    ])

    post.value = await postResponse.json()

    comments.value = await commentsResponse.json()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const updatePost = async (body) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${route.params.id}`,

    {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        body,
      }),
    },
  )

  const data = await response.json()

  post.value = data
}

const deleteComment = (id) => {
  comments.value = comments.value.filter((comment) => comment.id !== id)
}

const newComment = ref('')

const addComment = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      postId: Number(route.params.id),
      name: 'User',
      email: 'user@mail.com',
      body: newComment.value,
    }),
  })

  const data = await response.json()

  comments.value.push(data)

  newComment.value = ''
}

onMounted(getData)
</script>

<template>
  <main class="post-page">

    <RouterLink
      to="/"
      class="back-link"
    >
      ← Назад к постам
    </RouterLink>

    <p v-if="isLoading">Загрузка...</p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <div v-else>
      <PostContent :post="post" @update="updatePost" />

      <section>
        <h2>Комментарии</h2>
        <div class="comments-grid">
          <CommentCard
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            @delete="deleteComment"
          />
        </div>
      </section>

      <section class="add-comment">
        <h2>Добавить комментарий</h2>

        <textarea v-model="newComment" placeholder="Введите комментарий"></textarea>

        <button 
          class="add-comment__button"
          @click="addComment"
        >
          Добавить
        </button>
      </section>
    </div>
  </main>
</template>
