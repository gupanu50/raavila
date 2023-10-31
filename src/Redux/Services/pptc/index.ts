import { baseApi } from '../api'
import getRequest from '../getRequest'
const privacy = "privacy_policy"
const terms  = "terms_conditions"
const aboutUs = "about_us"
 const infoApp = baseApi.injectEndpoints({
  endpoints: build => ({
    getPrivacy: getRequest(build, privacy),
    getTerms:getRequest(build,terms),
    getAboutUs:getRequest(build,aboutUs)
  }),
  overrideExisting: false,
})
export const {
    useGetPrivacyQuery, 
    useGetTermsQuery,
    useGetAboutUsQuery
} = infoApp;