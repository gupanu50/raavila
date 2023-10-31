// import { Config } from '@/Config'
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { purgeStore, RootState } from '../store/store'
import { setCredentials } from './auth/authSlice';
const authBaseUrl = "https://demo41.iitpl.com/api/"

const prepareHeaders = (headers: any, { getState }: any) => {
  // By default, if we have a token in the store, let's use that for authenticated requests
  const token = (getState() as RootState).auth.token
  console.log("Predefined Token",token)

  //const token = ""
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
    // +==============================================
    // headers['Authorization'] = `Bearer ${token}`;
    // headers['Content-Type'] = 'multipart/form-data';

    //('Content-Type','multipart/form-data')
  }
  return headers
};
const baseQuery = fetchBaseQuery({ baseUrl: authBaseUrl , prepareHeaders:prepareHeaders  })

const baseQueryWithInterceptor = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions)
  console.log('==resultAPI==>',result);
  
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
    //@ts-ignore
    setCredentials({user:null,token:null,isSplash:false})

    
  }
  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})
