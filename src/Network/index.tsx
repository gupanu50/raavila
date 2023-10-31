import SharedManager from "@/Common/SharedManager.tsx";
import axios, { AxiosResponse } from 'axios';
import { URIS } from '@/Configration'
import { ResponseModel } from 'types'

//===================== Headers =========================//
const instance = axios.create({
    baseURL: URIS.DEVELOPMENT,
    timeout: 15000,
    headers: {
        // @ts-ignore
        Authorization: 'Bearer ' + SharedManager.getInstance().getToken(),
        'Content-Type': 'application/json'
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const method = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
    // put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
    // delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Service = {
    getHistory: (api: string): Promise<ResponseModel> => method.get(api),
    getProfile: (api: string, request: any): Promise<ResponseModel> => method.get(`${api}/${request}`),
    userLogin: (api: string, body: any): Promise<ResponseModel> => method.post(api, body),
    // updatePost: (api: string, post: any, id: number): Promise<any> => method.put(`${api}/${id}`, post),
    // deletePost: (api: string, id: number): Promise<void> => method.delete(`${api}/${id}`),
};