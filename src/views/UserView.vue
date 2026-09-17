<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const user = ref(null)
const isLoading = ref(true)
const error = ref(null)

const getUser = async () => {
  isLoading.value = true
  error.value = null

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${route.params.id}`
      )

      if (!response.ok) {
        throw new Error(
          `Не удалось загрузить пользователя. Код ошибки: ${response.status}`
        )
      }

      user.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
}


onMounted(getUser)
</script>
    <template>
  <main>
    <p v-if="isLoading">
      Загрузка...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <div v-else>
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
      <p>{{ user.address.city }}</p>
    </div>
  </main>
</template>

