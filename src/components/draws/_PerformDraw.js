import React, { Component } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Container,
} from "reactstrap";
import { baseUrl } from "../../services/config";
import axios from "axios";
import SelectWinner from "./SelectWinner";

export class _PerformDraw extends Component {
  performDraw = async () => {
    const { id } = this.props.match.params;
    console.log(id);
    const res = await axios.post(`${baseUrl}/Draws/run/${id}`);
    console.log(res.data);
  };
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <Container>
          <div
            className="col-sm-12 btn btn-info mt-3 mb-4"
            style={{ backgroundColor: "#910d7d" }}
            onClick={this.performDraw}
          >
            Perform Draws
          </div>
          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  {/* <Row>
                    <Col>
                      <p>
                        {" "}
                        <span className="h6">Status:</span> dropdown (end
                        campaign)
                      </p>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span className="h6">LOGO:</span> Campaign Creative
                        Picture
                      </p>
                    </Col>

                    <Col>
                      <p>
                        {" "}
                        <span className="h6">Title:</span> Campaign Title
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>
                        {" "}
                        <span className="h6">Event Title:</span> Event Title
                      </p>
                      <SelectWinner id={id} />
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default _PerformDraw;
