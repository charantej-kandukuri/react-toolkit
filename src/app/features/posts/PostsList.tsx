import React from 'react'
import { useAppSelector } from '@/app/hooks'
import { Link } from 'react-router-dom'
import PostAuther from './PostAuther'
import TimeAgo from '@/components/TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsList = () => {
  const posts = useAppSelector((store) => store.posts)
  if (!posts) {
    return <p>No Posts found!</p>
  }

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuther userId={post.user} />
        <TimeAgo timeStamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList
