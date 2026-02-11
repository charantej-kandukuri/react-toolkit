import React from 'react'
import { Post, reactionAdded, ReactionName } from './postsSlice'
import { useAppDispatch } from '@/app/hooks'
const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

interface Props {
  post: Post
}

const ReactionButtons = ({ post }: Props) => {
  const dispatch = useAppDispatch()

  return Object.entries(reactionEmoji).map(([stringName, emoji]) => {
    const reaction = stringName as ReactionName

    return (
      <button
        key={reaction}
        type="button"
        className="muted-button reaction-button"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction }))}
      >
        {emoji} {post.reactions[reaction]}
      </button>
    )
  })
}

export default ReactionButtons
