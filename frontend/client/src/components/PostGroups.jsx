import React from 'react'
import PostList from './PostList'
import {v4 as uuidv4} from 'uuid'
const PostGroups = ({ postGroups, deleteFunc, editFunc, createPost,errorPosts,createInvite,navigateToGroup}) => {
  return (
    <div>
      
      {[...postGroups].map((postListElem) => {
        return (<PostList key={uuidv4()} title={postListElem.group_title} posts={postListElem.posts} deleteFunc={deleteFunc} editFunc={editFunc} indexGroup={postListElem.group_id} createPost={createPost} createInvite={createInvite} navigateToGroup={navigateToGroup}></PostList>)
      })}
      {errorPosts?<h2>something get wrong:{errorPosts}</h2>: ''}
    </div>
  )
}

export default PostGroups
