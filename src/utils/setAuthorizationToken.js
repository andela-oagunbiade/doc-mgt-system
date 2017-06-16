import axios from 'axios';

/**
 * Set Authorization Token to be used for API requests
 *
 * @export function for use as module
 * @param {any} token
 * @returns {any} no return
 */
function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export default setAuthorizationToken;
