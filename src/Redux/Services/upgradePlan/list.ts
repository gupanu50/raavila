import { baseApi } from "../api";
import getRequest from "../getRequest";
const path = "upgrade_get_ravilaa_plans"
export const getUpgradeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    upgradeList: getRequest(build, path),
  }),
  overrideExisting: true,
})

export const {useLazyUpgradeListQuery} = getUpgradeApi;