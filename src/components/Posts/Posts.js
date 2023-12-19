import { useState } from 'react'
import { Pagination } from 'antd'

import { POSTS_PER_PAGE, MAX_POSTS } from '../../constants'
import Spinner from '../Spinner'
import Error from '../Error'
import { useGetArticlesQuery } from '../../services/api'
import { formatArticles } from '../../utils'

import PostsList from './PostsList'
import './style.css'

function Posts() {
  let localStorage_value = localStorage.getItem('posts_pagination_CurrentPage')
  localStorage_value = localStorage_value ? JSON.parse(localStorage_value) : 1

  const [currentPage, setCurrentPage] = useState(localStorage_value)
  const { data, isError, isFetching } = useGetArticlesQuery(currentPage)
  const articles = data ? formatArticles(data.articles) : []

  let [isFetchFlag, etIsFetchFlag] = useState(true)

  let etIsFlag = () => {
    etIsFetchFlag(false)
  }

  const spinner = <Spinner />
  const postsList = <PostsList articles={articles} etIsFlag={etIsFlag} />
  let isFetch = isFetching ? spinner : postsList
  if (isFetchFlag === false) isFetch = <PostsList articles={articles} etIsFlag={etIsFlag} />
  if (isError) return <Error />

  return (
    <div className="posts">
      {isFetch}
      <Pagination
        defaultCurrent={currentPage}
        className="posts__pagination"
        pageSize={POSTS_PER_PAGE}
        total={MAX_POSTS}
        onChange={(page) => {
          etIsFetchFlag(true)
          localStorage.setItem('posts_pagination_CurrentPage', JSON.stringify(page))
          setCurrentPage(page)
        }}
        showSizeChanger={false}
      />
    </div>
  )
}
export default Posts
