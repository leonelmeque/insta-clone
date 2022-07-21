import { useUser } from 'context'
import { fetchUserPosts } from 'library/backend'
import { useEffect, useState } from 'react'

export const usefetchUserPosts = (uid:string) => {
  const [userState, _] = useUser()
  const [state, setState] = useState<any | []>([])

  const fetchPosts = async () => {
     const result = await fetchUserPosts(uid || userState.user?.uid as string)
     setState(result)
  }

  useEffect(()=>{
    fetchPosts()
  },[])

  return state
}