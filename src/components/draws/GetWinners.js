import React, { Component } from "react";
import { Table, Card, CardBody, Container } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../services/config";

export class GetWinners extends Component {
  state = {
    modal: false,
    name: "",
    winners: [],
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    //console.log(id);

    const res = await axios.get(`${baseUrl}/Events/winners/${id}`);
    //console.log(res.data);

    if (res.data[0] !== undefined) {
      this.setState({
        winners: res.data,
      });
    } else {
      // alert("no comp");
      this.setState({
        showComp: false,
        noComp: true,
      });
    }
  }

  onAcceptWinners = async (eventId, shortListedCustomerId) => {
    const res = await axios.post(`${baseUrl}/Events/save-winner`, {
      eventId: eventId,
      shortListedCustomerId: shortListedCustomerId,
    });
    console.log(res.data);
  };

  render() {
    const { winners } = this.state;
    return (
      <div>
        <Container>
        <h3
              className="pt-3"
              style={{ color: "#910d7d", fontWeight: "780px" }}
            >
              Winners
            </h3>
          <Card>
            <CardBody style={{ backgroundColor: "#e8e8e8" }}>
              <Table striped className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Event ID</th>
                  </tr>
                </thead>
                <tbody>
                  {winners.map(
                    ({ id, eventId, shortListedCustomerId }, index) => (
                      <tr key={id} className="clickable-row">
                        <td>{index + 1}</td>
                        <td className="clickable-name">
                          <Link
                            to={`/shortlistedCustomer-details/${shortListedCustomerId}`}
                          >
                            {shortListedCustomerId}
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //   item: state.item,
});

export default connect(mapStateToProps, {})(GetWinners);
