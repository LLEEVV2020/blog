import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import Header from '../Header'
import Posts from '../Posts'
import './App.css'
import { AppRoute } from '../../constants'

function App() {
  return (
    <div className="app">
      <Header className="app__header" />
      <Routes>
        <Route path={AppRoute.Root} element={<Posts />} />
      </Routes>
    </div>
  )
}

export default App
