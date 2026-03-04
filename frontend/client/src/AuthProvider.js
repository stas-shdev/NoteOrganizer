import React,{createContext,useContext,useRef} from 'react'
import {jwtDecode} from "jwt-decode"
const AuthContext=createContext("")
const AuthProvider = ({children}) => {
  const Auth = useRef("")
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