import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'user_purchase_plan'
export const purchaseApi = baseApi.injectEndpoints({
  endpoints: build => ({
    purchasePlan: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { usePurchasePlanMutation } = purchaseApi;