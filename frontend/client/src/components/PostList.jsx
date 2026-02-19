import React from 'react'
import PostItem from './PostItem'
import MyButton from './UI/MyButton/MyButton'
import { v4 as uuidv4 } from 'uuid'
import style from './PostList.module.css'
const PostList = ({ title, posts, deleteFunc, editFunc, indexGroup, createPost, deleteGroup, editGroup }) => {
  return (
    <div>
      <div className={style.groupPanel}>
        <div className={style.groupInfo}></div>
        {posts.length !== 0
          ? <div>
            <h1>{title}</h1>
          </div>
          : <h1>Here is no post exist in {title}</h1>
        }
        <div className={style.buttonBox}>
          <MyButton onClick={() => { createPost(indexGroup) }}>Add Post</MyButton>
          <MyButton onClick={() => { editGroup(indexGroup, title) }}>Edit Title</MyButton>
          <MyButton onClick={() => { deleteGroup(indexGroup) }}>Delete Group</MyButton>
        </div>
      </div>
      {posts.map(((post, index) => <PostItem key={uuidv4()} id={post.id} index={index} PostTitle={post.title} PostText={post.body} deleteFunc={deleteFunc} editFunc={editFunc} indexGroup={indexGroup}></PostItem>))}
    </div>
  )
}

export default PostList
