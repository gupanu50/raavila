import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'complete_profile'
export const registerApi = baseApi.injectEndpoints({
  endpoints: build => ({
    registerUser: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useRegisterUserMutation } = registerApi