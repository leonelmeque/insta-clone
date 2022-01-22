import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "redux/store"

interface UserState<T={}> {
    currentUser: T | null
}

const initUserState: UserState = {
    currentUser: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        add: (state, action:PayloadAction<UserState>) => {
            state.currentUser = action.payload.currentUser
        }
    }
})


export const {add} = userSlice.actions

export const selectUser = (state:RootState) => state.user.currentUser