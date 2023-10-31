import { baseApi } from '../api'
import getRequest from '../getRequest'
const path = 'cash_pickup_status'
const committeePath = 'committee_cash_pickup_status'
export const codStatus = baseApi.injectEndpoints({
  endpoints: build => ({
    codStatus: getRequest(build, path),
    committeeCodStatus: getRequest(build, committeePath)
  }),
  overrideExisting: true,
})

export const { useLazyCodStatusQuery, useLazyCommitteeCodStatusQuery } = codStatus;