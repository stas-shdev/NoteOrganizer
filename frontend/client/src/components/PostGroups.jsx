import React from 'react'
import PostList from './PostList'
import MyLoadingSign from './UI/LoadingSign/MyLoadingSign'

const PostGroups = ({ postGroups, deleteFunc, editFunc, createPost, isLoads,completeLoading,errorPosts}) => {
  return (
    <div>
      <MyLoadingSign isActive={isLoads}>Posts Is Loading</MyLoadingSign>
      {[...postGroups].map((postListElem) => {
        return (<PostList title={postListElem.group_title} posts={postListElem.posts} deleteFunc={deleteFunc} editFunc={editFunc} indexGroup={postListElem.group_id} createPost={createPost}></PostList>)
      })}
      {()=>{completeLoading()}}
      {errorPosts?<h2>something get wrong:{errorPosts}</h2>: ''}
    </div>
  )
}

export default PostGroups
