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
  baseURL: 'https://api.codee.buzz',
  timeout: 20000,
  withCredentials: true,
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (
      error?.config?.url !== '/auth/check-session/user' &&
      error?.config?.url !== '/auth/login/user' &&
      (error?.response?.status === 403 || error?.response?.status === 401)
    ) {
      window.location.replace('/login')
    }

    return Promise.reject(error)
  },
)

export const configAuthorization = (token?: string) => {
  const jwtToken = token || Cookies.get('accessToken')
  instance.interceptors.request.use(config => {
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`
    }
    return config
  })
}
