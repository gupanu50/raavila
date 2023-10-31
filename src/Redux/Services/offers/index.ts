/**
 * 
 * **/
import { baseApi } from '../api'
import getOffers from '../getRequest'
const path = "offers"

export const getOffersApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getOffers: getOffers(build, path),
  }),
  overrideExisting: false,
})
const {useLazyGetOffersQuery} = getOffersApi;