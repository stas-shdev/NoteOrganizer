import { useState } from "react"


const useFetching = (callback) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetching = async () => {
    try {
      setLoading(true)
      return await callback()
    } catch (err) {
      setError(err.message)
    } finally {
      // setLoading(false)
    }
  }; return [fetching, isLoading, error, () => { setLoading(false) }]
}
export default useFetching