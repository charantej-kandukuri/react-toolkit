import React from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { postUpdated, selectPostById } from './postsSlice'

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(5, 'Description must be atleast 5 characters.'),
})

type formData = z.infer<typeof schema>

const EditPostForm = () => {
  // get the post id from params
  const { postId } = useParams()
  // get the post form state
  const post = useAppSelector((state) => selectPostById(state, postId!))

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title,
      content: post?.content,
    },
  })

  // update the form with default values.

  // handle submit
  const onsubmit = (data: formData) => {
    // TODO:: need to check how to avoid this
    if (post) {
      dispatch(postUpdated({ id: post.id, title: data.title, content: data.content }))
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onsubmit(data))}>
        <label htmlFor="postTitle">PostTitle:</label>
        <input {...register('title')} type="text" id="postTitle" />
        {errors?.title && <p>{errors.title?.message}</p>}
        <label htmlFor="postContent">PostContent</label>
        <textarea {...register('content')} id="postContent"></textarea>
        {errors?.content && <p>{errors.content?.message}</p>}
        <button>save</button>
      </form>
    </div>
  )
}

export default EditPostForm
