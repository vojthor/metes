import {fetchAPI} from "../utils/http.js";

export default class Evulation {


    /**
     * @returns {Promise}
     */
    static getAll(userId, projectId) {
        //http://metes.app/api/v1/users/1/projects/1/evaluations/
        return fetchAPI("users/" + userId + "/projects/" +projectId + "/evaluations", {
            method: "get",
        });
    }

    /**
     * @returns {Promise}
     */
    static getDetail(userId, projectId, evulationId) {
        //http://metes.app/api/v1/users/1/projects/1/evaluations/
        return fetchAPI("users/" + userId + "/projects/" +projectId + "/evaluations/" + evulationId, {
                method: "get",
        });
    }

    static evulation(userId, projectId) {
        return fetchAPI("users/" + userId + "/projects/" +projectId + "/evaluate/", {
            method: "get",
        });

    }


    /**
     * @param {object} data
     * @returns {Promise}
     */
    static add(data) {
        return fetchAPI("criteria/add", {
            method: "post",
            body: data,
        });
    }

}