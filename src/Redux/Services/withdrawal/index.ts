import {baseApi} from '../api';
import getRequest from '../getRequest';
import postCall from '../postCall';
const accounts = 'withdrawal_account';
const request = 'withdrawal_request';
const history = 'withdrawal_history';
const withdrawal = baseApi.injectEndpoints({
  endpoints: build => ({
    getAccounts: getRequest(build, accounts),
    makeWithdrawal: postCall(build, request),
    withdrawalStatus: getRequest(build, history),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAccountsQuery,
  useMakeWithdrawalMutation,
  useLazyWithdrawalStatusQuery,
} = withdrawal;
