import {fetchAPI} from "../utils/http.js";

export default class Admin {

  /**
   * Return all projects for user
   *
   * @param userId
   * @returns {Promise}
   */
  static getUsers() {
    return fetchAPI("admin/users", {
      method: "get",
    });
  }

  /**
   * Return set role to user
   *
   * @param userId
   * @returns {Promise}
   */
  static setRole(data) {
    console.log(data);
    return fetchAPI("admin/set-role", {
      method: "post",
      body: data
    });
  }
}
