import React, { Component } from "react";
import * as moment from "moment";
import SortableSwitch from "../sortable-switch/SortableSwitch";
import Pagination from "../pagination/Pagination";

export default class SortableTable extends Component {
  state = {
    pageNumber: 0,
    displayNumber: 10,
    orderTerm: "",
    orderAsc: false
  };

  sortPatients(asc, field) {
    let getVal;
    if (field === "name") {
      getVal = val => val.resource.code.text;
      this.setState({ orderTerm: "name" });
    }
    if (field === "date") {
      getVal = val => moment(val.resource.dateRecorded);
      this.setState({ orderTerm: "date" });
    }

    this.setState(prevState => {
      return {
        ...prevState,
        patientConditions: prevState.patientConditions.sort((a, b) => {
          if (asc) {
            if (getVal(a) > getVal(b)) return -1;
            if (getVal(a) < getVal(b)) return 1;
            return 0;
          } else {
            if (getVal(a) < getVal(b)) return -1;
            if (getVal(a) > getVal(b)) return 1;
            return 0;
          }
        })
      };
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.patientInfo !== state.patientInfo ||
      props.patientConditions !== state.patientConditions
    ) {
      return {
        patientInfo: props.patientInfo,
        patientConditions: props.patientConditions,
        orderTerm: "",
        orderAsc: false
      };
    }
    return null;
  }

  render() {
    let { pageNumber, displayNumber } = this.state;

    const conditionsMap = this.state.patientConditions
      .map((condition, i) => {
        return (
          <tr key={i}>
            <td>{condition.resource.code.text}</td>
            <td>{moment(condition.resource.dateRecorded).calendar()}</td>
            <td>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={
                  "https://www.ncbi.nlm.nih.gov/pubmed/?term=" +
                  condition.resource.code.text
                }
              >
                Link
              </a>
            </td>
          </tr>
        );
      })
      .slice(
        pageNumber * displayNumber,
        pageNumber * displayNumber + displayNumber
      );

    return (
      <div>
        {this.props.loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            {this.props.patientInfo && (
              <h4 className="patient-info">
                <span className="patient-info__entry text-primary">
                  <span className="text-secondary">Name: </span>
                  {this.props.patientInfo.name}
                </span>
                <span className="patient-info__entry text-primary">
                  <span className="text-secondary">Age: </span>
                  {moment(new Date()).diff(
                    this.props.patientInfo.birthDate,
                    "year",
                    false
                  )}
                </span>
                <span className="patient-info__entry text-primary">
                  <span className="text-secondary">Gender: </span>
                  {this.props.patientInfo.gender}
                </span>
              </h4>
            )}

            <table className="conditions-table table">
              <thead>
                <tr>
                  <th width="60%">
                    {"Condition name "}
                    <SortableSwitch
                      active={this.state.orderTerm === "name"}
                      onClick={asc => this.sortPatients(asc, "name")}
                      asc
                    >
                      Order
                    </SortableSwitch>
                  </th>
                  <th width="20%">
                    {"Date Recorder "}
                    <SortableSwitch
                      active={this.state.orderTerm === "date"}
                      onClick={asc => this.sortPatients(asc, "date")}
                      asc
                    >
                      Order
                    </SortableSwitch>
                  </th>
                  <th width="20%">Search On PubMed</th>
                </tr>
              </thead>
              <tbody>{conditionsMap.length ? (
                conditionsMap
              ) : (
                <tr><td>No results &#128554;</td></tr>
              )}</tbody>
            </table>
            <Pagination
              step={displayNumber}
              totalPages={Math.ceil(
                this.props.patientConditions.length / displayNumber
              )}
              onPageChange={pageNumber => this.setState({ pageNumber })}
            ></Pagination>
          </div>
        )}
      </div>
    );
  }
}
