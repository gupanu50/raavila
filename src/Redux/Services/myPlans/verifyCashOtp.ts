import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'cashCollect_otp_verify'
export const verifyCash = baseApi.injectEndpoints({
   
  endpoints: build => ({
    verifyCashOtp: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useVerifyCashOtpMutation} = verifyCash