import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import campaignReducer from "./campaignReducer";
import drawsReducer from "./drawsReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  item: itemReducer,
  campaign: campaignReducer,
  draw: drawsReducer,
  userProfile: profileReducer
});
