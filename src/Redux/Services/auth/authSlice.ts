import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { User } from './service'
import type { RootState } from '../../store/store';


interface User  {
   id:string
   name :string
}

type AuthState = {
  user: User | null
  token: string | null
  isSplash:boolean | undefined
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null ,isSplash:true } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token , isSplash } }: PayloadAction<{ user: User; token: string , isSplash:boolean }>
    ) => {
      console.log("user info:",user, token, isSplash)
      state.user = user
      state.token = token
      state.isSplash = isSplash;
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) =>{ 
  //console.log("=======State of app=====\n{",state ,"}===============\n\n")
  return state.auth.user
}