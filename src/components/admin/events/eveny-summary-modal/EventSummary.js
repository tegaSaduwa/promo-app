import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { eventsUnderCampaigns } from "../../../../actions/campaignActions";
import moment from "moment";

export class EventSummaryModal extends Component {
  state = {
    modal: false,
    name: "",
    events: [],
  };

  async componentDidMount() {
    const { id } = this.props;
    this.props.eventsUnderCampaigns(id);
    //console.log(id);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { events, loading } = this.props.campaign;
    return (
      <div>
        {events && (
          <Table striped className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th> 
                <th>No of winners</th>
                <th>StartDate</th> 
                <th>End Date</th>
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
                    startDate,
                    numberOfWinner,
                    endDate,
                  },
                  index
                ) => (
                  <tr key={id} className="clickable-row">
                    <td>{index + 1}</td>
                    <td className="clickable-name">
                      <Link to={`/admin/campaigns/event-details/${id}`}>
                        {title}
                      </Link>
                    </td>
                    <td>{description.toLowerCase()}</td>
                    <td>{numberOfWinner}</td>
                    <td>{moment(startDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(endDate).format("DD/MM/YYYY")}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        )}
        {loading && <h6>Loading...</h6>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign,
});

export default connect(mapStateToProps, { eventsUnderCampaigns })(
  EventSummaryModal
);
