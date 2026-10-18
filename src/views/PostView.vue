
<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import {
  getPost,
  getComments,
  updatePost,
  deleteComment,
  createComment,
} from '@/api/posts.js'

import PostContent from '@/components/PostContent.vue'
import CommentCard from '@/components/CommentCard.vue'

const route = useRoute()
let nextLocalId = -1

const post = ref(null)
const comments = ref([])

const editBody = ref('')
const isEditing = ref(false)
const isSaving = ref(false)

const newComment = ref('')
const isAdding = ref(false)

const isLoading = ref(true)
const error = ref(null)
const actionError = ref(null)

let currentLoadId = 0

const loadData = async (id) => {
  const loadId = ++currentLoadId

  isLoading.value = true
  error.value = null
  actionError.value = null
  post.value = null
  comments.value = []
  editBody.value = ''
  newComment.value = ''
  isEditing.value = false

  try {
    const [postData, commentsData] = await Promise.all([
      getPost(id),
      getComments(id),
    ])

    
    if (loadId !== currentLoadId) return

    post.value = postData
    comments.value = commentsData
    editBody.value = postData.body
  } catch (err) {
    if (loadId === currentLoadId) {
      error.value = err.message
    }
  } finally {
    if (loadId === currentLoadId) {
      isLoading.value = false
    }
  }
}

const savePost = async () => {
  if (!editBody.value.trim() || isSaving.value) return

  isSaving.value = true
  actionError.value = null

  try {
    const data = await updatePost(
      route.params.id,
      editBody.value
    )

    post.value = { ...post.value, ...data }
    editBody.value = post.value.body
    isEditing.value = false

  } catch (err) {
    actionError.value = err.message
  } finally {
    isSaving.value = false
  }
}

const removeComment = async (comment) => {
  actionError.value = null

  try {
    await deleteComment(comment.id)

    const idToRemove = comment.localId ?? comment.id

    comments.value = comments.value.filter(
      item => (item.localId ?? item.id) !== idToRemove
    )

  } catch (err) {
    actionError.value = err.message
  }
}

const addComment = async () => {
  const body = newComment.value.trim()

  if (!body || isAdding.value) return

  isAdding.value = true
  actionError.value = null

  try {
    const data = await createComment({
      postId: Number(route.params.id),
      name: 'User',
      email: 'user@mail.com',
      body,
    })

    comments.value.push({
      ...data,
      localId: nextLocalId--
    })
    newComment.value = ''

  } catch (err) {
    actionError.value = err.message
  } finally {
    isAdding.value = false
  }
}

watch(
  () => route.params.id,
  (id) => loadData(id),
  { immediate: true }
)
</script>

<template>
  <main class="post-page">
    <RouterLink to="/" class="back-link">
      ← Назад к постам
    </RouterLink>

    <p v-if="isLoading">
      Загрузка...
    </p>

    <p v-else-if="error" role="alert">
      {{ error }}
    </p>

    <div v-else>
      <p v-if="actionError" role="alert">
        {{ actionError }}
      </p>

      <PostContent
        :post="post"
        v-model:body="editBody"
        v-model:editing="isEditing"
        :is-saving="isSaving"
        @save="savePost"
      />
      <RouterLink
        :to="{
          name: 'user',
          params: { id: post.userId },
          query: { fromPost: post.id }
        }"
        class="author-link"
      >
        Посмотреть автора поста
      </RouterLink>

      <section class="comments-section">
        <h2>Комментарии</h2>

        <div class="comments-grid">
          <CommentCard
            v-for="comment in comments"
            :key="comment.localId ?? comment.id"
            :comment="comment"
            @delete="removeComment"
          />
        </div>
      </section>

      <section class="add-comment">
        <h2>Добавить комментарий</h2>

        <textarea
          v-model="newComment"
          placeholder="Введите комментарий"
        ></textarea>

        <button
          class="add-comment__button"
          :disabled="isAdding || !newComment.trim()"
          @click="addComment"
        >
          {{ isAdding ? 'Добавление...' : 'Добавить' }}
        </button>
      </section>
    </div>
  </main>
</template>
