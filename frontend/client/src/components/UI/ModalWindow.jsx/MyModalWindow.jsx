import React from 'react'
import style from './MyModalWindow.module.css'

const MyModalWindow = ({ children, flag, setFlag }) => {
  return (
    <div style={{ display: flag }} onClick={(event) => {
      if (event.target.className==style.modal) {
        setFlag("none");
      }
    }} className={style.modal}>
      <div className={style.modalContent}>
        {children}
      </div>
    </div>
  )
}

export default MyModalWindow
