/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios'
// import md5 from 'md5'

// const { VITE_API_URL, VITE_PUBLIC_KEY, VITE_PRIVATE_KEY } = import.meta.env

// const ts = Number(new Date())
// const hash = md5(ts + VITE_PRIVATE_KEY + VITE_PUBLIC_KEY)

// export const api = axios.create({
//   baseURL: VITE_API_URL,
//   params: {
//     ts,
//     apikey: VITE_PUBLIC_KEY,
//     hash,
//     limit: 10, // TODO passar por PROPS para manipular
//     offset: 10, // TODO passar por PROPS para manipular
//   },
// })

import axios, { AxiosResponse } from 'axios'
import md5 from 'md5'

const { VITE_API_URL, VITE_PUBLIC_KEY, VITE_PRIVATE_KEY } = import.meta.env

const getMarvelHash = (ts: number) =>
  md5(ts + VITE_PRIVATE_KEY + VITE_PUBLIC_KEY)

export const fetchMarvelData = async (
  endpoint: string,
  queryParams?: Record<string, any>
): Promise<AxiosResponse<any>> => {
  const ts = Number(new Date())
  const hash = getMarvelHash(ts)

  const response = await axios.get(`${VITE_API_URL}/${endpoint}`, {
    params: {
      ts,
      apikey: VITE_PUBLIC_KEY,
      hash,
      ...queryParams,
    },
  })

  return response
}
