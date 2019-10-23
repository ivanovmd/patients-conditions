import React, { Component } from "react";

export default class PatientIdInput extends Component {
  state = { inputValue: "" };

  handleSubmit(value) {
    if (value) {
      this.props.onSubmit(value);
    }
  }

  render() {
    return (
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Patiend ID (example: 4342008)"
          onChange={e => this.setState({ inputValue: e.target.value })}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => this.handleSubmit(this.state.inputValue)}
          >
            Apply
          </button>
        </div>
      </div>
    );
  }
}
