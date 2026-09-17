<script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()
</script>

<template>
  <main>
    <h1>Пост №{{ route.params.postId }}</h1>
    <p>Комментарий № {{ route.params.commentId }}</p>
  </main>
</template>