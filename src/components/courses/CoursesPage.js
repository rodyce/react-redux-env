import React from "react";

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
    alert(this.state.course.title);
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

export default CoursesPage;
