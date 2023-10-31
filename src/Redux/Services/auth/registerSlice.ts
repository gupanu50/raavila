import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { User } from './service'
import type { RootState } from '../../store/store';

type registerState = {
  user: string | null
}

const slice = createSlice({
  name: 'register',
  initialState: { user: null } as registerState,
  reducers: {
    setRegisterUser: (
      state,
      { payload: { user } }: PayloadAction<{ user:string|any}>
    ) => {
      console.log("register user info:",user)
      state.user = user
    },
  },
})

export const { setRegisterUser } = slice.actions

export default slice.reducer

export const selectRegisterUser = (state: RootState) =>{ 
  //console.log("=======State of app=====\n{",state ,"}===============\n\n")
  return state.auth.user
}