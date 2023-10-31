import { baseApi } from '../api'
import getRequest from '../getRequest'
const requestStatusPath = "my_support_list"
const requestStatus = baseApi.injectEndpoints({
    endpoints: build => ({
      requestStatusSupport: getRequest(build, requestStatusPath),
    }),
    overrideExisting: true,
  })
  export const {
      useLazyRequestStatusSupportQuery } = requestStatus;
