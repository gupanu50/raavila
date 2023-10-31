import {baseApi} from '../api';
import getRequest from '../getRequest';
import postCall from '../postCall';
const committee = 'commitee_list';
const myCommittee = 'my_committee';
const otpVerify = 'committe_cash_otp_verify';
const infoCommittee = baseApi.injectEndpoints({
  endpoints: build => ({
    getCommitteeListing: getRequest(build, committee),
    getMyCommitteeListing: getRequest(build, myCommittee),
    committeeOtpVerify: postCall(build, otpVerify),
  }),
  overrideExisting: true,
});
export const {
  useGetCommitteeListingQuery,
  useLazyGetMyCommitteeListingQuery,
  useCommitteeOtpVerifyMutation,
} = infoCommittee;
