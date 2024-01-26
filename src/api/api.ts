import axios from 'axios'
import md5 from 'md5'

const { VITE_API_URL, VITE_PUBLIC_KEY, VITE_PRIVATE_KEY } = import.meta.env

const ts = Number(new Date())
const hash = md5(ts + VITE_PRIVATE_KEY + VITE_PUBLIC_KEY)

export const api = axios.create({
  baseURL: VITE_API_URL,
  params: {
    ts,
    apikey: VITE_PUBLIC_KEY,
    hash,
    limit: 10, // TODO passar por PROPS para manipular
    offset: 10, // TODO passar por PROPS para manipular
  },
})
