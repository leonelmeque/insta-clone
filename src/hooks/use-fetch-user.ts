import { useUser } from 'context/user-context'
import { fetchUserInfo, getUser } from 'library/backend'
import { useEffect, useState } from 'react'

export const useFetchUser = (uid: string, shouldRefresh: boolean) => {
  const [userState, _] = useUser()
  const [state, setState] = useState<{ uid: string, [key: string]: any } | undefined>()

  const fetchUser = async () => {
    const id = uid === undefined ? userState?.user?.uid : uid
    const user = await getUser(id as string)
    const userInfo = await fetchUserInfo(id)

    setState({
      uid: id as string,
      ...user,
      ...userInfo
    })
  }

  useEffect(() => {
    fetchUser()
  }, [uid, shouldRefresh])

  return state
}