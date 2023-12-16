import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import Header from '../Header'
import Posts from '../Posts'
import PostFull from '../PostFull'
import SignUp from '../Modal/SignUp'
import SignIn from '../Modal/SignIn'
import './App.css'
import { AppRoute } from '../../constants'

function App() {
  return (
    <div className="app">
      <Header className="app__header" />
      <Routes>
        <Route path={AppRoute.Root} element={<Posts />} />
        <Route path={AppRoute.Articles} element={<Posts />} />

        <Route path={AppRoute.Article} element={<PostFull />} />
        <Route path={AppRoute.Registration} element={<SignUp className="app__modal" />} />
        <Route path={AppRoute.Login} element={<SignIn className="app__modal" />} />
      </Routes>
    </div>
  )
}

export default App
