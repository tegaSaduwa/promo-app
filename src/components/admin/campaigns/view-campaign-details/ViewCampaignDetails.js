import React, { Component } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Container,
  FormText,
} from "reactstrap";
import { Link } from "react-router-dom";
import EventSummary from "../../events/eveny-summary-modal/EventSummary";
import axios from "axios";
import { baseUrl } from "../../../../services/config";
import moment from "moment";
import { connect } from "react-redux";
import { getCampaignsPerId, getCampaigns } from "../../../../actions/campaignActions";
import Swal from "sweetalert2";
import { authHeader } from "../../../../utils/auth-header";

export class ViewCampaignDetails extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCampaignsPerId(id);
  }

  onDeleteClick = async () => {
    const { id } = this.props.match.params;
    const { campaignDetails } = this.props.campaign;
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
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
        //console.log(requestOptions)
        axios
          .get(`${baseUrl}/Campaigns/delete/${id}`, requestOptions)
          .then((res) => {
            Swal.fire({
              title: "Remove",
              text: "campaign removed",
              confirmButtonColor: "purple",
            });
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: e.response.data.message? e.response.data.message : "could not delete, please try again",
              confirmButtonColor: "purple",
            });
          });

        this.props.history.push(`/admin/campaigns`);
        this.props.getCampaigns();
      }
    });
  };

  goBack = () => {
    this.props.history.push(`/admin/campaigns`)
  };

  render() {
    const { id } = this.props.match.params;

    const { campaignDetails } = this.props.campaign;
    return (
      <div>
        <Container>
          {/* <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
          >
            Campaign Details
          </div> */}
           <h3
              className="pt-3"
              style={{ color: "#910d7d", fontWeight: "780px" }}
            >
              Campaign Details
            </h3>
          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <Form onSubmit={this.onSubmit}>
                {/*  style={{ textTransform: "uppercase", fontSize: "14px" }} */}
                <FormGroup>
                 
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span>Title: {" "}</span>{" "}
                        {campaignDetails.title}
                      </p>
                    </Col>

                    <Col>
                      <p>
                        {" "}
                        <span>Description: </span>{" "}
                        {campaignDetails.description}
                      </p>
                    </Col>
                  </Row>

                  <Row>
                  <Col className="col-6">
                      <p>
                        {" "}
                        <span>Start Date:</span>{" "}
                        {moment(campaignDetails.startDate).format("DD/MM/YYYY")}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        {" "}
                        <span>End Date:{" "}</span>{" "}
                        {moment(campaignDetails.endDate).format("DD/MM/YYYY")}
                      </p>
                    </Col>
                  </Row>

                  <Row>
                   
                    <Col className="col-6">
                      <p>
                        {" "}
                        <span>
                          Campaign Creative Picture:
                        </span>{" "}
                        <FormText color="muted">
                          <img
                            src={
                              campaignDetails.campaignsCreativePic === ""
                                ? process.env.PUBLIC_URL + '/images/imagePlaceholder.PNG'
                                : campaignDetails.campaignsCreativePic
                            }
                            height="50"
                            width="50"
                          />
                        </FormText>
                      </p>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
              <footer className="d-flex justify-content-end">
                <Link to={`/admin/campaigns/edit/${id}`}>
                  <i className="fas fa-edit " style={{ color: "purple" }}></i>
                </Link>
                <i
                  className="fas fa-trash mt-1 ml-1"
                  style={{ color: "purple" }}
                  onClick={this.onDeleteClick}
                ></i>
              </footer>
            </CardBody>
            <br />
            {/* <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <h6>Category summary</h6>
            </CardBody>
            <br /> */}

            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              
              <span className="d-flex justify-content-between"   style={{ color: "purple" }}>
              <h5 className="mb-2">Event Summary</h5>
                 <Link to={`/admin/campaigns/add-event/${id}`}>
                  {" "}
                  <i
                    className="fas fa-plus pr-1"
                    style={{ color: "purple" }}
                  ></i>
                </Link></span>
              <EventSummary id={id} />
              <footer className="d-flex justify-content-end">
               
                {/* <Link to={`/admin/campaigns/edit-event/${id}`}>
                  <i className="fas fa-edit " style={{ color: "purple" }}></i>
                </Link> */}
              </footer>

              <footer onClick={this.goBack}>
                <i
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
const mapStateToProps = (state) => ({
  campaign: state.campaign,
});
export default connect(mapStateToProps, { getCampaignsPerId, getCampaigns })(
  ViewCampaignDetails
);
