import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from "./api/api.js"
import { useNavigate } from 'react-router-dom'
import GroupManager from './components/GroupManager.jsx'
import useFetching from './useFetching.js'
import MyModalWindow from './components/UI/ModalWindow.jsx/MyModalWindow.jsx'
import MyInput from './components/UI/MyInput/MyInput.jsx'
import MyButton from './components/UI/MyButton/MyButton.jsx'
import MyLoadingSign from './components/UI/LoadingSign/MyLoadingSign.jsx'
const Group = () => {
  const idGroup = useParams().id
  const [groupInfo, setGroupInfo] = useState('')
  const navigate = useNavigate()
  const getGroupInfo = async () => {
    try {
      const response = await api.get(`/group?id=${idGroup}`)
      console.log(response)
      setGroupInfo(response.data)
    } catch (err) {
      console.log(err)
      if (err.response?.status == 404) {
        setGroupInfo(404)
      } else if (err?.response?.status == 401) {
        navigate('/')
      } else {
        navigate('/App')//ToDo: solve problem with 404 error catching
      }
    }
  }
  const [LoadGroupInfo, isInfoLoad, errorLoad] = useFetching(getGroupInfo)
  useEffect(() => {
    setGroupInfo('')
    LoadGroupInfo()
  }, [idGroup])

  const deleteUserFromGroupFunc = async (userId, groupId) => {
    api.delete(`/usersGroups?userId=${userId}&groupId=${groupId}`)
    setGroupInfo({ ...groupInfo, users: groupInfo.users.filter(elem => elem.userId !== userId) })
  }

  const [editTitleGroup, setEditTitleGroup] = useState('');
  const [groupEditFlag, setGroupEditFlag] = useState("none")

  const startEditGroup = (groupTitle) => {
    setGroupEditFlag("flex");
    setEditTitleGroup(groupTitle)
  };
  const completeEditGroup = () => {
    setGroupInfo({ ...groupInfo, groupTitle: editTitleGroup })
    setGroupEditFlag("none");
    api.put(`/group`, { group_id: groupInfo.groupId, group_title: editTitleGroup, })
  }
  const [deleteFlag, setDeleteFlag] = useState('none')
  const deleteGroup = async (idForDelete) => {
    await api.delete(`/group?id=${idForDelete}`)
    navigate('/App')
  }
  return (
    <div className="App">
      <MyModalWindow flag={groupEditFlag} setFlag={setGroupEditFlag}>
        <MyInput value={editTitleGroup} onChange={(e) => { setEditTitleGroup(e.target.value) }}></MyInput>
        <MyButton onClick={completeEditGroup}>Change title of group</MyButton>
      </MyModalWindow>
      <MyModalWindow flag={deleteFlag} setFlag={setDeleteFlag}>
        <div>Are you sure you want to delete the group <strong>"{groupInfo.groupTitle}"</strong>?</div>
        <MyButton onClick={() => { deleteGroup(groupInfo.groupId)}}>Yes, Delete it</MyButton>
        <MyButton onClick={() => { setDeleteFlag('none') }}>No, I don't wanna</MyButton>
      </MyModalWindow>
      <div>{errorLoad}</div>
      {isInfoLoad ? <MyLoadingSign>The Group is loading</MyLoadingSign> :
        groupInfo === 404
          ? <h1>Error 404</h1>
          : <GroupManager
            groupInfo={groupInfo}
            deleteUserFromGroupFunc={(userId, groupId) => { deleteUserFromGroupFunc(userId, groupId) }}
            startEditGroup={(title) => { startEditGroup(title) }}
            flag={groupEditFlag}
            setFlag={setGroupEditFlag}
            editTitleGroup={editTitleGroup}
            setEditTitleGroup={(title) => { setEditTitleGroup(title) }}
            setDeleteFlag={() => { setDeleteFlag('flex') }}
            navigate={navigate}>
          </GroupManager>}
    </div>
  )
}

export default Group
