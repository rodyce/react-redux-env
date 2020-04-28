import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

// Action creators. Must have 'type' property
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  // Redux thunk injects dispatch so we do not have to.
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}
