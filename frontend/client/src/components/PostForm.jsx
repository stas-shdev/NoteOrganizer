import React, { useState } from 'react'
import MyButton from './UI/MyButton/MyButton';
import MyInput from './UI/MyInput/MyInput';

const PostForm = ({ create }) => {
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  return (
    <div className="PostForm">
      <div className="PostForm-Inputs">
        <MyInput value={title} onChange={(e) => setTitle(e.target.value)} />
        <MyInput value={paragraph} onChange={(e) => setParagraph(e.target.value)} />
      </div>
      <div>
        <MyButton onClick={() => {
          if (title && paragraph) {
            create(title, paragraph);
            setTitle('');
            setParagraph('');
          } else {alert("Please, write smth in your post")};
        }}>Create </MyButton>
      </div>
    </div>
  )
}

export default PostForm
