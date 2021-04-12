import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Container,
  Button,
  Label,
  Input,
  FormText,
} from "reactstrap";
import CreateNewEvent from "../create-new-event/CreateNewEvent";
import { baseUrl } from "../../../../services/config";
import axios from "axios";
import Swal from "sweetalert2";
import { authHeader, authHeaderFile } from "../../../../utils/auth-header";

export class ViewEventDetails extends Component {
  state = {
    showAddComponent: false,
    events: [],
    file: "",
    manifest: "",
    fileDetails: [],
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
    const res = await axios.get(`${baseUrl}/Events/${id}`, requestOptions);
    this.setState({
      events: res.data,
    });
  }

  onDeleteClick = async () => {
    const { id } = this.props.match.params;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "purple",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.value) {
        const requestOptions = {
          method: "POST",
          headers: authHeader(),
        };

        axios
          .get(`${baseUrl}/Events/delete/${id}`, {
            method: "GET",
            headers: authHeader(),
          })
          .then((res) => {
            Swal.fire({
              title: "Remove",
              text: "event removed",
              confirmButtonColor: "purple",
            }); //
          })
          .catch((e) => {
            // console.log(e);
            // console.log(e.response.data.message);
            Swal.fire({
              title: "Error",
              text: e.response.data.message
                ? e.response.data.message
                : "could not delete, please try again",
              confirmButtonColor: "purple",
            });
          });

        window.history.back();
      }
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: authHeaderFile(),
    };
    const { id } = this.props.match.params;
    const url = `${baseUrl}/Events/${id}/uploads`;

    var formData = new FormData();
    var file = document.getElementById("filee").files[0];
    formData.append("file", file);
    Swal.fire({
      text:
        "Upload in progress... Please Wait and do not refresh page until after successful upload",
      imageUrl: `${process.env.PUBLIC_URL}/images/gear.gif`,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: "Uploading...",
      confirmButtonColor: "purple",
    });
    return axios
      .post(url, formData, requestOptions)
      .then((response) => {
        this.setState({ fileDetails: response.data });
        this.setState({
          manifest: response.data,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Records Uploaded Successfully, Refresh page to reflect changes`,
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
  render() {
    const { id } = this.props.match.params;
    const { events, manifest } = this.state;

    return (
      <div>
        <Container>
          <h3
            className="pt-3"
            style={{ color: "#910d7d", fontWeight: "780px" }}
          >
            Event Details
          </h3>

          <Card>
            <i className="fas fa-back" onClick={this.goback}></i>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              {this.state.showAddComponent && <CreateNewEvent id={id} />}
              <Form>
                {/* style={{ fontSize: "15px" }} */}
                <FormGroup>
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span>Title:</span> {events?.title}
                      </p>
                    </Col>

                    <Col>
                      <p>
                        {" "}
                        <span>Description:</span> {events?.description}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span>
                          Number of winners: {events?.numberOfWinner}
                        </span>{" "}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        {" "}
                        <span>Start Date:</span>{" "}
                        {moment(events.startDate).format("DD/MM/YYYY")}
                      </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span>End Date:</span>{" "}
                        {moment(events.endDate).format("DD/MM/YYYY")}
                      </p>
                    </Col>

                    <Col>
                      <p>
                        {" "}
                        <span>
                          Number of Customer(s) Shortlisted:{" "}
                          {events.numberOfShortListedCustomers}{" "}
                          {/* <Button
                            color="secondary"
                            className="ml-1"
                            size="sm"
                            onClick={this.onReset}
                          >
                            Reset
                          </Button> */}
                        </span>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-6">
                      {Number(events.numberOfShortListedCustomers) ? (
                        <Link to={`/shortlistedCustomer-details/${id}`}>
                          View Shortlisted Customers
                        </Link>
                      ) : null}
                    </Col>
                    {/* */}
                   {events.numberOfShortListedCustomers === "No File Uploaded Yet" && <Col>
                    <Label for="item">
                      <i className="fas fa-file-upload"></i>
                      <span>Upload Data:</span>{" "}
                    </Label>
                    
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
                        onClick={this.onSubmit}
                        color="dark"
                        style={{
                          marginTop: "2rem",
                          backgroundColor: "purple",
                        }}
                      >
                        upload
                      </Button>
                    </FormText>{" "}
                  </Col>}
                  </Row>
                </FormGroup>
              </Form>
              <footer className="d-flex justify-content-end">
                <Link to={`/admin/campaigns/edit-event/${id}`}>
                  <i
                    className="fas fa-edit d-flex justify-content-end"
                    style={{ color: "purple" }}
                  ></i>
                </Link>
                <i
                  onClick={this.onDeleteClick}
                  className="fas fa-trash d-flex justify-content-end ml-1"
                  style={{ color: "purple" }}
                ></i>
              </footer>
              <footer>
                <i
                  onClick={this.goBack}
                  className="fas fa-arrow-circle-left mt-2"
                  style={{ color: "purple", cursor: "pointer" }}
                >
                  back
                </i>
              </footer>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default ViewEventDetails;
