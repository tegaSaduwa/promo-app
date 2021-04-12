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
import CreateNewEvent from "../create-new-event/CreateNewEvent";

export class ViewEventSummary extends Component {
  state = {
    showAddComponent: false,
  };
  render() {
    const { id } = this.props.match.params;

    return (
      <div>
        <Container>
          {/* <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
          >
            Event Summary
          </div> */}
           <h3
              className="pt-3"
              style={{ color: "#910d7d", fontWeight: "780px" }}
            >
              Event Summary
            </h3>

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
              {this.state.showAddComponent && <CreateNewEvent id={id} />}
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span className="h6">ID:</span>
                        {id}
                      </p>
                    </Col>

                    <Col>
                      <p>
                        {" "}
                        <span className="h6">Name:</span>name
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span className="h6">Description:</span> description
                      </p>
                    </Col>

                    <Col>
                      <p>
                        {" "}
                        <span className="h6">Status:</span>Completed
                      </p>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
              <footer>
                <small>
                  <Link to={`/admin/campaigns/event-details/${id}`}>
                    View Event Details
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

export default ViewEventSummary;
