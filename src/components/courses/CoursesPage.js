import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      // Only load courses when list is empty.
      actions
        .loadCourses()
        .catch((error) => alert("Loading courses failed: " + error));
    }
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch((error) => alert("Loading authors failed: " + error));
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList courses={this.props.courses} />
          </>
        )}
      </>
    );
  }
}

// Adding this prop type avoid ES Lint to give a warning for props.dispatch
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  // Expose only what is necessary to avoid unneeded re-renders.
  // Add the author's name to each course.
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  // Always call dispatch below!
  return {
    actions: {
      // We can pass a single action creator to bindActionCreators
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
} //actions we want to expose in our component.

// Export container component connect...
// 'dispatch' property injected automatically, since we did not specify
// the mapDispatchToProps function as second argument.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
