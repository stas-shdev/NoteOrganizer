let token=null
const subscribeFunctions=[]
const subscribe=(handler)=>{
  subscribeFunctions.push(handler)
  return ()=>{subscribeFunctions.filter(func=>func!==handler)}
}
const setToken=(newToken)=>{
  token=newToken
  subscribeFunctions.forEach(handler=>{handler(newToken)})
}
const getToken=()=>{
  return token
}
export {setToken,getToken,subscribe}