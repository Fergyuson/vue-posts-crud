<script setup>
import { ref, onMounted } from 'vue'
import PostCard from '@/components/PostCard.vue'
import { getPosts } from '@/api/posts.js'

const posts = ref([])
const isLoading = ref(true)
const error = ref(null)

const loadPosts = async () => {
  isLoading.value = true
  error.value = null

  try {
    posts.value = await getPosts()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(loadPosts)
</script>

<template>
  <main class="posts">
    <h1>Посты</h1>

    <p v-if="isLoading">Загрузка...</p>

    <p v-else-if="error" role="alert">
      {{ error }}
    </p>

    <section v-else class="posts-grid">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </section>
  </main>
</template>
