import { baseApi } from "../api";
import getRequest from "../getRequest";
const path = "get-ravilaa-plans"
export const getRaavilaPlanApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getRaavilaPlan: getRequest(build, path),
  }),
  overrideExisting: true,
})
export const {useLazyGetRaavilaPlanQuery, useGetRaavilaPlanQuery} = getRaavilaPlanApi;