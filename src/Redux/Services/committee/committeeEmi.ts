import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'user_pay_commitee_emi'
export const committeePurchaseEmi = baseApi.injectEndpoints({
    endpoints: build => ({
        committeePurchaseEmi: postRequest(build, path),
    }),
    overrideExisting: false,
})

export const { useCommitteePurchaseEmiMutation } = committeePurchaseEmi