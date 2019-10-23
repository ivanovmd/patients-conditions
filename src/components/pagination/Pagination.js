import React, { Component } from "react";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 0 };
  }

  handleOnPageChange(delta) {
    this.setState(prevState => {
      if (prevState.currentPage + delta >= 0 && prevState.currentPage + delta < this.props.totalPages) {
        this.props.onPageChange(prevState.currentPage + delta);
        return { ...prevState, currentPage: prevState.currentPage + delta };
      }
    });
  }

  render() {
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                onClick={() => this.handleOnPageChange(-1)}
                className="page-link"
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <button
                onClick={() => this.handleOnPageChange(1)}
                className="page-link"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <div className="page-item">{this.state.currentPage + 1} / {this.props.totalPages}</div>
      </div>
    );
  }
}
