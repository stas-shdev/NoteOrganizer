import React,{useRef, useState,useContext} from 'react'
import {BrowserRouter, Link, useNavigate} from "react-router-dom"
import MyModalWindow from "./components/UI/ModalWindow.jsx/MyModalWindow";
import MyInput from './components/UI/MyInput/MyInput';
import MyButton from './components/UI/MyButton/MyButton';
import axios from "axios"
import {useAuth} from './AuthProvider'
const HomePage = () => {
  const api=axios.create({baseURL: process.env.REACT_APP_API_URL, withCredentials: true})
  const [flag,setFlag]=useState("none")
  const [createdAccountFlag,setCreatedAccountFlag]=useState("none")
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [usernameCreate,setUsernameCreate]=useState("")
  const [passwordCreate,setPasswordCreate]=useState("")
  const navigate=useNavigate()
  const {Auth}=useAuth()
  const logInRequest=(username,password)=>{
    api.post("/login",{username:username,password:password})
      .then(response => response.data)
      .then(data=>{
        if (data.succes===true) {api.post("/refresh").then(response=>response.data).then( data=>{Auth.current=data}).catch(err=>{throw new Error(err)});navigate('/App'); setFlag("none"); console.log(Auth)} else {console.log("password is incorrect or account dont existing")}
      })
      .catch(err=>{console.log(err)})
  }
  const createAccRequest=(username,password)=>{
    api.post("/createAccount",{username:username, password:password})
      .then(response=>{console.log(response.data); setCreatedAccountFlag("none")})//ToDo:  Add check of request
  }
  const actualTimerId=useRef("")
  const [usernameData,setUsernameData]=useState({isUsable: false, message:""})
  const createCheckTimer=(value,time)=>{
    setTimeout(()=>{
      if (value==actualTimerId.current) {
        api.post("/checkName",{checkedUsername: value}).then(res=>res.data).then(data=>{setUsernameData(data); console.log(data.message)})
      }
    },time)
  }
  return (
    <div style={{"text-align": "center"}}>
      <MyModalWindow setFlag={setFlag} flag={flag}>
        <MyInput value={username} onChange={(e)=>{setUsername(e.target.value)}}></MyInput>
        <MyInput value={password} onChange={(e)=>{setPassword(e.target.value)}}></MyInput>
        <MyButton onClick={()=>{logInRequest(username,password)}}>Log In</MyButton>
      </MyModalWindow>
      <MyModalWindow setFlag={setCreatedAccountFlag} flag={createdAccountFlag}>
        <MyInput value={usernameCreate} onChange={(e)=>{setUsernameCreate(e.target.value);actualTimerId.current=e.target.value;createCheckTimer(e.target.value,1000)}}></MyInput>
        <div style={usernameData.isUsable? {"color":"green"}: {"color": "red"}}>{usernameData.message}</div>
        <MyInput value={passwordCreate} onChange={(e)=>{setPasswordCreate(e.target.value)}}></MyInput>
        <MyButton onClick={async ()=>{await createAccRequest(usernameCreate,passwordCreate)}}>CreateAccount</MyButton>
      </MyModalWindow>
      <h1>Hello!</h1>
      <span>This is a home page of my project "NoteOrganizer"</span>
      <br/>
      <span>Here is a link to Github repository of this project: <a target="_blank" style={{"color":"rgb(17, 71, 185)"}} href='https://github.com/stas-shdev/NoteOrganizer'>NoteOrganizer</a></span>
      <br/>
      <span>And here is link to main part of this app: </span>
      <Link to={"/App"} style={{"color":"rgb(17, 71, 185)"}}>Go to App</Link>
      <br/>
      <span>In the future, this page also will be navigating users to login page</span>
      <br/>
      <span>(This page was created to test how library "React-Router" works in development and production)</span>
      <br/>
      <MyButton onClick={()=>{setFlag("flex")}}>Log In</MyButton>
      <MyButton onClick={()=>{setCreatedAccountFlag("flex")}}>Create Account</MyButton>
    </div>
  )
}

export default HomePage
