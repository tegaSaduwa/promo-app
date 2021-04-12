import React, { Component } from "react";
import { Container, Table, Input, Button, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProfileData,
  getUserProfile,
} from "../../../actions/profileActions";
import { baseUrl } from "../../../services/config";
import Swal from "sweetalert2";
import axios from "axios"
import { authHeader } from "../../../utils/auth-header";

export class GetProfile extends Component {
  state = {
    searchField: "",
    campaignDetails: [],
  };
  componentDidMount() {
    this.props.fetchProfileData();
    this.props.getUserProfile();
  }

  onDeleteClick = async (id) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "purple",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Deleted",
          text: "User deleted",
          confirmButtonColor: "purple",
        });
        const requestOptions = {
          method: "GET",
          headers: authHeader(),
        };
        axios.get(`${baseUrl}/UserProfile/DeleteUserProfile/${id}`, requestOptions)
        this.props.history.push("/admin/user-profile")
        setTimeout(()=>{  window.location.reload(); }, 1000);
       

      }
    });
  };
  render() {
    const { userProfile, loading, error } = this.props.userProfile;

    const { searchField } = this.state;

    // const filteredProfile = userProfile.filter((report) =>
    //   report.username.toLowerCase().includes(searchField.toLowerCase())
    // );

    return (
      <div>
        <div>
          <Container>
            {/* <div
              className="col-sm-12 btn btn-info mt-3 mb-4"
              style={{ backgroundColor: "#910d7d" }}
            >
              Campaigns
            </div> */}
            <h3
              className="pt-3"
              style={{ color: "#910d7d", fontWeight: "780px" }}
            >
              User Profiles
            </h3>
            <>
              <div className="d-flex justify-content-between">
                <Link to="/admin/user-profile/add">
                  <Button
                    className="mt-2"
                    color="dark"
                    size="sm"
                    style={{ backgroundColor: "#910d7d" }}
                  >
                    <i className="fas fa-plus pr-1" />
                    New
                  </Button>
                </Link>
                {/* <Input
                  type="search"
                  size="sm"
                  className="col-2"
                  placeholder="search"
                  onChange={(e) =>
                    this.setState({ searchField: e.target.value })
                  }
                /> */}
              </div>
            </>

            {userProfile && (
              <>
                <Table striped className="table mt-2">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                  {userProfile.map(
                      (
                        {
                            id,
                          username
                        },
                        index
                      ) => (
                        <tr key={index} className="clickable-row">
                          <td>{index + 1}</td>
                          <td className="clickable-name">
                              {username}
                            {/* <Link
                            //  style={{textDecoration: "none", color:"black"}}
                              to={`/admin/campaigns/view-camapign-details/${id}`}
                            >
                              {title}
                            </Link> */}
                          </td>
                         <td>
                         <i
                          className="fas fa-trash pl-2"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Delete User"
                          style={{
                            cursor: "pointer",

                            color: "red",
                          }}
                          onClick={this.onDeleteClick.bind(
                            this,
                            id
                          )}
                        />
                         </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
                <>
                  {loading && <h6 color="muted">Loading...</h6>}
                  {error && (
                    <Card>
                      <CardBody>
                        <h6 className="text-danger">
                          Error... <br />
                          something went wrong
                        </h6>
                      </CardBody>
                    </Card>
                  )}
                </>
              </>
            )}
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
userProfile: state.userProfile,
});

export default connect(mapStateToProps, {
    fetchProfileData,
    getUserProfile,
})(GetProfile);
