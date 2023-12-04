import { Link } from 'react-router-dom'
import './style.css'
import { Button } from 'antd'

import { AppRoute } from '../../constants'

export default function Header() {
  return (
    <header className={'header'}>
      <div className="header__logo">
        <Link className="header__logo-link" to={AppRoute.Root}>
          Realworld Blog
        </Link>
      </div>
      <div className="header__controls">
        <div className="header__unauth-user">
          <Link to={AppRoute.Login}>
            <Button className="header__sign-in" type="text">
              Sign In
            </Button>
          </Link>
          <Link to={AppRoute.Registration}>
            <Button className="header__sign-up">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
