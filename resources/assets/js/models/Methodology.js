import {fetchAPI} from "../utils/http.js";

export default class Methodology {


  /**
   * @returns {Promise}
   */
  static getAll() {
    return fetchAPI("methodologies/", {
      method: "get",
    });
  }

  static getById(id) {
    return fetchAPI(`methodologies/${id}`, {
      method: "get",
    });
  }

  static create(data) {
    return fetchAPI("methodologies", {
      method: "post",
      body: data,
    });
  }

  static edit(data, id = null) {
    console.log('calling all cars, we got another victim');
    return fetchAPI(`methodologies/${id}`, {
      method: "post",
      body: data,
    });
  }


}