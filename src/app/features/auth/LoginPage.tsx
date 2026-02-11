import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React from 'react'
import { selectAllUsers } from '../users/usersSlice'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { userLoggedIn } from './authSlice'

const schema = z.object({
  username: z.string(),
})

type formData = z.infer<typeof schema>

const LoginPage = () => {
  const { register, handleSubmit } = useForm<formData>({
    resolver: zodResolver(schema),
  })

  const users = useAppSelector(selectAllUsers)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = ({ username }: formData) => {
    dispatch(userLoggedIn(username))
    navigate('/posts')
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Welcome to Tweeter!</h2>
      <h3>Please log in:</h3>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <label htmlFor="username">User:</label>
        <select {...register('username')} id="username">
          <option value=""></option>
          {userOptions}
        </select>
        <button>Log In</button>
      </form>
    </section>
  )
}

export default LoginPage
