import { paths } from '@/generated/schema'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

export type Path = keyof paths

type PathMethod = 'delete' | 'get' | 'patch' | 'post' | 'put'

export const callAPI = <P extends Path, M extends PathMethod>(
  url: P,
  method: M,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  return instance.request({
    url,
    method: method as string,
    ...config,
  })
}

export type Pagination = {
  pageNumber: number
  pageSize: number
  totalPage: number
  totalRecord: number
}

export type AxiosResponseError = { message: string }

export const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:8080'
      : 'https://api.example.com',
  timeout: 20000,
  withCredentials: true,
})

export const configAuthorization = (token?: string) => {
  const jwtToken = token || Cookies.get('accessToken')
  instance.interceptors.request.use(config => {
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`
    }
    return config
  })
}
