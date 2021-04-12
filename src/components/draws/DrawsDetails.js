import React, { Component } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Row,
  Col,
  Container,
  Media,
} from "reactstrap";
import { DrawsEventSummary } from "./DrawEventSummary";
import { getdrawsbyId } from "../../actions/drawsActions";
import { connect } from "react-redux";

export class DrawsDetails extends Component {
  state = {
    campaignDetails: [],
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getdrawsbyId(id);//
  }

  goBack = () => {
    window.history.back();
  };
  render() {
    const { id } = this.props.match.params;
    const { drawsDetails } = this.props.draw;

    return (
      <div>
        <Container>
          <h3
            className="pt-3"
            style={{ color: "#910d7d", fontWeight: "780px" }}
          >
            Draws Details
          </h3>
          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
                  <Media>
                    <Media left href={drawsDetails.campaignsCreativePic}>
                      <Media
                        object
                         src={drawsDetails.campaignsCreativePic}
                         width="450"
                         height="200"
                         alt="Campaign Picture"
                      />
                    </Media>
                    <Media body style={{ color: "purple" }} className="ml-2">
                      <Media heading>{drawsDetails.title}</Media>
                      <small className="mr-2" >
                        {" "}
                        {drawsDetails.description}
                      </small>
                    </Media>
                  </Media>
                  {/* <Row>
                    <Col
                      style={{
                        backgroundImage: `url(${drawsDetails.campaignsCreativePic})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></Col>
                    <Col>
                      <h6 className="h4" style={{ color: "purple" }}>
                        {" "}
                        {drawsDetails.title}
                      </h6>
                      <small className="mr-2" style={{ color: "purple" }}>
                        {" "}
                        {drawsDetails.description}
                      </small>
                    </Col>
                  </Row> */}
            </CardBody>
            <br />

            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <h5>Events</h5>
              <DrawsEventSummary id={id} />
              <footer onClick={this.goBack}>
                <i
                  className="fas fa-arrow-circle-left mt-3"
                  style={{ color: "purple", cursor: "pointer" }}
                >
                  back
                </i>
              </footer>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  draw: state.draw,
});

export default connect(mapStateToProps, { getdrawsbyId })(DrawsDetails);
