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

export class CreateNewEvent extends Component {
  state = {
    id: "",
    name: "",
    description: "",
    status: "",
    category: "",
    noOfWinners: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  onSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
  };
  render() {
    const { id, name, description, status, category, noOfWinners } = this.state;
    return (
      <div>
        <Container>
          {/* <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
          >
            Create Event
          </div> */}
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
                      <Label for="item">Id</Label>
                      <Input
                        type="text"
                        name="id"
                        onChange={this.onChange}
                        value={id}
                        required
                      />
                    </Col>

                    <Col>
                      {" "}
                      <Label for="name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        value={name}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {" "}
                      <Label for="description">Description</Label>
                      <Input
                        type="text"
                        name="description"
                        onChange={this.onChange}
                        value={description}
                        required
                      />
                    </Col>

                    <Col>
                      {" "}
                      <Label for="Status">Status</Label>
                      <Input
                        type="text"
                        name="status"
                        id="status"
                        onChange={this.onChange}
                        value={status}
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
      </div>
    );
  }
}

export default CreateNewEvent;
