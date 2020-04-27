import * as types from "./actionTypes";

// Action creators. Must have 'type' property
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
