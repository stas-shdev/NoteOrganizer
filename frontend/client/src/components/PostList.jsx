import React from 'react'
import PostItem from './PostItem'
import MyButton from './UI/MyButton/MyButton'
import {v4 as uuidv4} from 'uuid'
const PostList = ({ title, posts, deleteFunc ,editFunc, indexGroup, createPost}) => {
  return (
    <div>
      {posts.length!==0
        ? <div>
          <h1 className={'NameOfPostList'}>{title}</h1>
          {posts.map(((post, index) => <PostItem key={uuidv4()} id={post.id} index={index} PostTitle={post.title} PostText={post.body} deleteFunc={deleteFunc} editFunc={editFunc} indexGroup={indexGroup}></PostItem>))}
        </div>
        : <h1>Here is no post exist in {title}</h1>
      }
      <MyButton onClick={()=>{createPost(indexGroup)}}>Add Post</MyButton>
    </div>
  )
}

export default PostList
