import axios from "axios";
import useSWR from 'swr'
axios.defaults.baseURL = 'https://qilearn-be.vercel.app'
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
    return new Promise((rejects, resolve) => {
        switch (type) {
            case TypeHTTP.GET:
                axios.get(path)
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response.status, message: res.response.data.message })
                    })
                break
            case TypeHTTP.POST:
                axios.post(path, body)
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response.status, message: res.response.data.message })
                    })
                break
            case TypeHTTP.DELETE:
                axios.delete(path, body)
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