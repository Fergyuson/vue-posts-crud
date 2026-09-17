<script setup>
defineProps({
  comment: {
    type: Object,
    required: true,
  },
})

defineEmits(['delete'])
</script>

<template>
  <article class="comment-card">
    <h3>
      {{ comment.name }}
    </h3>

    <p>
      {{ comment.email }}
    </p>

    <p>
      {{ comment.body }}
    </p>

    <button @click="$emit('delete', comment.id)">Удалить</button>
  </article>
</template>
