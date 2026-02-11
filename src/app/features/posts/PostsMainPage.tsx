import React from 'react'
// @ts-ignore
import PostsList from './PostsList'
import AddPostForm from './AddPostForm'

const PostsMainPage = () => {
  return (
    <div>
      <AddPostForm />
      <PostsList />
    </div>
  )
}

export default PostsMainPage
