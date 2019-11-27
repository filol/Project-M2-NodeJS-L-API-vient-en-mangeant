import axios from 'axios'

export const axiosAPI = axios.create({
  baseURL: 'todo',
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
})

// axios.defaults.headers.post['header1'] = 'value' // for POST requests
