import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'user_purchase_commitee'
export const committeePurchase = baseApi.injectEndpoints({

    endpoints: build => ({
        committeePurchase: postRequest(build, path),
    }),
    overrideExisting: false,
})

export const { useCommitteePurchaseMutation } = committeePurchase