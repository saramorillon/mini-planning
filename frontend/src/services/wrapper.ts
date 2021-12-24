import axios, { AxiosError, AxiosRequestConfig } from 'axios'

function handleError<T>(error: AxiosError, defaultValue: T) {
  if (error.response?.status === 401) {
    window.location.reload()
  } else {
    console.error(error)
  }
  return defaultValue
}

export async function request<T>(config: AxiosRequestConfig, defaultValue: T): Promise<T> {
  return axios
    .request<T>({ ...config, withCredentials: true })
    .then((res) => res.data)
    .catch((error) => handleError(error, defaultValue))
}
