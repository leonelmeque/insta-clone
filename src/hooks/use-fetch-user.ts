import { useUser } from 'context/user-context'
import firebase from 'firebase'
import { getUser } from 'library/backend'
import { useEffect, useState } from 'react'


export const useFetchUser = (uid: string) => {
  const [userState, _] = useUser()
  const [state, setState] = useState<any | undefined>()

  if (userState.user.uid === uid) {
    return userState.user
  }

  const fetchUser = async () => {
    const results = await getUser(uid)
    setState(results)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return state
}