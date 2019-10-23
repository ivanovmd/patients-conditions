import React, { Component } from "react";
import SortableTable from "./components/sortable-table/SortableTable";
import "./App.css";
import PatientIdInput from "./components/patient-id-input/PatientIdInput";
import apiService from "./services/api";

const patients = [
  { name: "Smart, Valerie", id: 4596007 },
  { name: "Smart, Wilma", id: 4342008 },
  { name: "Smart, Nancy", id: 4342009 },
  { name: "Smart, Joe", id: 4342010 },
  { name: "Smart, Hailey", id: 4342011 },
  { name: "Smart, Timmy", id: 4342012 },
  { name: "Smart, Fred", id: 4478007 },
  { name: "Peters, Tim", id: 1316024 }
];

class App extends Component {
  state = {
    patientConditions: [],
    patientInfo: {},
    loadingPatientInfo: false,
    loadingConditions: false,
    searchedOnce: false
  };

  handlePatientChange(patientId) {
    if (!this.state.searchedOnce) this.setState({ searchedOnce: true });
    this.getConditionsForPatient(patientId);
    this.getPatientInfo(patientId);
  }

  // for some reason 'sandboxcerner' test server sometimes returns 500 for this request
  getPatientInfo(patientId) {
    this.setState({ loadingPatientInfo: true });
    apiService.getPatientData(patientId).then(result => {
      if (result) {
        this.setState({
          loadingPatientInfo: false,
          patientInfo: {
            birthDate: result.birthDate,
            gender: result.gender,
            name: result.name[0].text
          }
        });
      } else {
        this.setState({ loadingPatientInfo: false, patientInfo: {} });
      }
    });
  }

  getConditionsForPatient(patientId) {
    this.setState({ loadingConditions: true });
    apiService.getConditionsForPatient(patientId).then(result => {
      if (result) {
        this.setState({
          loadingConditions: false,
          patientConditions: result.entry
        });
      } else {
        this.setState({ loadingConditions: false, patientConditions: [] });
      }
    });
  }

  render() {
    return (
      <div
        className={
          "App container " +
          (this.state.loadingConditions ? "app-loading-overlay" : "")
        }
      >
        <header className="row">
          <div className="col-md-5">
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text">Select Patient:</label>
              </div>

              <select
                className="custom-select"
                defaultValue="Select Patient"
                onChange={e => this.handlePatientChange(e.target.value)}
              >
                <option disabled>Select Patient</option>
                {patients.map((patient, i) => {
                  return (
                    <option value={patient.id} key={i}>
                      {patient.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-md-2 text-center">OR</div>
          <div className="col-md-5">
            <PatientIdInput
              onSubmit={selectedPatient =>
                this.handlePatientChange(selectedPatient)
              }
            ></PatientIdInput>
          </div>
        </header>
        <div className="row">
          <div className="col">
            {!this.state.searchedOnce ? (
              "Please Select An Patient"
            ) : (
              <SortableTable
                patientInfo={this.state.patientInfo}
                patientConditions={this.state.patientConditions}
                loading={
                  this.state.loadingConditions || this.state.loadingPatientInfo
                }
              ></SortableTable>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
