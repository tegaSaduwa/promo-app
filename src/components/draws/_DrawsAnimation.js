import React, { Component } from "react";

export class DrawsAnimation extends Component {
  state = {
    string: "hi there",
  };
  componentDidMount() {
    // Define the string
    // var string = "Hello World!";

    // Encode the String
    var encodedString = btoa(this.state.string);
   
    this.setState({
      string: encodedString,
    });
    // Decode the String
    var decodedString = atob(encodedString);
   
  }
  render() {
    return <div>{this.state.string}</div>;
  }
}

export default DrawsAnimation;
