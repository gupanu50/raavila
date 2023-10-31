import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'commitee_cash_collection'
export const codCommitteeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    codCommitteeApi: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useCodCommitteeApiMutation } = codCommitteeApi