import axios from 'axios'

export const axiosAPI = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3001',
  withCredentials: true,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
})
