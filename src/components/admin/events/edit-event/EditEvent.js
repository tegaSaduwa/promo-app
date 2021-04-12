import React, { Component } from "react";
import {
  Col,
  Label,
  Input,
  Button,
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  FormText,
} from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";
import axios from "axios";
import { editEvent } from "../../../../actions/campaignActions";
import { baseUrl } from "../../../../services/config";
import Swal from "sweetalert2";
import { authHeader, authHeaderFile } from "../../../../utils/auth-header";

export class EditEvent extends Component {
  state = {
    id: "",
    title: "",
    description: "",
    status: false,
    category: "",
    noOfWinners: "",
    remarks: "",
    campaignId: "",
    createdBy: "",
    file: "",
    manifest: "",
    startDate: new Date(),
    endDate: new Date(),
  };

  async componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
    const { id } = this.props.match.params;
    const res = await axios.get(`${baseUrl}/Events/${id}`, requestOptions);

    const camp = res.data;
    this.setState({
      title: camp.title,
      description: camp.description,
      noOfWinners: camp.numberOfWinner,
      status: camp.status,
      remarks: camp.remarks,
      createdBy: camp.createdBy,
      campaignId: camp.campaignId,
      startDate: moment(camp.startDate).format("YYYY-MM-DD"),
      endDate: moment(camp.endDate).format("YYYY-MM-DD"),
    });
    // console.log(camp);
  }
  onChangeHandlerForFile = (event) => {
    let file = event.target.files[0];
    let size = 1500000;
    let sizeCondition = file.size <= size;
    const type = "application/csv";
    let reader = new FileReader();
    reader.readAsDataURL(file);

    if (file.type === type && sizeCondition) {
      reader.onloadend = () => {
        this.setState({
          file: reader.result,
          base64: file,
        });
      };
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  onChangeCheckBox = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  onSubmitFile = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: authHeaderFile(),
    };
    const { id } = this.props.match.params;
    const url = `${baseUrl}/Events/${id}/uploads`;
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    //   acceptedFiles: "text/csv",
    // };
    var formData = new FormData();
    var file = document.getElementById("filee").files[0];
    formData.append("file", file);
    Swal.fire({
      icon: "warning",
      tite: "Upload in progress",
      text: "Upload in Progress... Please Wait and do not refresh page until after successful upload",
      confirmButtonColor: "purple",
    });

    return axios
      .post(url, formData, requestOptions)
      .then((response) => {
        this.setState({
          manifest: response.data,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Records Uploaded Successfully`,
          confirmButtonColor: "purple",
        });
      })
      .catch(function (e) {
        Swal.fire({
          icon: "error",
          title: e.response.data.message,
          confirmButtonColor: "purple",
        });
      });
  };
  goBack = () => {
    window.history.back();
  };

  onSubmit = async (e) => {
    const { id } = this.props.match.params;

    e.preventDefault();

    const {
      title,
      description,
      status,
      startDate,
      endDate,
      noOfWinners,
      createdBy,
      campaignId,
      file,
    } = this.state;

    const eventItems = {
      id,
      title,
      description,
      status,
      numberOfWinner: Number(noOfWinners),
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      campaignId: campaignId,
    };

    if (eventItems.endDate < eventItems.startDate) {
      Swal.fire({
        icon: "error",
        text: "End Date cannot be less that Start Date",
        confirmButtonColor: "purple",
      });
    } else {
      const routeback = window.history.back();
      this.props.editEvent(id, eventItems, routeback);
    }
  };
  setT = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  render() {
    const { title, description, startDate, endDate, noOfWinners } = this.state;
    return (
      <div>
        <Container>
          {/* <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
          >
            Edit Event
          </div> */}
          <h3
            className="pt-3"
            style={{ color: "#910d7d", fontWeight: "780px" }}
          >
            Update Event
          </h3>
          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Row>
                    <Col>
                      {" "}
                      <Label for="item">Title</Label>
                      <Input
                        type="text"
                        name="title"
                        size="sm"
                        onChange={this.onChange}
                        value={title || ""}
                        maxLength="50"
                        required
                      />
                    </Col>

                    <Col>
                      {" "}
                      <Label for="item">Description</Label>
                      <Input
                        type="textarea"
                        name="description"
                        size="sm"
                        id="item"
                        onChange={this.onChange}
                        value={description || ""}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="item">Start Date </Label>
                      <Input
                        type="date"
                        name="startDate"
                        onChange={this.onChange}
                        value={startDate}
                        required
                      />{" "}
                    </Col>
                    <Col>
                      <Label for="item">End Date </Label>
                      <Input
                        type="date"
                        name="endDate"
                        onChange={this.onChange}
                        value={endDate}
                        required
                      />{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="item">No of Winners</Label>
                      <Input
                        type="number"
                        name="noOfWinners"
                        id="item"
                        size="sm"
                        onChange={this.onChange}
                        value={noOfWinners || ""}
                        maxLength="50"
                        min="0"
                        required
                      />
                    </Col>
                    <Col>
                      {/* <Label for="item">Remarks </Label>
                      <Input
                        type="textarea"
                        name="remarks"
                        size="sm"
                        onChange={this.onChange}
                        value={remarks || ""}
                        maxLength="70"
                        required
                      />{" "} */}
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col className="col-6">
                      <Label for="item">
                        <i className="fas fa-file-upload"></i>
                        <span className="h6">Upload Data:</span>{" "}
                      </Label>
                      {/* onChange={this.onSubmit} */}
                      <Input
                        type="file"
                        id="filee"
                        style={{ fontSize: "17px" }}
                      />
                      <FormText color="muted">
                        <a
                          href={process.env.PUBLIC_URL + "/Files/sample.csv"}
                          download="sample.csv"
                          style={{ color: "purple" }}
                        >
                          <i className="fas fa-file-download"></i>
                          Download sample document (*csv only)
                        </a>
                        <br />
                        <Button
                          size="sm"
                          onClick={this.onSubmitFile}
                          color="dark"
                          style={{
                            marginTop: "2rem",
                            backgroundColor: "purple",
                          }}
                        >
                          upload
                        </Button>
                      </FormText>
                    </Col>
                  </Row>
                  <br />
                  <Button
                    color="dark"
                    style={{ marginTop: "2rem", backgroundColor: "purple" }}
                  >
                    Submit
                  </Button>
                  <footer onClick={this.goBack}>
                    <i
                      className="fas fa-arrow-circle-left mt-3"
                      style={{ color: "purple", cursor: "pointer" }}
                    >
                      back
                    </i>
                  </footer>
                </FormGroup>
              </Form>{" "}
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(null, { editEvent })(EditEvent);
