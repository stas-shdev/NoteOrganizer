import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from './api/api.js'
import { useNavigate } from 'react-router-dom'
const InviteGroup = () => {
  const navigate=useNavigate()
  const id=useParams().id
  const [stateInvite,setStateInvite]=useState(false)
  const getInvited=async ()=>{
    try {
      const response = await api.post("/joingroup",{inviteToken: id})
      setStateInvite(response.data)
    } catch (err) {
      if (err.response.status===401) {
        navigate(`/?invite=${id}`)
      }
    }
  }
  useEffect(()=>{getInvited()},[id])
  return (
    <div>
      {!stateInvite?<div>invite is loading</div>:<div>invite is succesfull</div>}
      <div>{id.id}</div>
    </div>
  )
}

export default InviteGroup
