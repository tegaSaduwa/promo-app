import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../services/config";
import { Link } from "react-router-dom";
import { authHeader } from "../../utils/auth-header";

export class DrawsEventSummary extends Component {
  state = {
    modal: false,
    name: "",
    events: [],
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  async componentDidMount() {
    const { id } = this.props;
   
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
    const res = await axios.get(
      `${baseUrl}/Events/campaign/${id}`,
      requestOptions
    );
   

    if (res.data[0] !== undefined) {
      this.setState({
        events: res.data,
      });
    } else {
      // alert("no comp");
      this.setState({
        showComp: false,
        noComp: true,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { events } = this.state;

    return (
      <div>
        <Table striped className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map(
              (
                {
                  id,
                  campaignId,
                  title,
                  description,
                  isCompleted,
                  remainingWinners,
                },
                index
              ) => (
                <tr key={id} className="clickable-row">
                  <td>{index + 1}</td>
                  <td className="clickable-name">{title}</td>
                  <td>
                    {isCompleted === true ? (
                      <Link to={`/perform-draw/${id}`}>
                        <Button size="sm" color="secondary">
                          View Winners
                        </Button>
                      </Link>
                    ) : (
                      <Link to={`/perform-draw/${id}`}>
                        <Button size="sm" color="secondary">
                          Perform Draw
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        {/* </ModalBody>
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //   item: state.item,
});

export default connect(mapStateToProps, {})(DrawsEventSummary);
