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
} from "reactstrap";
import moment from "moment"
import { connect } from "react-redux";
import { addEvent } from "../../../../actions/campaignActions";
import Swal from "sweetalert2";

export class AddEvent extends Component {
  state = {
    id: "",
    name: "",
    description: "",
    status: false,
    category: "",
    noOfWinners: "",
    remarks: "",
    createdBy: "",
    startDate: null,
    endDate: null,
    eventId: [],
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    
  };

  onChangeCheckBox = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  onChangeForFile = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        // base64: reader.result,
      });
    };
  };
  onSubmit = async (e) => {
    const { id } = this.props.match.params;
    e.preventDefault();

    const {
      title,
      description,
      noOfWinners,
      startDate,
      endDate,
    } = this.state;
   // var json = JSON.stringify(startDate); console.log(json); // "2014-01-01T23:28:56.782Z"
    const eventItems = {
      title,
      description,
      numberOfWinner: Number(noOfWinners),
      campaignId: id,
      startDate : moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
    };
    if (eventItems.endDate < eventItems.startDate) {
      Swal.fire({
        icon: "error",
        text: "End Date cannot be less that Start Date",
        confirmButtonColor: "purple",
      });
    } else {
      const routeBack = this.props.history.push(
        `/admin/campaigns/view-camapign-details/${id}`
      );
      this.props.addEvent(eventItems, routeBack);
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
      noOfWinners,
      createdBy,
      file,
    } = this.state;
    return (
      <div>
        <Container>
          <h3
            className="pt-3"
            style={{ color: "#910d7d", fontWeight: "780px" }}
          >
            Create Event
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
                        id="item"
                        size="sm"
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
                    <Col className="col-6">
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
                        onChange={this.onChange}
                        value={remarks || ""}
                        maxLength="50"
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

                <footer onClick={this.goBack}>
                  <i
                    className="fas fa-arrow-circle-left mt-2"
                    style={{ color: "purple", cursor: "pointer" }}
                  >
                    back
                  </i>
                </footer>
              </Form>{" "}
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //   item: state.item,
});

export default connect(null, { addEvent })(AddEvent);
