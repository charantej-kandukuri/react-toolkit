import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import postsReducer from './features/posts/postsSlice'
import usersReducer from './features/users/usersSlice'

interface CounterState {
  value: number
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
})

// infer the type of `store`
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// infer the `AppDispatch` type from store itself.
