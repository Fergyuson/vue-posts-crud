<script setup>
import { ref } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update'])

const isEditing = ref(false)

const editBody = ref(props.post.body)

const savePost = () => {
  emit('update', editBody.value)

  isEditing.value = false
}
</script>

<template>
  <section class="post-content">
    <h1>
      {{ post.title }}
    </h1>

    <p v-if="!isEditing">
      {{ post.body }}
    </p>

    <textarea v-else v-model="editBody" />

    <button v-if="!isEditing" @click="isEditing = true">Редактировать</button>

    <button v-else @click="savePost">Сохранить</button>
  </section>
</template>
