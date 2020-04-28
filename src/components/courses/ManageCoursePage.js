import React from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

class ManageCoursePage extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     course: {
  //       title: "",
  //     },
  //   };

  //   Constructor binding.
  //   Or use arrow function...
  //   this.handleChange = this.handleChange.bind(this);
  // }

  componentDidMount() {
    const { courses, authors, loadAuthors, loadCourses } = this.props;
    if (courses.length === 0) {
      // Only load courses when list is empty.
      loadCourses().catch((error) => alert("Loading courses failed: " + error));
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Loading authors failed: " + error));
    }
  }

  render() {
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}

// Adding this prop type avoid ES Lint to give a warning for props.dispatch
ManageCoursePage.propTypes = {
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // Expose only what is necessary to avoid unneeded re-renders.
  // Add the author's name to each course.
  return {
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
