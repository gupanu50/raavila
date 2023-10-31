import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'support_chat'
export const supportChat = baseApi.injectEndpoints({
  endpoints: build => ({
    supportChat: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useSupportChatMutation } = supportChat