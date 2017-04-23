import {fetchAPI} from "../utils/http.js";

export default class Project {

  /**
   * Return all projects for user
   *
   * @param userId
   * @returns {Promise}
   */
  static getAll(userId) {
    return fetchAPI("users/" + userId + "/projects", {
      method: "get",
    });
  }
  static getAllEval(userId) {
    return fetchAPI("users/" + userId + "/projects/evaluations", {
      method: "get",
    });
  }

  static remove(userId, projectId) {
    return fetchAPI("users/" + userId + "/projects/" + projectId, {
      method: "delete"
    });
  }

  static getById(userId, projectId) {
    return fetchAPI("users/" + userId + "/projects/" + projectId, {
      method: "get",
    });
  }

  static update(userId, projectId, data) {
    return fetchAPI("users/" + userId + "/projects/" + projectId, {
      method: "put",
      body: data,
    });
  }

  static create(userId, data) {
    return fetchAPI("users/" + userId + "/projects", {
      method: "post",
      body: data,
    });
  }

  static getCriteriaValues(userId, projectId) {
    return fetchAPI("users/" + userId + "/projects/" + projectId + "/project-criteria", {
      method: "get",
    });
  }

  static setCriteriaValues(userId, projectId, data) {
    return fetchAPI("users/" + userId + "/projects/" + projectId + "/project-criteria", {
      method: "put",
      body: data
    });
  }

  static createCriteriaValues(userId, projectId, data) {
    return fetchAPI("users/" + userId + "/projects/" + projectId + "/project-criteria", {
      method: "post",
      body: data
    });
  }
}
