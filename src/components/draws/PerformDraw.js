import React, { Component } from "react";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import {
  performDraws,
  rundraws,
  getWinnersDownload,
} from "../../actions/drawsActions";
import GetDraws from "./GetDraws";
import { Link } from "react-router-dom";
import { authHeader } from "../../utils/auth-header";
import axios from "axios";
import { baseUrl } from "../../services/config";
import { exportCSVFile } from "../../utils/export";

export class PerformDraw extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    this.props.performDraws(id);
    this.props.getWinnersDownload(id);  
  }

  onPerformDraw = (e) => {
    e.preventDefault();
    let timerInterval;
    Swal.fire({
      title: "And the winner is!",
      confirmButtonColor: "purple",
      html: "countdown <b></b> .",
      timer: 10000,
      timerProgressBar: true,
      onBeforeOpen: async () => {
        //this runs the draws

        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 10);
      },
      onClose: async () => {
        clearInterval(timerInterval);
        const { id } = this.props.match.params;
        //console.log(id);
        this.props.rundraws(id);
      },
    }).then(async (result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          title: "Winner",
          text: "view winners",
          confirmButtonColor: "purple",
          confirmButtonText: "View",
        });
      }
    });
  };

  // onReset = () => {
  //   console.log("reset clicked");
  //  // window.location.reload();
  // };
  redirect = () => {
    const { id } = this.props.match.params;

    window.location.href = `/get-winners/${id}`;
  };

  onReset = async () => {
    const { id } = this.props.match.params;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "purple",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reset!",
    }).then((result) => {
      if (result.value) {
        const requestOptions = {
          method: "GET",
          headers: authHeader(),
        };
        // console.log(`${baseUrl}/Draws/reset/${id}`, requestOptions);
        axios
          .get(`${baseUrl}/Draws/reset/${id}`, requestOptions)
          .then((res) => {
            Swal.fire({
              title: "Reset Successful",
              text: "You draws has been reset successfully",
              confirmButtonColor: "purple",
            }); //
          })
          .catch((e) => {
            Swal.fire({
              title: "Error",
              text: e.response.data.message
                ? e.response.data.message
                : "could not reset, please try again",
              confirmButtonColor: "purple",
            });
          });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };

  goBack = () => {
    window.history.back();
  };

  render() {
    const { rundraws, performDraws, winners } = this.props.draw;
    const { id } = this.props.match.params;
    const headers = {
      eventId: "eventId",
      branchId: "branchId",
      customerName: "customerName",
      accountNumber: "accountNumber",
      mobileNo: "mobileNo",
      id: "id",
      dateLastUpdated: "dateLastUpdated",
      createdOn: "createdOn",
    };
    //var
    return (
      <div>
        <Container>
          <h3
            className="pt-3"
            style={{ color: "#910d7d", fontWeight: "780px" }}
          >
            Perform Draw
          </h3>
          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Row>
                    <Col>
                      <span>
                        <h4 className="h4" style={{ color: "purple" }}>
                          {" "}
                          {performDraws.title}
                        </h4>
                        <small className="mr-2" style={{ color: "purple" }}>
                          {" "}
                          {performDraws.description}
                        </small>
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {performDraws.numberOfShortListedCustomers > 0 &&
                        rundraws && (
                          <Link to={`/shortlistedCustomer-details/${id}`}>
                            View Shortlisted Customers
                          </Link>
                        )}
                      <br></br>

                      <div className="d-flex">
                        {performDraws.isCompleted === false && (
                          <Button
                            color="secondary"
                            className="fas fa-star mt-3 mr-1"
                            onClick={this.onPerformDraw}
                          >
                            <i className="fas fa-star mr-1"></i>Click to start
                            draw!!!
                          </Button>
                        )}
                        {performDraws.eventWinners &&
                          performDraws.eventWinners.length > 0 && (
                            <Button
                              color="danger"
                              className="mt-3 "
                              onClick={this.onReset}
                            >
                              Reset
                            </Button>
                          )}
                      </div>
                    </Col>
                    {/* <Col>
                     
                    </Col> */}
                  </Row>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          {rundraws && rundraws.length > 0 && (
            <GetDraws
              drawsList={rundraws}
              id={id}
              eventWinners={performDraws.eventWinners}
            />
          )}
          {performDraws.eventWinners && performDraws.eventWinners.length > 0 && (
            <Card className="mt-3 mb-3">
              <CardBody style={{ backgroundColor: "#e8e8e8" }}>
                
                <span>
                <i
                    className="fas fa-download d-flex justify-content-end"
                    onClick={() => {
                      var fileTitle = performDraws.title;
                      console.log(winners);
                      exportCSVFile(headers, winners, fileTitle);
                    }}
                    style={{ color: "purple" }}
                  >
                  </i>
                <h6>Winners</h6>
                 
                </span>
                <Table striped className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Account Number</th>
                      <th>Branch Code</th>
                      <th>Customer Name</th>
                      <th>Mobile Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*  */}
                    {performDraws.eventWinners.map(
                      ({ id, shortListedCustomer }, index) => (
                        <tr key={id} className="clickable-row">
                          <td>{index + 1}</td>
                          <td className="clickable-name">
                            {shortListedCustomer.accountNumber}
                          </td>
                          <td>{shortListedCustomer.branchId}</td>
                          <td>{shortListedCustomer.customerName}</td>
                          <td>{shortListedCustomer.mobileNo}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Container>
        <Container>
          <footer onClick={this.goBack}>
            <i
              className="fas fa-arrow-circle-left mt-1 mb-1"
              style={{ color: "purple", cursor: "pointer" }}
            >
              back
            </i>
          </footer>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  draw: state.draw,
});

export default connect(mapStateToProps, {
  performDraws,
  rundraws,
  getWinnersDownload,
})(PerformDraw);
