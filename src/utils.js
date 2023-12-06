export function formatArticles(articles) {
  const articlesWithFilteredTags = articles.map((article) => {
    const tagsSet = new Set(article.tagList)
    const filteredTags = Array.from(tagsSet.keys()).filter((tag) => typeof tag === 'string' && tag.trim() !== '')
    return { ...article, tagList: filteredTags }
  })

  return articlesWithFilteredTags
}
