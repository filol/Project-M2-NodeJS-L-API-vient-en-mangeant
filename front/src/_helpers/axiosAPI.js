import axios from 'axios'

export const axiosAPI = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
})

// axios.defaults.headers.post['header1'] = 'value' // for POST requests
