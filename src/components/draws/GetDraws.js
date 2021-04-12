import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import React, { Component } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { baseUrl } from "../../services/config";
import Swal from "sweetalert2";
import { authHeader } from "../../utils/auth-header";

export class GetDraws extends Component {
  state = {
    rows: [],
    row: {},
    formattedRow: [],
    show: true,
    isSelect: false,
    pushedRow: [],
    rowIndex: false,
  };

  onAcceptWinners = () => {
    const { rows, pushedRow, isSelect2 } = this.state;

    let sendrows = [];
    pushedRow.map((x) => {
      sendrows.push({ eventId: x.eventId, shortListedCustomerId: x.id });
    });

    let fullRows = [];
    rows.map((x) => {
      fullRows.push({ eventId: x.eventId, shortListedCustomerId: x.id });
    });
    // console.log("full rows", fullRows);

    const requestOptions = {
      method: "POST",
      headers: authHeader(),
    };

    if (isSelect2 === true) {
      axios
        .post(`${baseUrl}/Events/multi/save-winner`, fullRows, requestOptions)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "All Winners saved",
            confirmButtonColor: "purple",
          });

          this.setState({ show: false });
          window.location.reload();
        })
        .catch((e) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: e.response.data.message? e.response.data.message : "could not save, please try again",
            confirmButtonColor: "purple",
          })
        );
    } else {
      axios
        .post(`${baseUrl}/Events/multi/save-winner`, sendrows, requestOptions)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Winners saved",
            confirmButtonColor: "purple",
          });
          // console.log(res.data);
          this.setState({ show: false });
          window.location.reload();
        })
        .catch((e) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text:  e.response.data.message? e.response.data.message : "could not save, please try again",
            confirmButtonColor: "purple",
          })
        );
    }
  };
  render() {
    const columns = [
      {
        dataField: "branchId",
        text: "branchId",
      },
      {
        dataField: "customerName",
        text: "customerName",
      },
      {
        dataField: "accountNumber",
        text: "accountNumber",
      },
      {
        dataField: "mobileNo",
        text: "mobileNo",
      },
    ];

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        let p = [];
        if (isSelect) {
          p = [...this.state.pushedRow, row];
        } else {
          var f = this.state.pushedRow.filter((x) => x.id !== row.id);
          p = f;
        }

        this.setState({ row, isSelect, rowIndex, pushedRow: p });
      },
      onSelectAll: (isSelect, rows, e) => {
        if (isSelect) {
          this.setState({ rows, isSelect2: isSelect });
        } else {
          this.setState({ rows: [], isSelect2: false });
        }
      },
    };

    const { drawsList } = this.props;
    const { show } = this.state;
    //console.log(drawsList);
    return (
      <div className="mt-3 mb-3">
        {show && (
          <Card style={{ background: "#e8e8e8" }}>
            <CardBody>
              <h6>ShortListed</h6>
              <BootstrapTable
                style={{ fontSize: "9px" }}
                keyField="id"
                data={drawsList}
                columns={columns}
                selectRow={selectRow}
                // onClick={}
              />
              <Button
                size="sm"
                color="secondary"
                onClick={this.onAcceptWinners}
              >
                Accept
              </Button>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}
// GetDraws.proptypes {}
export default GetDraws;
