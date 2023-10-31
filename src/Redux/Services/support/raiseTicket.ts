import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'support'
export const supportRaiseTicket = baseApi.injectEndpoints({
  endpoints: build => ({
    supportRaiseTicket: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useSupportRaiseTicketMutation } = supportRaiseTicket