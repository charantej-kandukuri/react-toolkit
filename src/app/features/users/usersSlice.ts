import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'

interface User {
  id: string
  name: string
}

const initialState: User[] = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action: PayloadAction<User>) {
      state.push(action.payload)
    },
    userUpdated(state, action: PayloadAction<User>) {
      const { id, name } = action.payload
      const existingUser = state.find((user) => user.id === id)
      if (existingUser) {
        existingUser.name = name
      }
    },
  },
})

// export reducer and actions
export default userSlice.reducer
export const { userAdded, userUpdated } = userSlice.actions

// export selections
export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId: string) => state.users.find((user) => user.id === userId)
export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if (currentUsername) {
    return selectUserById(state, currentUsername)
  }
}
