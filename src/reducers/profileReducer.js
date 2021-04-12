import {
  MAKE_PROFILE_REQUEST,
  GET_USER_PROFILE,
  PROFILE_ERROR,
  GET_USER_PROFILE_BY_USERNAME,
  ADD_USER_PROFILE,
} from "../actions/types";

const initialState = {
  userProfile: [],
  loading: false,
  error: false,
  show: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MAKE_PROFILE_REQUEST:
      return {
        loading: true,
        userProfile: [],
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        userProfile: [],
      };

    default:
      return {
        ...state,
      };
  }
}
