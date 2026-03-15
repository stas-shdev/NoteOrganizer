import { useState } from "react"


const useFetching = (callback) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetching = async (...params) => {
    try {
      setLoading(true)
      return await callback(...params)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }; return [fetching, isLoading, error]
}
export default useFetching