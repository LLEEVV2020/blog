import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL, POSTS_PER_PAGE, Endpoint } from '../constants'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Articles', 'Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const user = getState().userInfo.user
      const token = user ? user.token : ''

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (page) => {
        const offset = page === 1 ? 0 : page * POSTS_PER_PAGE - POSTS_PER_PAGE
        return `${Endpoint.Articles}?offset=${offset}&limit=${POSTS_PER_PAGE}`
      },
      providesTags: (result) =>
        result ? [...result.articles.map(({ slug }) => ({ type: 'Articles', id: slug })), 'Articles'] : ['Articles'],
    }),
    getArticle: builder.query({
      query: (slug) => `${Endpoint.Articles}/${slug}`,
      providesTags: (result) => (result ? [{ type: 'Articles', id: result.article.slug }, 'Article'] : ['Article']),
    }),
    postLikeToArticle: builder.mutation({
      query: (slug) => ({
        url: `${Endpoint.Articles}/${slug}/favorite`,
        method: 'POST',
        body: slug,
      }),
      invalidatesTags: ['Article', 'Articles'],
    }),
    deleteLikeFromArticle: builder.mutation({
      query: (slug) => ({
        url: `${Endpoint.Articles}/${slug}/favorite`,
        method: 'DELETE',
        body: slug,
      }),
      invalidatesTags: ['Article', 'Articles'],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `${Endpoint.Articles}/${slug}`,
        method: 'DELETE',
        body: slug,
      }),
      invalidatesTags: ['Articles'],
    }),
    postNewArticle: builder.mutation({
      query: (article) => ({
        url: Endpoint.Articles,
        method: 'POST',
        body: article,
      }),
      invalidatesTags: ['Articles'],
    }),
    putUpdatedArticle: builder.mutation({
      query: ({ slug, article }) => ({
        url: `${Endpoint.Articles}/${slug}`,
        method: 'PUT',
        body: article,
      }),
      invalidatesTags: ['Articles'],
    }),
    postNewUser: builder.mutation({
      query: (newUser) => ({
        url: Endpoint.Users,
        method: 'POST',
        body: newUser,
      }),
    }),
    postExistingUser: builder.mutation({
      query: (user) => ({
        url: Endpoint.Login,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Articles', 'Article'],
    }),
    putUpdatedUser: builder.mutation({
      query: (user) => ({
        url: Endpoint.User,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  usePostNewUserMutation,
  usePostExistingUserMutation,
  usePutUpdatedUserMutation,
  usePostNewArticleMutation,
  usePutUpdatedArticleMutation,
  useDeleteArticleMutation,
  usePostLikeToArticleMutation,
  useDeleteLikeFromArticleMutation,
} = api
