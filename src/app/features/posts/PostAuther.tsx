import React from 'react'
import { useAppSelector } from '@/app/hooks'
import { selectUserById } from '../users/usersSlice'

interface Props {
  userId: string
}

const PostAuther = ({ userId }: Props) => {
  const author = useAppSelector((state) => selectUserById(state, userId))
  return (
    <div>
      <span>{author?.name ?? 'Unknown auther!'}</span>
    </div>
  )
}

export default PostAuther
