import React, { useState } from "react";

const tabs = document.querySelectorAll('[planner]')
const tabContents = document.querySelectorAll('[planner]')


class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {budget : ''};
  };

  handleChange = event => {
    this.setState({ budget: event.target.value });
  };

  render() {
  return (
    <div className="planner">
      <form name="budget">
        <label form="budget">
          Budget: $
          <input type="number" name="budget" value={this.state.budget} onChange={this.handleChange} />
        </label>
        <h3>Your budget is: {this.state.budget}</h3>
      </form>

      <form name="budget">
        <label form="budget">
          Budget: $
          <input type="number" name="budget" value={this.state.budget} onChange={this.handleChange} />
        </label>
        <h3>Your budget is: {this.state.budget}</h3>
      </form>
    </div>
  );
  }
};

export default Planner
