import * as types from "../actions/actionTypes";

export default function authorReducer(state = [], action) {
  // Note. It would be better to store courses by ID in a map...
  // For faster lookups.
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      // IMPORTANT!
      return state;
  }
}
