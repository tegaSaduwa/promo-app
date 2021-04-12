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
import "./ViewCategoryDetails.css";
import CreateNewEvent from "../../events/create-new-event/CreateNewEvent";

export class ViewCategoryDetails extends Component {
  state = {
    showAddComponent: false,
  };
  render() {
    const { id } = this.props.match.params;
   
    return (
      <div>
        <Container>
          <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
          >
            Category Details
          </div>

          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <Button
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
              </Button>
              {this.state.showAddComponent && <CreateNewEvent id={id} />}
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
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
                <small>Data (Upload Data & clear Data)</small>
                <Link to={`/admin/campaigns/edit-category/${id}`}>
                  <i
                    className="fas fa-edit d-flex justify-content-end"
                    style={{ color: "purple" }}
                  ></i>
                </Link>
              </footer>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default ViewCategoryDetails;
