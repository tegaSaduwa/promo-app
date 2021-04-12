import React, { Component } from "react";
import { Container, Card, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../services/config";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { authHeader } from "../../utils/auth-header";
import moment from "moment";
import Swal from "sweetalert2";

export class ShortlistedCustomerDetails extends Component {
  state = {
    details: [],
    loading: true,
    error: false,
    accountNumber: "",
    mobileNumber: "",
    branchId: "",
    showDetailsComponent: true,
    showNoResults: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.getShortListed(id);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  };

  onSearch = (e) => {
    this.setState({
      showDetailsComponent: false,
      loading: true,
      showNoResults: false,
      error: false,
    });
    const { id } = this.props.match.params;
    this.searchShortListed(id);
    // window.location.reload();
  };
  onDownload = async () => {
    const { id } = this.props.match.params;
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
    await axios
      .get(`${baseUrl}/ShortListed/ByEvent/${id}/download`, requestOptions)
      .then((res) => {
        // console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You would receive mail containing the file shortly, Thankyou",
          confirmButtonColor: "purple",
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not successfully process your request please try again",
          confirmButtonColor: "purple",
        });
      });
  };
  goBack = () => {
    window.history.back();
  };
  render() {
    const {
      details,
      loading,
      error,
      accountNumber,
      mobileNumber,
      branchId,
      showDetailsComponent,
      showNoResults,
    } = this.state;
    const columns = [
      {
        dataField: "branchId",
        text: "branch Id",
      },
      {
        dataField: "customerName",
        text: "Customer Name",
      },
      {
        dataField: "accountNumber",
        text: "Account Number",
      },
      {
        dataField: "mobileNo",
        text: "Mobile Number",
      },
    ];
    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        {""} Showing Top 100 Results
      </span>
    );
    const options = {
      paginationSize: 10,
      pageStartIndex: 0,
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      showTotal: true,
      paginationTotalRenderer: customTotal,
      disablePageTitle: true,
      sizePerPageList: [
        {
          text: "10",
          value: 10,
        },
        {
          text: "15",
          value: 15,
        },
        {
          text: "All",
          value: this.state.details.length,
          style: {
            color: "purple",
          },
        },
      ],
    };

    return (
      <div>
        <Container style={{ color: "purple" }}>
          <h3
            className="pt-3"
            style={{ color: "#910d7d", fontWeight: "780px" }}
          >
            ShortListed
          </h3>
          <small
            className="pt-3"
            style={{ color: "#910d7d", fontSize: "16px" }}
          >
            Search By:
          </small>
          <div className="row mb-2">
            <div className="col-3">
              <input
                type="search"
                value={accountNumber}
                className="form-control form-control-sm"
                name="accountNumber"
                placeholder="Account Number"
                onChange={this.onChange}
              />
            </div>
            <div className="col-3">
              <input
                type="search"
                value={mobileNumber}
                className="form-control form-control-sm"
                name="mobileNumber"
                placeholder="Mobile Number"
                onChange={this.onChange}
              />
            </div>
            <div className="col-3">
              <input
                type="search"
                value={branchId}
                className="form-control form-control-sm"
                name="branchId"
                placeholder="branchId"
                onChange={this.onChange}
              />
            </div>

            <div className="col-1">
              <div>
                <Row>
                  <Col>
                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: "purple", color: "white" }}
                      onClick={this.onSearch}
                    >
                      {" "}
                      <i className="fas fa-search"></i>{" "}
                    </button>
                  </Col>
                  <Col>
                    {" "}
                    <button
                      className="btn btn-sm btn-success"
                      onClick={this.onDownload}
                    >
                      {" "}
                      <i className="fas fa-file-export"></i>{" "}
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          {loading && (
            <h6 color="muted" className="py-5">
              Loading...
            </h6>
          )}

          {showNoResults && (
            <Card>
              <CardBody>
                <h6 className="text-info">
                  Oops... <br />
                  No results found
                </h6>
              </CardBody>
            </Card>
          )}
          {error && (
            <Card>
              <CardBody>
                <h6 className="text-danger">
                  Error... <br />
                  something went wrong
                </h6>
              </CardBody>
            </Card>
          )}
          {showDetailsComponent && details && details.length > 0 && (
            <BootstrapTable
              style={{ fontSize: "9px" }}
              keyField="id"
              data={details}
              columns={columns}
              pagination={paginationFactory(options)}
            />
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

  getShortListed = async (id) => {
  
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };

    await axios
      .get(`${baseUrl}/ShortListed/ByEvent/${id}`, requestOptions)
      .then((res) => {
       
        this.setState({
          details: res.data,
          showDetailsComponent: true,
          loading: false,
        });
      })
      .catch((e) => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  };

  searchShortListed = async (id) => {
    const { accountNumber, mobileNumber, branchId } = this.state;
  
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
    const url = `${baseUrl}/ShortListed/ByEvent/${id}/search?accountNumber=${accountNumber}&mobileNumber=${mobileNumber}&branchId=${branchId}`;
    if (accountNumber || mobileNumber || branchId) {
      await axios
        .get(url, requestOptions)
        .then((res) => {
          if (res.data == 0) {
            this.setState({
              showNoResults: true,
              loading: false,
              showDetailsComponent: false,
            });
          } else {
            this.setState({
              details: res.data,
              showDetailsComponent: true,
              loading: false,
              showNoResults: false
            });
          }
        })
        .catch((e) => {
          this.setState({
            error: true,
            loading: false,
            showDetailsComponent: false,
            showNoResults: false
          });
        });
    } else {
      await axios
        .get(`${baseUrl}/ShortListed/ByEvent/${id}`, requestOptions)
        .then((res) =>
          this.setState({
            details: res.data,
            loading: false,
            showNoResults: false
          })
        )
        .catch((e) => {
          this.setState({
            error: true,
            loading: false,
            showNoResults: false
          });
        });
    }
  };
}

export default ShortlistedCustomerDetails;
