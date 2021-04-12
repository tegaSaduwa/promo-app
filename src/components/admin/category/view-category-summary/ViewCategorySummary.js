import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Container,
  Button,
} from "reactstrap";
import "./ViewCategorySummary.css";
import CreateCategory from "../create-category/CreateCategory";

export class ViewCategorySummary extends Component {
  state = {
    showAddComponent: false,
  };
  render() {
    const { id } = this.props.match.params;
    console.log(id);
    return (
      <div>
        <Container>
          <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
          >
            Category Summary
          </div>

          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              {/* <Button
                size="sm"
                className="mb-3"
                style={{ backgroundColor: "purple" }}
                onClick={() =>
                  this.setState({
                    showAddComponent: !this.state.showAddComponent,
                  })
                }
              >
                + Add New
              </Button> */}
              {this.state.showAddComponent && <CreateCategory id={id} />}
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span className="h6">ID:</span> id
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span className="h6">Name:</span> name
                      </p>
                    </Col>

                    <Col>
                      <p>
                        {" "}
                        <span className="h6">Description:</span> description
                      </p>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
              <footer>
                <small>
                  <Link to={`/admin/campaigns/category-details/${id}`}>
                    View Category Details
                  </Link>
                </small>
              </footer>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default ViewCategorySummary;
