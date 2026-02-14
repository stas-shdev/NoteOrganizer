import React from 'react'
import styles from './MySelect.module.css'

const MySelect = ({defaultValue,defaultTitle,options,selectedOption,setValueFunction}) => {
  return (
    <select className={styles.select} value={selectedOption} onChange={(e) => { setValueFunction(e.target.value) }}>
      <option key={defaultValue} value={defaultValue} disabled>{defaultTitle}</option>
      {options.map(option=><option key={option.value} value={option.value}>{option.title}</option>)}
    </select>
  )
}

export default MySelect
