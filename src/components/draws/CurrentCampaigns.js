import React, { Component } from "react";
import { Container, Table, Input, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getdraws, fetchData, getCurrCampaigns } from "../../actions/drawsActions";
import moment from "moment"

export class CurrentCampaigns extends Component {
  state = {
    cancel: "secondary",
    searchField: "",
  };
  async componentDidMount() {
    this.props.fetchData();
    this.props.getCurrCampaigns();
    // ;
  }

  render() {
    const { draws, loading, error } = this.props.draw;
    // console.log(draws);

    const { searchField } = this.state;

    const filteredCampaigns = draws.filter((report) =>
      report.title.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div>
        <div>
          <Container>
            <h3
              className="pt-3"
              style={{ color: "#910d7d", fontWeight: "780px" }}
            >
             Current Campaigns
            </h3>
            <div className="d-flex justify-conteny-end ">
              {" "}
              <Input
                type="search"
                size="sm"
                className="col-2 mb-2"
                placeholder="search"
                onChange={(e) => this.setState({ searchField: e.target.value })}
              />
            </div>

            {/* <Link to="/selecting">
                <Button color="light" size="sm">
                  <i className="fas fa-star pr-1" />
                  Perform Draw
                </Button>
              </Link> */}
            {draws && (
              <Table striped className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
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
                        description,
                        startDate,
                        endDate,
                        // createdBy,
                        // createdOn,
                      },
                      index
                    ) => (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          <Link to={`/draws-details/${id}`}>{title}</Link>
                        </td>
                        <td>{description}</td>
                        <td>{moment(startDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(endDate).format("DD/MM/YYYY")}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            )}
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
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  draw: state.draw,
});

export default connect(mapStateToProps, { getCurrCampaigns, fetchData })(CurrentCampaigns);

