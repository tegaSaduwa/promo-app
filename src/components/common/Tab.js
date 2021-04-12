import React, { Component } from "react";

import BootstrapTable from "react-bootstrap-table-next";

import axios from "axios";

import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import paginationFactory from "react-bootstrap-table2-paginator";

import cellEditFactory from "react-bootstrap-table2-editor";

export class Bootstraptab extends Component {
  state = {
    employee: [],

    columns: [
      {
        dataField: "id",

        text: "Id",
      },

      {
        dataField: "name",

        text: "Name",

        filter: textFilter(),
      },
      {
        dataField: "username",

        text: "Username",

        sort: true,
      },

      {
        dataField: "Address",

        text: "Address",

        sort: true,
      },

      {
        dataField: "City",

        text: "City",

        sort: true,
      },

      {
        dataField: "ContactNum",

        text: "ContactNum",

        sort: true,
      },

      {
        dataField: "Email",

        text: "Salary",

        sort: true,
      },

      {
        dataField: "Department",
        text: "Department",

        sort: true,
      },
    ],
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      this.setState({
        employee: response.data,
      });
    });
  }

  render() {
    const options = {
      page: 1,
      sizePerPageList: [
        {
          text: "5",
          value: 5,
        },
        {
          text: "10",
          value: 10,
        },
        {
          text: "All",
          value: this.state.employee.length,
        },
      ],

      sizePerPage: 5,

      pageStartIndex: 0,

      paginationSize: 3,

      prePage: "Prev",

      nextPage: "Next",

      firstPage: "First",

      lastPage: "Last",
    };

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        // window.location.reload();
        window.history.forward();
      },
    };
    return (
      <div className="container">
        <div class="row" className="hdr">
          <div
            class="col-sm-12 btn btn-info mt-3 "
            style={{ backgroundColor: "#910d7d" }}
          >
            Draws
          </div>
        </div>

        <div style={{ marginTop: 20, cursor: "pointer" }}>
          <BootstrapTable
            striped
            hover
            keyField="id"
            data={this.state.employee}
            columns={this.state.columns}
            filter={filterFactory()}
            pagination={paginationFactory(options)}
            // cellEdit={cellEditFactory({
            //   mode: "click",
            //   blurToSave: true,
            // })}
            rowEvents={rowEvents}
          />
        </div>
      </div>
    );
  }
}

export default Bootstraptab;
