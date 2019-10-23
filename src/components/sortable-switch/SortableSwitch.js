import React, { Component } from "react";

export default class SortableSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = { asc: !!props.asc };
  }

  reverse() {
    this.setState(prevState => {
      this.props.onClick(!prevState.asc);
      return { asc: !prevState.asc };
    });
  }

  render() {
    let {active} = this.props;
    return (
      <button className={"btn btn-sm " + (active ? "btn-outline-primary" : 'btn-outline-secondary')}  onClick={() => this.reverse()}>
        {this.props.children} 
        {this.state.asc ? " asc" : " desc"}
      </button>
    );
  }
}
