import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'register'
export const userRegister = baseApi.injectEndpoints({
   
  endpoints: build => ({
    userRegister: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useUserRegisterMutation} = userRegister