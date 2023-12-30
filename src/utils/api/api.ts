import axios from "axios";
import Cookies from 'js-cookie';
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

export enum TypeHTTP {
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    GET = 'get'
}

export interface APIType {
    path: string
    body?: any
    type: TypeHTTP
}

export const api = ({ path, body, type }: APIType) => {
    const user_id = Cookies.get('user_id')
    const accessToken = Cookies.get('accessToken')
    const privateKey = Cookies.get('privateKey')
    const refreshToken = Cookies.get('refreshToken')
    return new Promise((rejects, resolve) => {
        switch (type) {
            case TypeHTTP.GET:
                axios.get(path, { headers: { user_id, accessToken, privateKey, refreshToken } })
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response.status, message: res.response.data.message })
                    })
                break
            case TypeHTTP.POST:
                axios.post(path, body, { headers: { user_id, accessToken, privateKey, refreshToken } })
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response.status, message: res.response.data.message })
                    })
                break
            case TypeHTTP.DELETE:
                axios.delete(path, { headers: { user_id, accessToken, privateKey, refreshToken } })
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response.status, message: res.response.data.message })
                    })
                break
        }
    })
}