import { axiosAPI as fakeAxiosAPI } from './'
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(fakeAxiosAPI, { delayResponse: 0 })

// mock requests : https://www.npmjs.com/package/axios-mock-adapter

// Mock authentication request
mock.onPost('/users/authenticate', { username: 'Test', password: 'Test' })
  .reply(200, {
    token: 'good auth'
  })

mock.onPost('/users/authenticate')
  .reply(401, {
    token: 'wrong auth'
  })

// Mock register request
mock.onPost('/users/signup', { username: 'Test', password: 'Test' })
  .reply(200, {
    token: 'good signup'
  })

mock.onPost('/users/signup')
  .reply(500, {
    token: 'wrong signup'
  })

export default fakeAxiosAPI
