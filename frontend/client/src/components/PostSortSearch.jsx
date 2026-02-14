// import React from 'react'
import MySelect from './UI/Select/MySelect'
import MyInput from './UI/MyInput/MyInput'

const PostSortSearch = ({stateSort,setStateSort, optionsForSort,searchValue,searchFunction, ...props}) => {
  return (
    <div props>
      <MySelect defaultValue={''} selectedOption={stateSort} defaultTitle={'Sort  by:'} options={optionsForSort} setValueFunction={setStateSort}></MySelect>
      <MyInput value={searchValue} onChange={searchFunction}></MyInput>
    </div>
  )
}

export default PostSortSearch
