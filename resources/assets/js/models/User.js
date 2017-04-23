import {fetchAPI} from "../utils/http.js";

export default class User {
  /**
   * @param {object} credentials
   * @returns {Promise}
   */
  static login(credentials) {
    return fetchAPI("users/login", {
      method: "post",
      body: credentials,
    });
  }

  /**
   * @returns {Promise}
   */
  static logout() {
    return fetchAPI("users/logout", {
      method: "get",
    });
  }

  /**
   * @param {object} credentials
   * @returns {Promise}
   */
  static register(credentials) {
    return fetchAPI("users/register", {
      method: "post",
      body: credentials,
    });
  }

  /**
   * @returns {Promise}
   */
  static current() {
    return fetchAPI("users/current", {
      method: "get",
    });
  }

  /**
   * @returns {Promise}
   */
  static update(data) {
    return fetchAPI("users/save", {
      method: "post",
      body: data
    });
  }
}