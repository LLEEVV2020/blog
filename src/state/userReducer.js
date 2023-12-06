import { createSlice } from '@reduxjs/toolkit'

import { getUserInfo, removeUserInfo, saveUserInfo } from '../services/userInfo'

const initialState = {
  user: getUserInfo(),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    removeUserAction: (state) => {
      state.user = null
      removeUserInfo()
    },

    addUserAction: (state, action) => {
      state.user = action.payload
      saveUserInfo(action.payload)
    },
  },
})

export const { addUserAction, removeUserAction } = userSlice.actions
export default userSlice.reducer
