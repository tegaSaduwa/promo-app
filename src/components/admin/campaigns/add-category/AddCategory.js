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
} from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";
import { editCampaigns } from "../../../../actions/campaignActions";
import toastr from "toastr";
import { baseUrl } from "../../../../services/config";
import axios from "axios";

export class AddCategory extends Component {
  state = {
    name: "",
    description: "",
    status: true,
    createDate: "",
    completeDate: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
   
  };

  onChangeCheckBox = (e) => {
    this.setState({ status: !this.state.status });
   
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    const updCampaigns = {
      name,
      description,
    };

    const { id } = this.props.match.params;
    //some action here
    // this.props.editCampaigns(id, updCampaigns);
    this.props.history.push(`/admin/campaigns`);
  };
  render() {
    const { name, description } = this.state;
    return (
      <Container>
        <div
          className="col-sm-12 btn btn-info mt-3 mb-4"
          style={{ backgroundColor: "#910d7d" }}
        >
          Add Category to campaigns
        </div>
        <Card>
          <CardBody style={{ backgroundColor: "#e8e8e8" }}>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Row>
                  <Col>
                    {" "}
                    <Label for="item">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      value={name}
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
                      onChange={this.onChange}
                      value={description}
                      required
                    />
                  </Col>
                </Row>

                <br />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem", backgroundColor: "purple" }}
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>{" "}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

// const mapStateToProps = (state) => ({
//   campaign: state.campaign,
// });

export default connect(null, {})(AddCategory);
