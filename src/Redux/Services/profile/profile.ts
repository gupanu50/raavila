import { baseApi } from "../api";
import getProfile from "../getRequest";
import updateProfile from "../postCall"
const path = "get_profile"
const uPath = "update_profile"
export const getProfileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: getProfile(build, path),
    updateProfile:updateProfile(build,uPath),
  }),
  overrideExisting: true,
})
export const {useGetProfileQuery, useUpdateProfileMutation, useLazyGetProfileQuery} = getProfileApi;