import initialState from './initialState';

export default function projectReducer(state = initialState.projects, action) {
  switch(action.type) {
    case "LOAD_PROJECTS_SUCCESS":
      return Object.assign([], state, action.projects)
    default:
      return state;
  }
}