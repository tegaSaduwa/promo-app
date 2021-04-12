import React, { Component } from "react";
import { Table, Button, Card, CardBody } from "reactstrap";

export class DisplayWinners extends Component {
  state = {
    customer: [
      {
        id: 1,
        name: "Oghenetega",
        number: "08091677010",
        isChecked: false,
      },
      {
        id: 2,
        name: "Oghenetega",
        number: "08091677010",
        isChecked: false,
      },
    ],

    allChecked: false,
  };

  handleAllChecked = (event) => {
    let customer = this.state.customer;
    customer.forEach(
      (customers) => (customers.isChecked = event.target.checked)
    );
    this.setState({ customer: customer });
  };

  handleCheckChieldElement = (event) => {
    let customer = this.state.customer;
    customer.forEach((cus) => {
      if (cus.value === event.target.value)
        cus.isChecked = event.target.checked;
    });
    this.setState({ customer: customer });
  };

  render() {
    const { customer, isChecked, allChecked } = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            <h6>Winner</h6>
            <Table striped className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customer.map(({ id, name, number }, index) => (
                  <tr key={id} className="clickable-row">
                    <td> {index + 1}</td>
                    <td className="clickable-name">{name.toLowerCase()}</td>
                    <td className="clickable-name">{number.toLowerCase()}</td>
                    <td>
                      {" "}
                      <Button size="sm" color="secondary">
                        Accept
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DisplayWinners;
