import React from 'react'
import PostList from './PostList'
import MyLoadingSign from './UI/LoadingSign/MyLoadingSign'
import MyButton from './UI/MyButton/MyButton'
import {v4 as uuidv4} from 'uuid'
const PostGroups = ({ postGroups,deleteGroup, deleteFunc, editFunc, createPost, isLoads,completeLoading,errorPosts,editGroupFunc}) => {
  return (
    <div>
      <MyLoadingSign isActive={isLoads}>Posts Is Loading</MyLoadingSign>
      {[...postGroups].map((postListElem) => {
        return (<PostList key={uuidv4()} title={postListElem.group_title} posts={postListElem.posts} deleteFunc={deleteFunc} editFunc={editFunc} indexGroup={postListElem.group_id} createPost={createPost} deleteGroup={deleteGroup} editGroup={editGroupFunc}></PostList>)
      })}
      {()=>{completeLoading()}}
      {errorPosts?<h2>something get wrong:{errorPosts}</h2>: ''}
    </div>
  )
}

export default PostGroups
