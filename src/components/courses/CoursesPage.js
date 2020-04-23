import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

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

  state = {
    course: {
      title: "",
    },
  };

  // Class field. Stage 3 feature.
  // Arrow functions inherit the binding context of their enclosing scope.
  handleChange = (event) => {
    // clone course with new title
    // Note that by default, "this" is not bound to the class' instance.
    // That is why .bind(this) is required in the input text.
    // However that creates a new function allocation on every render.
    // So that is why we do binding on the constructor.
    const course = { ...this.state.course, title: event.target.value };
    // object shorthand syntax
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // dispatch was automatically added since we did not specify
    // mapDispatchToProps previously when we called connect.
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          text="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
      </form>
    );
  }
}

// Adding this prop type avoid ES Lint to give a warning for props.dispatch
CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // Expose only what is necessary to avoid unneeded re-renders.
  return {
    courses: state.courses,
  };
}

// mapDispatchToProps: actions we want to expose in our component.

// Export container component connect...
// 'dispatch' property injected automatically, since we did not specify
// the mapDispatchToProps function as second argument.
export default connect(mapStateToProps)(CoursesPage);
