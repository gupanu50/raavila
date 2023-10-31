import {baseApi} from '../api';
import getRequest from '../getRequest';
import postRequest from '../postCall';
const offers = 'loan_offer';
const myloan = 'my_loan_list';
const apply = 'loan_request';
const requestLoan = 'my_requested_loan_list';
const infoApp = baseApi.injectEndpoints({
  endpoints: build => ({
    getLoanOffers: getRequest(build, offers),
    getMyLoans: getRequest(build, myloan),
    applyLoan: postRequest(build, apply),
    requestLoan: getRequest(build, requestLoan),
  }),
  overrideExisting: true,
});
export const {
  useLazyGetLoanOffersQuery,
  useLazyGetMyLoansQuery,
  useApplyLoanMutation,
  useLazyRequestLoanQuery,
} = infoApp;
