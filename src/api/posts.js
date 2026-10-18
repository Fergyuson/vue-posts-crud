const API_URL = 'https://jsonplaceholder.typicode.com'

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`)

  if (!response.ok) {
    throw new Error(`Не удалось загрузить посты. Код ошибки: ${response.status}`)
  }

  return response.json()
}

export const getPost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`)

  if (!response.ok) {
    throw new Error(`Не удалось загрузить пост. Код ошибки: ${response.status}`)
  }

  return response.json()
}

export const getComments = async (postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`)

  if (!response.ok) {
    throw new Error(`Не удалось загрузить комментарии. Код ошибки: ${response.status}`)
  }

  return response.json()
}

export const updatePost = async (id, body) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body }),
  })

  if (!response.ok) {
    throw new Error(`Не удалось изменить пост. Код ошибки: ${response.status}`)
  }

  return response.json()
}

export const deleteComment = async (id) => {
  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Не удалось удалить комментарий. Код ошибки: ${response.status}`)
  }
}

export const createComment = async (comment) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })

  if (!response.ok) {
    throw new Error(`Не удалось создать комментарий. Код ошибки: ${response.status}`)
  }

  return response.json()
}
