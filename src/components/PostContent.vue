
<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  isSaving: {
    type: Boolean,
    default: false,
  },
})

const body = defineModel('body', {
  type: String,
  required: true,
})

const isEditing = defineModel('editing', {
  type: Boolean,
  required: true,
})

const emit = defineEmits(['save'])

const startEditing = () => {
  body.value = props.post.body
  isEditing.value = true
}

const cancelEditing = () => {
  body.value = props.post.body
  isEditing.value = false
}

const savePost = () => {
  if (!body.value.trim() || props.isSaving) return

  emit('save')
}
</script>

<template>
  <section class="post-content">
    <h1>{{ post.title }}</h1>

    <p v-if="!isEditing">
      {{ post.body }}
    </p>

    <div v-else>
      <textarea
        v-model="body"
        :disabled="isSaving"
        rows="6"
      ></textarea>
    </div>

    <button
      v-if="!isEditing"
      @click="startEditing"
    >
      Редактировать
    </button>

    <div v-else>
      <button
        :disabled="isSaving || !body.trim()"
        @click="savePost"
      >
        {{ isSaving ? 'Сохранение...' : 'Сохранить' }}
      </button>

      <button
        :disabled="isSaving"
        @click="cancelEditing"
      >
        Отмена
      </button>
    </div>
  </section>
</template>
