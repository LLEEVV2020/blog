import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { AppRoute } from '../../constants'
import { removeUserAction } from '../../state/userReducer'
import defaultAvatar from './images/defaultAvatar.png'

export default function Header(props) {
  const { className } = props
  const user = useSelector((state) => state.userInfo.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <header className={`${className} header`}>
      <div className="header__logo">
        <Link className="header__logo-link" to={AppRoute.Root}>
          Realworld Blog
        </Link>
      </div>
      <div className="header__controls">
        {user ? (
          <div className="header__auth-user">
            <Link to={AppRoute.NewArticle}>
              <Button className="header__create-article">Create article</Button>
            </Link>
            <div className="header__user-profile">
              <Link to={AppRoute.Profile} className="header__user-name">
                {user.username}
              </Link>
              <Link to={AppRoute.Profile} className="header__user-avatar">
                <img src={user.image || defaultAvatar} width="46" height="46" alt="user avatar " />
              </Link>
            </div>
            <Button className="header__logout" onClick={() => dispatch(removeUserAction())}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className="header__unauth-user">
            <Link to={AppRoute.Login}>
              <Button className="header__sign-in" type="text" onClick={() => navigate(AppRoute.Login)}>
                Sign In
              </Button>
            </Link>
            <Link to={AppRoute.Registration}>
              <Button className="header__sign-up" onClick={() => navigate(AppRoute.Registration)}>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
