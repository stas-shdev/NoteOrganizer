import React from 'react'
import MyInput from './UI/MyInput/MyInput'
import MyButton from './UI/MyInput/MyInput'

const PostEdit = ({completeEditPost,setEditTitle,editTitle,setEditBody,editBody}) => {
  return (
    <div>
      <MyInput value={editTitle} onChange={(e) => { setEditTitle(e.target.value) }}/>
      <MyInput value={editBody} onChange={(e) => { setEditBody(e.target.value) }}/>
      <MyButton onClick={completeEditPost}>Safe Changes</MyButton>
    </div>
  )
}

export default PostEdit;
