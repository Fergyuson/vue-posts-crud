
<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getUser } from '@/api/users.js'

const route = useRoute()

const returnPostId = computed(() => {
  const id = Number(route.query.fromPost)

  return Number.isSafeInteger(id) && id > 0 ? id : null
})

const user = ref(null)
const isLoading = ref(true)
const error = ref(null)

const loadUser = async (id) => {
  isLoading.value = true
  error.value = null
  user.value = null

  try {
    user.value = await getUser(id)
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

watch(
  () => route.params.id,
  (id) => loadUser(id),
  { immediate: true }
)
</script>

<template>
  <main class="user-page">
     <RouterLink
      :to="returnPostId ? `/posts/${returnPostId}` : '/'"
      class="back-link"
    >
      {{ returnPostId ? '← Назад к посту' : '← Назад ко всем постам' }}
    </RouterLink>

    <p v-if="isLoading" class="user-status">
      Загрузка пользователя...
    </p>

    <p v-else-if="error" class="user-status" role="alert">
      {{ error }}
    </p>

    <article v-else class="user-card">
      <div class="user-card__header">
        <span class="user-card__label">
          Профиль пользователя
        </span>

        <h1>{{ user.name }}</h1>

        <p class="user-card__username">
          @{{ user.username }}
        </p>
      </div>

      <div class="user-card__content">
        <h2>Контактная информация</h2>

        <dl class="user-details">
          <div class="user-details__item">
            <dt>Email</dt>
            <dd>{{ user.email }}</dd>
          </div>

          <div class="user-details__item">
            <dt>Город</dt>
            <dd>{{ user.address.city }}</dd>
          </div>

          <div class="user-details__item">
            <dt>Телефон</dt>
            <dd>{{ user.phone }}</dd>
          </div>

          <div class="user-details__item">
            <dt>Сайт</dt>
            <dd>{{ user.website }}</dd>
          </div>
        </dl>
      </div>
    </article>
  </main>
</template>
