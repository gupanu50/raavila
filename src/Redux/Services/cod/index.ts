import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'plan_cash_collection'
export const codApi = baseApi.injectEndpoints({
  endpoints: build => ({
    codApi: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useCodApiMutation } = codApi