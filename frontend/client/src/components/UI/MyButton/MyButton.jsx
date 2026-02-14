import React from 'react'
import style from './MyButton.module.css'

const MyButton = ({children, ...props}) => {
  return (
    <button className={style.MyButton} {...props}>
      {children}
    </button>
  )
}

export default MyButton
