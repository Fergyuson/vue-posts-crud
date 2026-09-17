<script setup>
import { ref, onMounted } from 'vue'

import PostCard from '@/components/PostCard.vue'

const posts = ref([])

const isLoading = ref(true)
const error = ref(null)

const getPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`)
    }

    posts.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(getPosts)
</script>

<template>
  <main class="posts">
    <h1>Посты</h1>

    <p v-if="isLoading">Загрузка...</p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <section v-else class="posts-grid">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </section>
  </main>
</template>
