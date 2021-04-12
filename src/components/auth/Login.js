import React, { Component } from "react";
import { Button, Input, Form, FormText } from "reactstrap";
import "./Login.css";
import axios from "axios";
import { baseUrl } from "../../services/config";
import Swal from "sweetalert2";
export class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const userDetails = {
      username: this.state.username,
      password: this.state.password,
    };

    // this.props.history.push("/");
    axios
      .post(`${baseUrl}/Auth/login`, userDetails)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          confirmButtonColor: "purple",
        });
        this.setState({ loading: false });
        sessionStorage.setItem("wm.auth", JSON.stringify(res.data));
        console.log(res.data);
    
        if (res.data?.role === "Admin") {
          this.props.history.push("/admin/user-profile");
        } else if (res.data?.role === "User") {
          this.props.history.push("/");
        } else if (res.data?.role === "Audit") {
          this.props.history.push("/audit-trail");
        }

        window.location.reload();
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.response?.data?.message
            ? e.response?.data?.message
            : "could not login, please try again",
          confirmButtonColor: "purple",
        });
        this.setState({ loading: false });
      });
  };
  render() {
    const { username, password, loading } = this.state;
    return (
      <div>
        <div className="split left">
          <div id="logo">
            <img
              src={process.env.PUBLIC_URL + "/images/wema-logo.PNG"}
              height="65px"
              width="50px"
            />
          </div>
          <div className="centered">
            {/* <img src={img} alt="Avatar woman" /> */}
            <h2 style={{ color: "white", paddingBottom: "9px" }}>
              Promo Portal
            </h2>
            <Form onSubmit={this.onSubmit}>
              <Input
                className="input mb-3"
                type="text"
                name="username"
                onChange={this.onChange}
                placeholder="username"
                value={username}
                required
              />
              <Input
                className="input mb-1"
                type="password"
                name="password"
                onChange={this.onChange}
                placeholder="password"
                value={password}
                required
              />
              <Button
                className="btn-block"
                style={{ color: "white", backgroundColor: "black" }}
              >
                log in
              </Button>
              {loading && <FormText>Loading...</FormText>}
            </Form>
          </div>
        </div>

        <div className="split right">
          <div className="centered">
            <img
              src={process.env.PUBLIC_URL + "/images/doc.svg"}
              alt="Avatar man"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
