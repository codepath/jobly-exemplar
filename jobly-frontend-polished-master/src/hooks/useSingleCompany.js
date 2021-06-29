import { useState, useEffect, useCallback } from "react"
import { apiClient } from "services"

export const useSingleCompany = (handle) => {
  const [isFetching, setIsFetching] = useState(false)
  const [company, setCompany] = useState(null)
  const [error, setError] = useState(null)

  const fetchSingleCompany = useCallback(async () => {
    setIsFetching(true)

    if (!handle) {
      setError("No handle found.")
      setIsFetching(false)
      return
    }

    try {
      const { data, error } = await apiClient.fetchCompany(handle)

      if (error) {
        setError(error)
      } else {
        setCompany(data)
      }
    } catch (err) {
      setError(err)
    } finally {
      setIsFetching(false)
    }
  }, [handle])

  useEffect(() => {
    fetchSingleCompany()
  }, [fetchSingleCompany])

  return { company, isFetching, error, fetchSingleCompany }
}
