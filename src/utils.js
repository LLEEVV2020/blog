export function formatArticles(articles) {
  const articlesWithFilteredTags = articles.map((article) => {
    const tagsSet = new Set(article.tagList)
    const filteredTags = Array.from(tagsSet.keys()).filter((tag) => typeof tag === 'string' && tag.trim() !== '')
    return { ...article, tagList: filteredTags }
  })

  return articlesWithFilteredTags
}

export function isFetchBaseQueryError(error) {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(error) {
  return typeof error === 'object' && error != null && 'message' in error && typeof error.message === 'string'
}

export function processServerError(error) {
  const result = {
    username: '',
    email: '',
    password: '',
  }

  if (!error) return result
  if (!('data' in error)) return result
  const serverError = error.data

  result.username = serverError.errors.username || ''
  result.email = serverError.errors.email || ''
  result.password = serverError.errors.password || ''

  return result
}
