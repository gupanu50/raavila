import { baseApi } from "../api";
import getRequest from "../getRequest";
import postCall from "../postCall";
const contactInfo = 'contact_info';
const form = 'contact-us'

const contactUs = baseApi.injectEndpoints({
    endpoints: build => ({
        contactInformation:getRequest(build,contactInfo),
        contactform:postCall(build,form)
    }),
    overrideExisting: true,
})

export const {useLazyContactInformationQuery,useContactformMutation} = contactUs