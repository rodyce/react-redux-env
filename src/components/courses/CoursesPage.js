import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
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
    this.props.actions
      .loadCourses()
      .catch((error) => alert("Loading courses failed: " + error));
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

// Adding this prop type avoid ES Lint to give a warning for props.dispatch
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  // Expose only what is necessary to avoid unneeded re-renders.
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  // Always call dispatch below!
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
} //actions we want to expose in our component.

// Export container component connect...
// 'dispatch' property injected automatically, since we did not specify
// the mapDispatchToProps function as second argument.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
