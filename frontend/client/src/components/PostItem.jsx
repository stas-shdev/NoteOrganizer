import React from 'react'
import MyButton from './UI/MyButton/MyButton'

const PostItem = ({id,index,PostTitle,PostText,deleteFunc, editFunc, indexGroup}) => {
  return (
    <div>
      <div className="postItem">
        <div className="post-Content">
          <strong>{index+1}. {PostTitle}</strong>
          <div className="post-paragraph">{PostText}</div>
        </div>
        <div className="post-btnBox">
          <MyButton onClick={()=>{editFunc(id,indexGroup,PostTitle,PostText)}}>Edit</MyButton>
          <MyButton onClick={()=>{deleteFunc(id,indexGroup)}}>Delete</MyButton>
        </div>
      </div>
    </div>
  )
}

export default PostItem
