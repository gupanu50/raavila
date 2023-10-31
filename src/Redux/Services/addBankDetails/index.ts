import { baseApi } from "../api";
import postRequest from '../postCall'
const path = 'add_bank_details'
export const bankApi = baseApi.injectEndpoints({
   
  endpoints: build => ({
    addBankDetail: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useAddBankDetailMutation} = bankApi