import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
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
