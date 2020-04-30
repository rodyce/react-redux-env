import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse, // call saveCourse in our component will call function bound to dispatch in mapDispatchToProps
  history,
  ...props
}) {
  // Avoid using Redux for all state. Use plain React state for data
  // only one few components use. (such as form state)
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      // Only load courses when list is empty.
      loadCourses().catch((error) => alert("Loading courses failed: " + error));
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Loading authors failed: " + error));
    }
  }, [props.course]); // Note empty array here as a second argument.
  // Effect will run once when the component mounts

  function handleChange(event) {
    // This destructure avoids the event getting garbage collected
    // so that it is available within the nested setCourse callback.
    const { name, value } = event.target;

    // Use functional form of setState so I can safely set new state that
    // is based on the existing state.
    // Use computed property syntax. Ref property via variable.
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    // No need to set it back to false since we're going to redirect
    // to another page.
    setSaving(true);

    // This saveCourse function here is passed in on props,
    // so it is already bound to dispatch
    saveCourse(course).then(() => {
      toast.success("Course saved.");
      // We can use <Redirect> or history to redirect.
      // Note that 'history' is being passed on props. React Router adds it.
      history.push("/courses");
    });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// Adding this prop type avoid ES Lint to give a warning for props.dispatch
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// This function is a "selector". It selects data from the Redux store.
export function getCourseBySlug(courses, slug) {
  // Note we can memoize using reselect lib for performance.
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  // ownProps lets us acccess the component's props. We can use
  // this to read the URL data injected by React Router.
  // Expose only what is necessary to avoid unneeded re-renders.
  // Add the author's name to each course.
  // For course, we need to determine if the user is adding a new
  // course or editing an existing one.

  // The slug comes from the Route path "/course/:slug"
  const slug = ownProps.match.params.slug;

  // This function, mapStateToProps, will get invoked every time the
  // Redux store changes. Once there are courses in the state this will
  // evaluate state.courses.length > 0 to be true.
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

// Export container component connect...
// 'dispatch' property injected automatically, since we did not specify
// the mapDispatchToProps function as second argument.
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
