import '../style.css'

function PostsList({ articles }) {
  return (
    <ul className="posts__list">
      {articles.map((article) => (
        <li className="posts__item" key={article.slug}></li>
      ))}
    </ul>
  )
}

export default PostsList
