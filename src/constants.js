export const POSTS_PER_PAGE = 5
export const MAX_POSTS = 570

export const AppRoute = {
  Root: '/',
  Articles: '/articles',
  Article: '/articles/:slug',
  Login: '/sign-in',
  Registration: '/sign-up',
  Profile: '/profile',
  NewArticle: '/new-article',
  EditArticle: '/articles/:slug/edit',
  NotFound: '*',
}

export const Endpoint = {
  Articles: 'articles',
  Users: 'users',
  Login: 'users/login',
  User: 'user',
}

export const BASE_URL = 'https://blog.kata.academy/api'
