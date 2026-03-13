import React,{createContext,useContext,useRef} from 'react'
import {jwtDecode} from "jwt-decode"
import { getToken, subscribe } from './api/tokenStore'
const AuthContext=createContext("")
const AuthProvider = ({children}) => {
  const Auth = useRef("")
  subscribe(()=>{Auth.current=getToken()})
  return (
    <AuthContext.Provider value={{Auth}}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth=()=>{
  return useContext(AuthContext)
}

export default AuthProvider
export {useAuth,AuthContext}