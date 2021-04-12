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

export class CreateCategory extends Component {
  state = {
    name: "",
    description: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  
  };
  onSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
  };
  render() {
    const { name, description } = this.state;
    return (
      <div>
        <Container>
          <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
          >
            Add Category
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
      </div>
    );
  }
}

export default CreateCategory;
