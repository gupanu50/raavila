import { baseApi } from '../api'
import getRequest from '../getRequest'
import postRequest from '../postCall'
const investment = "investment_type"
const plansListing = 'investment_plan'
const pinCode = 'verify_pincode'
const userInvest = 'user_investment'
const cashCollection = 'invest_cash_collection'
const validateInterprise = 'validate_enterprise'
const investOffer = 'investment_offer'
const buyInvestOffer = 'user_investment_offer'
const myInvestments = 'my_investment'
const verifyOtp = 'invest_cashCollect_otp_verify'
const totalInvestment = 'my_total_investment'
const investmentReports = 'investment_report'
const infoApp = baseApi.injectEndpoints({
    endpoints: build => ({
      getInvestmentType: getRequest(build, investment),
      getPlanByType:postRequest(build,plansListing),
      getVerifyPinCode:postRequest(build,pinCode),
      getUserInvest:postRequest(build,userInvest),
      getCashCollect:postRequest(build,cashCollection),
      validateInterprise:postRequest(build,validateInterprise),
      investmentOffer:getRequest(build,investOffer),
      purchaseInvestmentOffer:postRequest(build,buyInvestOffer),
      getMyInvestments:getRequest(build,myInvestments),
      investOtpVerify:postRequest(build,verifyOtp),
      totalInvestment:getRequest(build,totalInvestment),
      getInvestReport:postRequest(build,investmentReports),
    }),
    overrideExisting: true,
  })
  export const {
      useGetInvestmentTypeQuery,
      useGetPlanByTypeMutation,
      useGetPlanByTypeQuery,
      useGetVerifyPinCodeMutation,
      useGetUserInvestMutation,
      useGetCashCollectMutation,
      useValidateInterpriseMutation,
      useLazyInvestmentOfferQuery,
      usePurchaseInvestmentOfferMutation,
      useLazyGetMyInvestmentsQuery,
      useInvestOtpVerifyMutation,
      useLazyTotalInvestmentQuery,
      useGetInvestReportMutation
  } = infoApp;
