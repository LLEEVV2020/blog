import { useState } from 'react'

import { useGetArticlesQuery } from '../../services/api'
import { formatArticles } from '../../utils'

import PostsList from './PostsList'
import './style.css'

function Posts() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useGetArticlesQuery(currentPage)
  const articles = data ? formatArticles(data.articles) : []

  console.log(setCurrentPage, 'setCurrentPage')
  console.log(articles, 'articles')
  return (
    <div className="posts">
      <PostsList articles={articles} />
    </div>
  )
}
export default Posts
