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
import { connect } from "react-redux";
import { addUserProfile } from "../../../actions/profileActions";

export class CreateProfile extends Component {
  state = {
   username: ""
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      username
    } = this.state;
    const campaignItem = {
     username
    };
    const routeBack = this.props.history.push("/admin/user-profile");
    const addC = this.props.addUserProfile(campaignItem, routeBack);
  };
 
 goBack = () => {
  window.history.back();
};
  render() {
    const {
    username
    } = this.state;
    return (
      <>
        <Container>
          {/* <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
          >
            Add Campaigns
          </div> */}
          <h3
              className="pt-3"
              style={{ color: "#910d7d", fontWeight: "780px" }}
            >
              Add User profile
            </h3>
          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Row>
                    <Col className="col-6">
                      {" "}
                      <Label for="item">Username</Label>
                      <Input
                        type="text"
                        name="username"
                        size="sm"
                        onChange={this.onChange}
                        value={username}
                        maxLength="50"
                        required
                      />
                    </Col>
                  </Row>
             
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


export default connect(null, { addUserProfile })(CreateProfile);

