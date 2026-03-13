import React,{useRef, useState,useContext} from 'react'
import {BrowserRouter, Link, useNavigate, useSearchParams} from "react-router-dom"
import MyModalWindow from "./components/UI/ModalWindow.jsx/MyModalWindow";
import MyInput from './components/UI/MyInput/MyInput';
import MyButton from './components/UI/MyButton/MyButton';
import api from './api/api.js'
import { setToken } from './api/tokenStore';

const HomePage = () => {
  const [flag,setFlag]=useState("none")
  const [createdAccountFlag,setCreatedAccountFlag]=useState("none")
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [usernameCreate,setUsernameCreate]=useState("")
  const [passwordCreate,setPasswordCreate]=useState("")
  const navigate=useNavigate()

  const [searchedParams]=useSearchParams()
  const [loginState, setLoginState]=useState('')
  const logInRequest=async (username,password)=>{
    const loginResult=await api.post("/login",{username:username,password:password})
    const loginData=loginResult.data
    if (loginData.succes==true) {
      const responseAuth=await api.post("/refresh");
      setToken(responseAuth.data)
      await api.post("/joingroup",{inviteToken: searchedParams.get("invite")});
      navigate('/App'); 
      setFlag("none");
    }
    else {setLoginState("password is incorrect or account dont existing")}
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
        <form onSubmit={(e)=>{e.preventDefault()}}>
          <MyInput value={username} onChange={(e)=>{setUsername(e.target.value)}} name={"username"} autoComplete={"username"} placeholder={"Username"}></MyInput>
          <MyInput value={password} onChange={(e)=>{setPassword(e.target.value)}} name={"password"} type={"password"} autoComplete={'current-password'} placeholder={"Password"}></MyInput>
          <MyButton type={"submit"} onClick={()=>{logInRequest(username,password);setUsername('');setPassword('')}}>Log In</MyButton>
          <div style={{color: "red"}}>{loginState}</div>
        </form>
      </MyModalWindow>
      <MyModalWindow setFlag={setCreatedAccountFlag} flag={createdAccountFlag}>
        <form onSubmit={async (e)=>{
          e.preventDefault()
          await createAccRequest(usernameCreate,passwordCreate); 
          setUsernameCreate('');
          setPasswordCreate('')
          }}>
          <MyInput value={usernameCreate} onChange={(e)=>{setUsernameCreate(e.target.value);actualTimerId.current=e.target.value;createCheckTimer(e.target.value,1000)}} name={"username"} autoComplete={"username"} placeholder={"Username"}></MyInput>
          <div style={usernameData.isUsable? {"color":"green"}: {"color": "red"}}>{usernameData.message}</div>
          <MyInput value={passwordCreate} onChange={(e)=>{setPasswordCreate(e.target.value)}} name={"password"} type={"password"} autoComplete={'new-password'} placeholder={"Password"}></MyInput>
          <MyButton type="submit">CreateAccount</MyButton>
        </form>
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
