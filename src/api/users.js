const API_URL = 'https://jsonplaceholder.typicode.com'

export const getUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`)

  if (!response.ok) {
    throw new Error(
      `Не удалось загрузить пользователя. Код ошибки: ${response.status}`
    )
  }

  return response.json()
}
