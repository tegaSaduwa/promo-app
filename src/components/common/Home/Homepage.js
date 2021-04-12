import React, { Component } from "react";
import "./Homepage.css";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

export class Homepage extends Component {
  render() {
    return (
      <>
        {/* <Row>
        <Col className="text-center mt-3 pt-2">
            <Link
              to={`/active-campaigns`}
              style={{ color: "purple", textDecoration: "none" }}
            >
              <div className="third-box">
                <div className="Line">
                  {" "}
                  <h3>Current Campaigns</h3>
                </div>
              </div>
            </Link>
          </Col>
         
        </Row> */}
        <Row>
          <Col className="text-center mt-5 pt-3">
            <Link
              to={`/admin/campaigns`}
              style={{ color: "purple", textDecoration: "none" }}
            >
              {/* <i className="lnr lnr-license fs-40"></i>
              <h3>Campaigns</h3>
              <i className="lnr lnr-license fs-40"></i> */}
              <div className="first-box">
                <div className="Line">
                  {" "}
                  <h4>Manage Campaigns</h4>
                </div>
              </div>
            </Link>
          </Col>
          <Col className="text-center mt-5 pt-3">
            <Link
              to={`/draws`}
              style={{ color: "purple", textDecoration: "none" }}
            >
              {/* <i className="lnr lnr-star fs-40"></i>
              <h3>Draws</h3>
              <i className="lnr lnr-star fs-40"></i> */}
              <div className="second-box">
                <div className="Line">
                  <h4 style={{ paddingTop: "22px", paddingBottom: "8px" }}> Draws</h4>
               
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </>
    );
  }
}

export default Homepage;
