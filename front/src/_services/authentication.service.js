import { fakeAxiosAPI } from '../_helpers'
// import { axiosAPI } from '../_helpers'

export const authService = { login, logout }

/**
 * The login function
 * @param {String} username - the client username
 * @param {String} password - the client password
 */
function login (username, password) {
  return fakeAxiosAPI.post('/users/authenticate', { username: username, password: password }).then(response => {
    console.log('response: ', response)
    return true
  }).catch(err => {
    console.error('err: ', err)
    return false
  })
}

/**
 * The logout function
 */
function logout () {
  // remove user from local storage to log user out
  //   localStorage.removeItem('user')
}

/* function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
} */
