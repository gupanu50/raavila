import { baseApi } from "../api";
import getRequest from "../getRequest";
import postCall from "../postCall";
const methods = 'payment_method';
const mode = 'get_payment_mode';
const onlinePayment = baseApi.injectEndpoints({endpoints:build =>({
    getPaymentMethods:getRequest(build,methods),
    paymentMode:postCall(build,mode)
}),
overrideExisting:false
})

export const {useLazyGetPaymentMethodsQuery,usePaymentModeMutation} = onlinePayment;