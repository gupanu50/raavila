import { baseApi } from '../api'
import getRequest from '../getRequest'
const path = 'invest_cash_pickup_status'
export const codInvestmentStatus = baseApi.injectEndpoints({
  endpoints: build => ({
    codInvestmentStatus: getRequest(build, path),
  }),
  overrideExisting: true,
})

export const { useLazyCodInvestmentStatusQuery } = codInvestmentStatus;