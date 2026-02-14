import React from 'react'
import style from './MyLoadingSign.module.css'
const MyLoadingSign = ({children, isActive}) => {
  return (
    <div style={isActive ? {display: "none"} : {display: "box"}}>
      <h2>{children}</h2>
      <div className={style.loadingSign}></div>
    </div>
  )
}
export default MyLoadingSign
