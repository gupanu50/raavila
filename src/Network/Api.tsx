import { Service } from '@/Network';
import * as Config from '@/Configration'

export default {
    //===================Login API ============================//
    loginApi: async (data: any) => {
        const response = await Service.userLogin(Config.URL_ENDPOINTS.LOGIN, data)
        return response
    },
};