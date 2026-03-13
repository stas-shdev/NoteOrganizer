import { setToken , getToken } from "./tokenStore"
import axios from "axios"
const api = axios.create({
  headers: { "Authorization": 'Bearer ' + getToken() },
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = 'Bearer ' + getToken()
  return config
})
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest.retrying) {
      originalRequest.retrying = true
      await api.post("/refresh").then(response => response.data).then(data => { setToken(data) }).catch(err => { throw new Error(err) })
      api.defaults.headers.common["Authorization"] = 'Bearer ' + getToken()
      originalRequest.headers["Authorization"] = 'Bearer ' + getToken()
      return api(originalRequest)
    } else if (error.response.status === 401 && originalRequest.retrying) { throw error }
  })

export default api