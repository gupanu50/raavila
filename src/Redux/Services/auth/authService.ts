import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'login_with_other'
export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: postRequest(build,path),
  }),
  overrideExisting: true,
})

export const { useLoginMutation} = userApi