import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  // Note. It would be better to store courses by ID in a map...
  // For faster lookups.
  switch (action.type) {
    case types.CREATE_COURSE:
      // DO NOT USE: state.push(action.course). Mutation won't work.
      // Update store.
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      // Whatever is returned from a reducer becomes the new state.
      return action.courses;
    default:
      // IMPORTANT!
      return state;
  }
}
