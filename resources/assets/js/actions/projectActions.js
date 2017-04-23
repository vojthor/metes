import Project from "../models/Project.js"

export function loadProjectSuccess(projects) {
  return {type: "LOAD_PROJECTS_SUCCESS", projects};
}

export function getProjectsAll(userId) {
  return function (dispatch) {
    return Project.getAll(userId).then(response => {
      dispatch(loadProjectSuccess(response.projects));
    }).catch(error => {
      throw(error);
    });
  };
}