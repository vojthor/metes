import {fetchAPI} from "../utils/http.js";

export default class Criteria {


    /**
     * @returns {Promise}
     */
    static getAll() {
        return fetchAPI("criteria", {
            method: "get",
        });
    }

  /**
   * @returns {Promise}
   */
  static getAllEmpty() {
    return fetchAPI("criteria/allEmpty", {
      method: "get",
    });
  }


    /**
     * @returns {Promise}
     */
    static getById(id) {
        return fetchAPI("criteria/" + id, {
            method: "get",
        });
    }

}