import {
  GET_DRAWS_BY_ID,
  GET_DRAWS,
  DRAWS_ERROR,
  DRAWS_EVENT_SUMMARY,
  MAKE_DRAWS_REQUEST,
  PERFORM_DRAW,
  RUN_DRAWS,
  SAVE_WINNERS,
  GET_CURR_CAMPAIGNS,
  GET_SHORTLISTED_CUSTOMERS,
  GET_WiNNERS

} from "../actions/types";
import { baseUrl } from "../services/config";
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import { authHeader } from "../utils/auth-header";

export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: MAKE_DRAWS_REQUEST });
  };
};

export const getdraws = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios(`${baseUrl}/Campaigns`, requestOptions)
      .then((res) =>
        dispatch({
          type: GET_DRAWS,
          payload: res.data,
        })
      )
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        dispatch({ type: DRAWS_ERROR, payload: { error: e } });
      });
  };
};

export const getCurrCampaigns = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios(`${baseUrl}/Campaigns/active`, requestOptions)
      .then((res) =>
        dispatch({
          type: GET_CURR_CAMPAIGNS,
          payload: res.data,
        })
      )
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        dispatch({ type: DRAWS_ERROR, payload: { error: e } });
      });
  };
};

export const getdrawsbyId = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Campaigns/${id}`,
        requestOptions
      );
      const data = response.data;
      dispatch({
        type: GET_DRAWS_BY_ID,
        payload: data,
      });
    } catch (error) {
      toastr.error(error, "error");
      throw error;
    }
  };
};

export const drawsEventSummary = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${baseUrl}/Events/campaign/${id}`,
        requestOptions
      );
      const data = response.data;
      //console.log(response.data);
      dispatch({
        type: DRAWS_EVENT_SUMMARY,
        payload: data,
      });
    } catch (error) {
      toastr.error(error, "error");
      throw error;
    }
  };
};

export const performDraws = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios
      .get(`${baseUrl}/Events/${id}`, requestOptions)
      .then((res) => {
        dispatch({
          type: PERFORM_DRAW,
          payload: res.data,
        });
        //console.log(res.data);
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          text: e,
          confirmButtonColor: "purple",
        })
      );
  };
};

export const rundraws = (id) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return async (dispatch) => {
    // console.log(`${baseUrl}/Draws/run/${id}`, requestOptions);
    const data = {};
    axios
      .post(`${baseUrl}/Draws/run/${id}`, data, requestOptions)
      .then((res) => {
        dispatch({
          type: RUN_DRAWS,
          payload: res.data,
        });
        // console.log(`${baseUrl}/Draws/run/${id}`,"draws ran", res.data);
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Something went wrong, couldn't run draws",
          confirmButtonColor: "purple",
        });
        // console.log(e);
      });
  };
};

export const saveWinners = (arrayOfWinners) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios
      .post(
        `${baseUrl}/Events/multi/save-winner`,
        arrayOfWinners,
        requestOptions
      )
      .then((res) => {
        dispatch({
          type: SAVE_WINNERS,
          payload: res.data,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Winners saved",
          confirmButtonColor: "purple",
        });
        // console.log(res.data);
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: e,
          confirmButtonColor: "purple",
        })
      );
  };
};

export const getShortListedCustomers = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios(`${baseUrl}/ShortListed/ByEvent/${id}`, requestOptions)
      .then((res) =>
        {
          //console.log("shortlisted", res.data)
          dispatch({
          type: GET_SHORTLISTED_CUSTOMERS,
          payload: res.data,
        })}
      )
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
       // dispatch({ type: DRAWS_ERROR, payload: { error: e } });
      });
  };
};

export const getWinnersDownload = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return async (dispatch) => {
    axios.get(`${baseUrl}/Events/winners/${id}`, requestOptions)
      .then((res) =>
        {
          let winners = [];
          res.data.map((x) => {
            winners.push(x.shortListedCustomer);
          });
          dispatch({
          type: GET_WiNNERS,
          payload: winners,
        })}
      )
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
       // dispatch({ type: DRAWS_ERROR, payload: { error: e } });
      });
  };
};
