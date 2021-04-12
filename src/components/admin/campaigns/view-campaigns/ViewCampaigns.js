import React, { Component } from "react";
import { Container, Table, Input, Button, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCampaigns,
  endCampaigns,
  fetchData,
} from "../../../../actions/campaignActions";
import "./ViewCampaigns.css";
import moment from "moment";
//import Swal from "sweetalert2";

export class ViewCampaigns extends Component {
  state = {
    searchField: "",
    campaignDetails: [],
  };
  componentDidMount() {
    this.props.fetchData();
    this.props.getCampaigns();
  }
  // componentWillUpdate(prevProps, prevState) {
  //   if (prevProps.props !== this.props) {
  //     console.log("state has changed.");
  //   }
  // }
  render() {
    const { campaigns, loading, error } = this.props.campaign;
    const { searchField } = this.state;

    const filteredCampaigns = campaigns.filter((report) =>
      report.title.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div>
        <div>
          <Container>
            {/* <div
              className="col-sm-12 btn btn-info mt-3 mb-4"
              style={{ backgroundColor: "#910d7d" }}
            >
              Campaigns
            </div> */}
            <h3
              className="pt-3"
              style={{ color: "#910d7d", fontWeight: "780px" }}
            >
              Campaigns
            </h3>
            <>
              <div className="d-flex justify-content-between">
                <Link to="/admin/campaigns/add">
                  <Button
                  className="mt-2"
                    color="dark"
                    size="sm"
                    style={{ backgroundColor: "#910d7d" }}
                  >
                    <i className="fas fa-plus pr-1" />
                    New
                  </Button>
                </Link>
                <Input
                  type="search"
                  bsSize="sm"
                  className="col-2"
                  placeholder="search"
                  onChange={(e) =>
                    this.setState({ searchField: e.target.value })
                  }
                />
              </div>
            </>

            {campaigns && (
              <>
                <Table striped className="table mt-2">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCampaigns.map(
                      (
                        {
                          id,
                          title,
                          description, // status,
                          remarks,
                          startDate,
                          endDate,
                          isActive
                        },
                        index
                      ) => (
                        <tr key={index} className="clickable-row">
                          <td>{index + 1}</td>
                          <td className="clickable-name">
                            <Link
                            //  style={{textDecoration: "none", color:"black"}}
                              to={`/admin/campaigns/view-camapign-details/${id}`}
                            >
                              {title}
                            </Link>
                          </td>
                          <td>{description}</td>
                          {/* <td>{status}</td> */}
                          <td>{isActive ? "Active" : "Inactive"}</td>
                          <td>{moment(startDate).format("DD/MM/YYYY")}</td>
                          {/* <td>{createdBy}</td> */}
                          <td>{moment(endDate).format("DD/MM/YYYY")}</td>
                    
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
                <>
                  {loading && <h6 color="muted">Loading...</h6>}
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
                </>
              </>
            )}
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign,
});

export default connect(mapStateToProps, {
  getCampaigns,
  endCampaigns,
  fetchData,
})(ViewCampaigns);
