<script setup>
import { RouterLink } from 'vue-router'


defineProps({
  post: {
    type: Object,
    required: true
  }
})

</script>


<template>

<article class="post-card">

  <h2>
    {{ post.title }}
  </h2>


  <p class="post-card__text">
      {{ post.body }}
    </p>


  <RouterLink
    :to="`/posts/${post.id}`"
    class="post-card__link"
  >
    Открыть пост
  </RouterLink>

</article>

</template>