import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'support_details'
export const supportDetails = baseApi.injectEndpoints({
  endpoints: build => ({
    supportDetails: postRequest(build,path),
  }),
  overrideExisting: true,
})

export const { useSupportDetailsMutation } = supportDetails