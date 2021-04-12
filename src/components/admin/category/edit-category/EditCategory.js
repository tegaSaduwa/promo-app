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

export class EditCategory extends Component {
  state = {
    name: "",
    description: "",
  };
  async componentDidMount() {
    // const { id } = this.props.match.params;
    // const res = await axios.get(`${baseUrl}/databases/${id}`);
    // const camp = res.data;
    // this.setState({
    //   id: camp.id,
    //   name: camp.name,
    //   status: camp.status,
    //   createDate: camp.createDate,
    //   completeDate: camp.completeDate,
    // });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  render() {
    const { name, description } = this.state;
    return (
      <Container>
        <div
          className="col-sm-12 btn btn-info mt-3 mb-4"
          style={{ backgroundColor: "#910d7d" }}
        >
          Edit Category
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

export default EditCategory;
