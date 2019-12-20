import { axiosAPI } from '../_helpers'

export const authService = { login, register, logout }

/**
 * The login function
 * @param {String} username - the client username
 * @param {String} password - the client password
 */
function login (username, password) {
  return axiosAPI
    .post('/users/login', { username: username, password: password })
    .then(response => {
      if (response.success === true) return true
      return false
    })
    .catch(err => {
      console.error('err: ', err)
      return false
    })
}

/**
 * The register function
 * @param {String} username - the client username
 * @param {String} email - the client email
 * @param {String} password - the client password
 */
function register (username, email, password) {
  return axiosAPI
    .post('/users/register', { username: username, email: email, password: password })
    .then(response => {
      return true
    })
    .catch(err => {
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
