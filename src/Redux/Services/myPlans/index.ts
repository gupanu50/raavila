import { baseApi } from "../api";
import getRequest from "../getRequest";
const path = "my_plan"
export const getMyPlanApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMyPlan: getRequest(build, path),
  }),
  overrideExisting: true,
})
export const {useLazyGetMyPlanQuery, useGetMyPlanQuery} = getMyPlanApi;