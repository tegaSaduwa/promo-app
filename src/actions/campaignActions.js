//where we make request to backend

import {
  GET_CAMPAIGNS,
  EDIT_CAMPAIGN,
  GET_EVENTS_PER_ID,
  ADD_EVENT_TO_CAMPAIGN,
  END_CAMPAIGN,
  GET_CAMPAIGNS_PER_ID,
  ADD_CAMPAIGNS,
  EDIT_EVENT,
  EVENT_UNDER_CAMPAIGNS,
  MAKE_REQUEST,
  ERROR,
} from "../actions/types";
import { authHeader } from "../utils/auth-header";
import { baseUrl } from "../services/config";
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";

export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: MAKE_REQUEST });
  };
};

export const getCampaigns = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios(`${baseUrl}/Campaigns`, requestOptions)
      .then((res) => {
      
        dispatch({
          type: GET_CAMPAIGNS,
          payload: res.data,
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }

        dispatch({ type: ERROR, payload: { error: e } });
      });
  };
};
export const getCampaignsPerId = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios
      .get(`${baseUrl}/Campaigns/${id}`, requestOptions)
      .then((res) =>
        dispatch({
          type: GET_CAMPAIGNS_PER_ID,
          payload: res.data,
        })
      )
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        dispatch({ type: ERROR, payload: { error: e } });
      });
  };
};

export const editCampaigns = (id, updCampaigns, routeback) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios
      .post(
        `${baseUrl}/Campaigns/update/${id}`,
        updCampaigns,

        requestOptions
      )
      .then((res) => {
        dispatch({
          type: EDIT_CAMPAIGN,
          payload: res.data,
        });
        const route = routeback;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Campaign updated",
          confirmButtonColor: "purple",
        });

        window.location.reload();
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:   e.response.data.message? e.response.data.message : "could not update, please try again",
          confirmButtonColor: "purple",
        })
      );
  };
};
export const endCampaigns = (id, body) => {
  return async (dispatch) => {
    try {
      await axios.post(`${baseUrl}/Campaigns/delete/${id}`, {
        body,
      });
      // const data = response.data;
      dispatch({
        type: END_CAMPAIGN,
        payload: id,
      });
    } catch (error) {
      toastr.error(error, "error");
      throw error;
    }
  };
};

export const addCampaigns = (campaignItem, routeBack) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios
      .post(`${baseUrl}/Campaigns/create`, campaignItem, requestOptions)
      .then((res) => {
        dispatch({
          type: ADD_CAMPAIGNS,
          payload: campaignItem,
        });
        const route = routeBack;
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Campaign created",
          confirmButtonColor: "purple",
        });
        window.location.reload();
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:   e.response.data.message? e.response.data.message : "could not create campaign, please try again",
          confirmButtonColor: "purple",
        });
      });
    // const data = response.data;
  };
};

//EVENTS
export const eventsUnderCampaigns = (campaignId) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Events/campaign/${campaignId}`,
        requestOptions
      );
      const data = response.data;
      dispatch({
        type: EVENT_UNDER_CAMPAIGNS,
        payload: data, //
      });
    } catch (error) {
      toastr.error(error, "error");
      throw error;
    }
  };
};
//add event under campaign
export const addEvent = (eventPost, routeback) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios
      .post(`${baseUrl}/Events/create`, eventPost, requestOptions)
      .then((res) => {
        dispatch({
          type: ADD_EVENT_TO_CAMPAIGN,
          payload: eventPost,
        });
        const route = routeback;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Added",
          confirmButtonColor: "purple",
        });

        window.location.reload();
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:   e.response.data.message? e.response.data.message : "could not add, please try again",
          confirmButtonColor: "purple",
        })
      );
  };
};

export const editEvent = (id, updEvents, routeback) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios
      .post(`${baseUrl}/Events/update/${id}`, updEvents, requestOptions)
      .then((res) => {
        dispatch({
          type: EDIT_EVENT,
          payload: res.data,
        });
        const route = routeback;

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Updated",
          confirmButtonColor: "purple",
        });
        window.location.reload();
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:  e.response.data.message? e.response.data.message : "could not update, please try again",
          confirmButtonColor: "purple",
        })
      );
  };
};

export const getEventById = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Events/${id}`,
        requestOptions
      );
      const data = response.data;

      dispatch({
        type: GET_EVENTS_PER_ID,
        payload: data,
      });
    } catch (error) {
      toastr.error(error, "error");
      throw error;
    }
  };
};
