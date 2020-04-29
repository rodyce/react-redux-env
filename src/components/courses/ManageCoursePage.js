import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  ...props
}) {
  // Avoid using Redux for all state. Use plain React state for data
  // only one few components use. (such as form state)
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      // Only load courses when list is empty.
      loadCourses().catch((error) => alert("Loading courses failed: " + error));
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Loading authors failed: " + error));
    }
  }, []); // Note empty array here as a second argument.
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

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
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
};

function mapStateToProps(state) {
  // Expose only what is necessary to avoid unneeded re-renders.
  // Add the author's name to each course.
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
};

// Export container component connect...
// 'dispatch' property injected automatically, since we did not specify
// the mapDispatchToProps function as second argument.
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
