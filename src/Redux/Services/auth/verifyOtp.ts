import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'verify_otp'
export const userApi = baseApi.injectEndpoints({
   
  endpoints: build => ({
    verifyOtp: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useVerifyOtpMutation} = userApi