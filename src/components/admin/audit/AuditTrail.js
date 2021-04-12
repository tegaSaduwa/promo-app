import React, { Component } from "react";
import { Container, Card, CardBody } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../services/config";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { authHeader } from "../../../utils/auth-header";
import moment from "moment";

export class AuditTrail extends Component {
  state = {
    details: [],
    ModifiedBy: "",
    ActivityType: "",
    Ip: "",
    error: false,
    search: "",
    loading: false,
    showDetailsComponent: true,
    showNoResults: false,
  };

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
  };
  goBack = () => {
    window.history.back();
  };
  render() {
    const {
      details,
      error,
      Ip,
      ActivityType,
      ModifiedBy,
      loading,
      showDetailsComponent,
      showNoResults,
    } = this.state;
    const columns = [
      {
        dataField: "id",
        text: "id",
      },
      {
        dataField: "ip",
        text: "IP",
      },
      {
        dataField: "activityType",
        text: "Activity Type",
      },
      {
        dataField: "createdBy",
        text: "created By",
      },
      {
        dataField: "createdOn",
        text: "created On",
        formatter: (d) => {
          return moment(d.createdOn).local().format("DD/MM/YYYY");
        },
      },
    ];
    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        {""} Showing {from} to {to} of {size} Results
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
            Audit Trail
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
                value={Ip}
                className="form-control form-control-sm"
                name="Ip"
                placeholder="IP"
                onChange={this.onChange}
              />
            </div>
            <div className="col-3">
              <input
                type="search"
                value={ActivityType}
                className="form-control form-control-sm"
                name="ActivityType"
                placeholder="Activity Type"
                onChange={this.onChange}
              />
            </div>
            <div className="col-3">
              <input
                type="search"
                value={ModifiedBy}
                className="form-control form-control-sm"
                name="ModifiedBy"
                placeholder="Created By"
                onChange={this.onChange}
              />
            </div>

            <div className="col-1">
              <div>
                <button
                  className="btn btn-sm mr-3"
                  style={{ backgroundColor: "purple", color: "white" }}
                  onClick={this.onSearch}
                >
                  {" "}
                  <i className="fas fa-search"></i>{" "}
                </button>
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
                <h6  className="text-info">
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
          {/* <footer onClick={this.goBack}>
            <i
              className="fas fa-arrow-circle-left mt-1 mb-1"
              style={{ color: "purple", cursor: "pointer" }}
            >
              back
            </i>
          </footer> */}
        </Container>
      </div>
    );
  }

  searchShortListed = async (id) => {
    const { Ip, ActivityType, ModifiedBy } = this.state;
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
    const url = `${baseUrl}/AuditLogs?Ip=${Ip}&ActivityType=${ActivityType}&ModifiedBy=${ModifiedBy}`;


    await axios
      .get(url, requestOptions)
      .then((res) => {
      
        if (res.data == 0) {
          this.setState({ showNoResults: true,  loading: false,  showDetailsComponent: false, });
        } else {
          this.setState({
            details: res.data,
            loading: false,
            showDetailsComponent: true,
            showNoResults: false
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  };
}

export default AuditTrail;
