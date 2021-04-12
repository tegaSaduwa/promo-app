import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  ModalBody,
  Row,
  CardBody,
} from "reactstrap";
import Loading from "./Loading";
import axios from "axios";

import Reel from "react-reel";
import DisplayWinners from "./DisplayWinners";
import { baseUrl } from "../../services/config";
const theme = {
  reel: {
    height: "1em",
    display: "flex",
    alignItems: "flex-end",
    overflowY: "hidden",
    fontSize: "100px",
    fontWeight: "500",
    color: "purple",
    lineHeight: "0.95em",
  },
  group: {
    // transitionDelay: "0ms",
    transitionDelay: "-10000ms",
    transitionTimingFunction: "ease-in-out",
    transform: "translate(0, 0)",
    height: "1em",
  },
  number: {
    height: "1em",
  },
};

export class SelectWinner extends Component {
  state = {
    modal: false,
    showDrumRolls: true,
    name: "",
    description: "",
    showWinnerComp: false,
  };
  toggle = async () => {
    this.setState({
      modal: !this.state.modal,
    });
    setTimeout(this.setDrumsTofalse, 1000);
    const { id } = this.props;
    const res = await axios.post(`${baseUrl}/Draws/run/${id}`);
    // console.log(res.data, updCampaigns);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  showWinners = () => {
    this.toggle();
    this.setState({
      showWinnerComp: true,
    });
  };
  setDrumsTofalse = () => {
    this.setState({
      showDrumRolls: false,
    });
  };

  render() {
    return (
      <div>
        <Button color="light" onClick={this.toggle} size="sm">
          <i className="fas fa-star pr-1" />
          Perform Draw
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Drum Rolls</ModalHeader>
          <ModalBody>
            {this.state.showDrumRolls ? (
              <img
                style={{ marginLeft: "117px", width: "40%", height: "125px" }}
                src="https://www.animatedimages.org/data/media/398/animated-drum-image-0063.gif"
              />
            ) : (
              <>
                <div className="d-flex justify-content-center">
                  <span>
                    And the winner is....???
                    <Reel
                      text="97"
                      theme={theme}
                      style={{ marginLeft: "40px" }}
                    />{" "}
                  </span>
                </div>
                <Button size="sm" color="secondary" onClick={this.showWinners}>
                  View Winner
                </Button>
              </>
            )}
          </ModalBody>
        </Modal>
        <br />
        {this.state.showWinnerComp && (
          <div className="mt-5">
            <DisplayWinners />
          </div>
        )}
      </div>
    );
  }
}

export default SelectWinner;
