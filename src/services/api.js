class ApiService {
  basePath =
    "https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/";

  getConditionsForPatient(patientId) {
    const url =
      this.basePath + "Condition?clinicalstatus=active&patient=" + patientId;
    return this.getRequest(url);
  }

  getPatientData(patientId) {
    // for some reason 'sandboxcerner' test server sometimes returns 500 for this request
    const url = this.basePath + "Patient/" + patientId;
    return this.getRequest(url);
  }

  getRequest(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json+fhir"
      }
    })
      .then(response => response.json())
      .catch(e => console.log(e));
  }
}

const apiService = new ApiService();

export default apiService;
