import React, { Component } from "react";
import img from "../../images/multicolor-load.gif";

export class Loading extends Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-center pt-1 pr-4 mr-1">
          <img src={img} alt="alt" />
        </div>
      </div>
    );
  }
}

export default Loading;
