import { useUser } from 'context/user-context'
import { getUser } from 'library/backend'
import { useEffect, useState } from 'react'


export const useFetchUser = (uid: string) => {
  const [userState, _] = useUser()
  const [state, setState] = useState<{uid:string, [key:string]: any} | undefined>()

  const fetchUser = async () => {
    const id = uid === undefined ? userState?.user?.uid : uid
    const results = await getUser(id)
    setState({
      uid:id,
      ...results
    })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return state
}