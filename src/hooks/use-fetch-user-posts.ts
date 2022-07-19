import { fetchUserPosts } from 'library/backend'
import { useEffect, useState } from 'react'

export const usefetchUserPosts = (uid:string) => {
  const [state, setState] = useState<any | []>([])

  const fetchPosts = async () => {
     const result = await fetchUserPosts(uid)
     setState(result)
  }

  useEffect(()=>{
    fetchPosts()
  },[])

  return state
}