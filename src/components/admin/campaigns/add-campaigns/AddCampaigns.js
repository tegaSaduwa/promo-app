import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  Container,
  FormText,
} from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";
import { addCampaigns } from "../../../../actions/campaignActions";
import Swal from "sweetalert2";

export class AddCampaign extends Component {
  state = {
    modal: false,
    campaigns: [],
    title: "",
    description: "",
    campaignsCreativePic:
      process.env.PUBLIC_URL + "/images/imagePlaceholder.PNG",
    base64: "",
    status: true,
    remarks: "",
    createdBy: "",
    startDate: new Date(),
    endDate: new Date(),
    uploading: false,
    file: [],
    disable: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ disable: true });
    const {
      title,
      description,
      campaignsCreativePic,
      startDate,
      endDate,
    } = this.state;
    const campaignItem = {
      title,
      description,
      campaignsCreativePic,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
    };
    if (campaignItem.endDate < campaignItem.startDate) {
      Swal.fire({
        icon: "error",
        text: "End Date cannot be less that Start Date",
        confirmButtonColor: "purple",
      });
      this.setState({ disable: false });
    } else {
      const routeBack = this.props.history.push("/admin/campaigns");
      const addC = this.props.addCampaigns(campaignItem, routeBack);
    }
  };
  onChangeCheckBox = () => {
    this.setState({
      status: !this.state.status,
    });
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
      this.setState({
        campaignsCreativePic:
          process.env.PUBLIC_URL + "/images/imagePlaceholder.PNG",
      });
    }
    if (file.size > size) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Max Upload size is 1MB only",
        confirmButtonColor: "purple",
      });
      document.getElementById("imgFile").value = "";
      this.setState({
        campaignsCreativePic:
          process.env.PUBLIC_URL + "/images/imagePlaceholder.PNG",
      });
    }
  };

  goBack = () => {
    window.history.back();
  };
  render() {
    const { title, description, startDate, endDate } = this.state;
    return (
      <>
        <Container>
         
          <h3
            className="pt-3"
            style={{ color: "#910d7d", fontWeight: "780px" }}
          >
            Add Campaigns
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
                        type="textarea"
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
                        id="imgFile"
                        type="file"
                        onChange={this.onChangeHandlerForFile}
                        style={{ fontSize: "17px" }}
                      
                      />
                      <FormText color="muted">
                        <img
                          src={this.state.campaignsCreativePic}
                          height="50"
                          width="60"
                        />
                        <br />

                        <small style={{ color: "red" }}>
                          {" "}
                          *Accepted image format (*jpg, *jpeg and *png not
                          greater than 1MB){" "}
                        </small>
                      </FormText>{" "}
                    </Col>
                    <Col>
                      {/* <Label for="item">Remarks </Label>
                      <Input
                        type="textarea"
                        name="remarks"
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
                    disabled={this.state.disable}
                  >
                    Submit
                  </Button>
                  <footer onClick={this.goBack}>
                    <i
                      className="fas fa-arrow-circle-left mt-2"
                      style={{ color: "purple", cursor: "pointer" }}
                    >
                      back
                    </i>
                  </footer>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  //   item: state.item,
});

export default connect(null, { addCampaigns })(AddCampaign);
