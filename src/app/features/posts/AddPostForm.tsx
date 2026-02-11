import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { postAdded } from './postsSlice'
import { selectCurrentUsername } from '../auth/authSlice'

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(5, 'Description must be atleast 5 characters.'),
})

type formData = z.infer<typeof schema>

const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUsername)!
  const posts = useAppSelector((state) => state.posts)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = ({ title, content }: formData) => {
    const post = {
      id: (posts.length + 1).toString(),
      title,
      user, // userId
      content,
    }
    dispatch(postAdded(post.id, title, content, user))
  }

  return (
    <div>
      <h2>Add a new Post</h2>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data)
          reset()
        })}
      >
        <label htmlFor="postTitle">Post Title:</label>
        <input {...register('title')} type="text" id="postTitle" />
        {errors && errors?.title && <p>{errors.title.message}</p>}
        <label htmlFor="postContent">Content:</label>
        <textarea {...register('content')} id="postContent" />
        {errors && errors?.content && <p>{errors.content.message}</p>}
        <button>Save Post</button>
      </form>
    </div>
  )
}

export default AddPostForm
