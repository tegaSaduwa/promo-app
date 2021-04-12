import React, { Component } from "react";
import {
  Container,
  Input,
  CardBody,
  Card,
  FormGroup,
  Form,
  Label,
  Button,
  Col,
  Row,
  FormText,
} from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";
import {
  editCampaigns,
  getCampaignsPerId,
} from "../../../../actions/campaignActions";
import Swal from "sweetalert2";
import "./EditCampaign.css";

export class EditCampaign extends Component {
  state = {
    modal: false,
    campaigns: [],
    title: "",
    description: "",
    campaignsCreativePic: "",
    base64: "",
    status: true,
    remarks: "",
    createdBy: "",
    startDatePlaceholder: "text",
    endDatePlaceholder: "text",
    startDate: new Date(),
    endDate: new Date(),
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCampaignsPerId(id);
    const { campaignDetails } = this.props.campaign;
    const camp = campaignDetails;
    this.setState({
      title: camp.title,
      description: camp.description,
      campaignsCreativePic: camp.campaignsCreativePic,
      startDate: moment(camp.startDate).format("YYYY-MM-DD"),
      endDate: moment(camp.endDate).format("YYYY-MM-DD"),
      createdBy: camp.createdBy,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.value === e.target.startDate) {
      this.setState({ startDatePlaceholder: "date" });
    }
    if (e.target.endDate) {
      this.setState({ endDatePlaceholder: "date" });
    }
  };

  onChangeCheckBox = (e) => {
    this.setState({ status: !this.state.status });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const {
      title,
      description,
      campaignsCreativePic,
      startDate,
      endDate,
    } = this.state;
    const updCampaigns = {
      id,
      title,
      description,
      campaignsCreativePic,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
    };

    if (updCampaigns.endDate < updCampaigns.startDate) {
      Swal.fire({
        icon: "error",
        text: "End Date cannot be less that Start Date",
        confirmButtonColor: "purple",
      });
    } else {
      const route = this.props.history.push(
        `/admin/campaigns/view-camapign-details/${id}`
      );
      this.props.editCampaigns(id, updCampaigns, route);
    }
  };

  onChangeHandlerForFile = (event) => {
    var file = event.target.files[0];
    var t = file.type.split("/").pop().toLowerCase();
    var size = 1024000;
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.setState({
        campaignsCreativePic: reader.result,
      });
    };

    if (t != "jpeg" && t != "jpg" && t != "png") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please enter *jpeg, *jpg or *png format only",
        confirmButtonColor: "purple",
      });

      document.getElementById("imgFile").value = "";
      const { id } = this.props.match.params;
      this.props.getCampaignsPerId(id);
    }
    if (file.size > size) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Max Upload size is 1MB only",
        confirmButtonColor: "purple",
      });
      document.getElementById("imgFile").value = "";
      const { id } = this.props.match.params;
      this.props.getCampaignsPerId(id);
    }
  };

  goBack = () => {
    window.history.back();
  };
  render() {
    const {
      title,
      description,
      startDate,
      endDate,
      campaignsCreativePic,
    } = this.state;
    return (
      <>
        <Container>
          <h3
            className="pt-3"
            style={{ color: "#910d7d", fontWeight: "780px" }}
          >
            Update Campaigns
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
                        bsSize="sm"
                        onChange={this.onChange}
                        value={title}
                        maxLength="50"
                        required
                      />
                    </Col>

                    <Col>
                      {" "}
                      <Label for="item">Description</Label>
                      <Input
                        type="text"
                        name="description"
                        id="item"
                        bsSize="sm"
                        onChange={this.onChange}
                        value={description}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="item">Start Date </Label>
                      <Input
                        id="startDate"
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
                      <Label for="item">Campaign Creative Picture</Label>
                      <Input
                        type="file"
                        onChange={this.onChangeHandlerForFile}
                        id="imgFile"
                        style={{ fontSize: "17px" }}
                      />
                      <FormText color="muted">
                        <img
                          src={
                            campaignsCreativePic === ""
                              ? process.env.PUBLIC_URL +
                                "/images/imagePlaceholder.PNG"
                              : campaignsCreativePic
                          }
                          height="50"
                          width="50"
                        />
                      </FormText>
                    </Col>
                    <Col>
                      {/* <Label for="item">Remarks </Label>
                      <Input
                        type="textarea"
                        name="remarks"
                        size="sm"
                        onChange={this.onChange}
                        value={remarks}
                        maxLength="70"
                        required
                      />{" "} */}
                    </Col>
                  </Row>{" "}
                  <br />
                  <Button
                    color="dark"
                    style={{ marginTop: "2rem", backgroundColor: "purple" }}
                  >
                    Submit
                  </Button>
                </FormGroup>
              </Form>
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign,
});

export default connect(mapStateToProps, { editCampaigns, getCampaignsPerId })(
  EditCampaign
);
