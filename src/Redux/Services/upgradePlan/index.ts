import { baseApi } from '../api'
import postRequest from '../postCall'
const path = 'upgrade_plan'
export const upgradeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    upgradePlan: postRequest(build,path),
  }),
  overrideExisting: false,
})

export const { useUpgradePlanMutation } = upgradeApi