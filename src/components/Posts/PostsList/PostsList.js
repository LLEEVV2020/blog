import '../style.css'
import Post from '../../Post'

function PostsList({ articles }) {
  return (
    <ul className="posts__list">
      {articles.map((article) => (
        <li className="posts__item" key={article.slug}>
          <Post article={article} />
        </li>
      ))}
    </ul>
  )
}

export default PostsList
