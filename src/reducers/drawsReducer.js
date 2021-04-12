import {
  GET_DRAWS,
  GET_DRAWS_BY_ID,
  DRAWS_EVENT_SUMMARY,
  MAKE_DRAWS_REQUEST,
  DRAWS_ERROR,
  PERFORM_DRAW,
  RUN_DRAWS,
  SAVE_WINNERS,
  GET_CURR_CAMPAIGNS,
  GET_SHORTLISTED_CUSTOMERS,
  GET_WiNNERS
} from "../actions/types";
const initialState = {
  draws: [],
  drawsDetails: [],
  events: [],
  loading: false,
  error: false,
  performDraws: [],
  rundraws: [],
  shortlisted: [],
  show: true,
  winners: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MAKE_DRAWS_REQUEST:
      return {
        loading: true,
        draws: [],
        drawsDetails: [],
        rundraws: [],
        performDraws: [],
        shortlisted: [],
        winners: []
      };
    case GET_DRAWS:
      return {
        ...state,
        draws: action.payload,
        loading: false,
      };
      case GET_SHORTLISTED_CUSTOMERS:
        return {
          ...state,
          shortlisted: action.payload,
          loading: false,     
        };
      
      case GET_CURR_CAMPAIGNS:
      return {
        ...state,
        draws: action.payload,
        loading: false,
      };

      case GET_WiNNERS:
        return {
          ...state,
          winners: action.payload,
          loading: false,
        };
    case DRAWS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        draws: [],
      };

    case GET_DRAWS_BY_ID:
      return {
        ...state,
        drawsDetails: action.payload,
        loading: false,
      };

    case DRAWS_EVENT_SUMMARY:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };

    case PERFORM_DRAW:
      return {
        ...state,
        performDraws: action.payload,
        loading: false,
      };

    case RUN_DRAWS:
      return {
        ...state,
        rundraws: action.payload,
        loading: false,
      };
    case SAVE_WINNERS:
      return {
        ...state,
        rundraws: [action.payload, ...state.performDraws.eventWinners],

        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
}
