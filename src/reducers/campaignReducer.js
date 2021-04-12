import {
  MAKE_REQUEST,
  GET_CAMPAIGNS,
  ADD_EVENT_TO_CAMPAIGN,
  ADD_CAMPAIGNS,
  END_CAMPAIGN,
  EDIT_CAMPAIGN,
  EVENT_UNDER_CAMPAIGNS,
  GET_CAMPAIGNS_PER_ID,
  EDIT_EVENT,
  GET_EVENTS_PER_ID,
  ERROR,
} from "../actions/types";
const initialState = {
  campaigns: [],
  events: [],
  eventDetails: [],
  campaignDetails: [],
  loading: false,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        loading: true,
        campaigns: [],
        campaignDetails: [],
        events: [],
        eventDetails: [],
      };
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
        loading: false,
      };
    case GET_CAMPAIGNS_PER_ID:
      return {
        ...state,
        campaignDetails: action.payload,
      };

    case EVENT_UNDER_CAMPAIGNS:
      return {
        ...state,
        events: action.payload,
      };

    case END_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.filter((item) => item.id !== action.payload),
      };

    case ADD_CAMPAIGNS:
      return {
        ...state,
        campaigns: [action.payload, ...state.campaigns],
      };

    case EDIT_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === action.payload.id
            ? (campaign = action.payload)
            : campaign
        ),
      };

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        campaigns: [],
      };

    case GET_EVENTS_PER_ID:
      return {
        ...state,
        eventDetails: action.payload,
      };

    case ADD_EVENT_TO_CAMPAIGN:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };

    case EDIT_EVENT:
      return {
        ...state,
        events: state.events.map((ev) =>
          ev.id === action.payload.id ? (ev = action.payload) : ev
        ),
      };

    default:
      return {
        ...state,
      };
  }
}
