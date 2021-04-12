import {
MAKE_PROFILE_REQUEST,
GET_USER_PROFILE,
PROFILE_ERROR,
GET_USER_PROFILE_BY_USERNAME,
ADD_USER_PROFILE
  } from "../actions/types";
  import Swal from "sweetalert2";
  import { authHeader } from "../utils/auth-header";
import { baseUrl } from "../services/config";
import axios from "axios";
  
  export const fetchProfileData = () => {
    return async (dispatch) => {
      dispatch({ type: MAKE_PROFILE_REQUEST });
    };
  };
  
  export const getUserProfile = () => {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
    return async (dispatch) => {
      axios(`${baseUrl}/UserProfile/GetAllProfiles`, requestOptions)
        .then((res) =>{
          dispatch({
            type: GET_USER_PROFILE,
            payload: res.data,
          })}
        )
        .catch((e) => {
          if (axios.isCancel(e)) {
            return;
          }
          dispatch({ type:PROFILE_ERROR, payload: { error: e } });
        });
    };
  };

  export const addUserProfile = (profileItem, routeBack) => {
    const requestOptions = {
      method: "POST",
      headers: authHeader(),
    };
    return async (dispatch) => {
      axios
        .post(`${baseUrl}/UserProfile/CreateUserProfileUser`, profileItem, requestOptions)
        .then((res) => {
          dispatch({
            type: ADD_USER_PROFILE,
            payload: profileItem,
          });
          const route = routeBack;
          Swal.fire({
            icon: "success",
            title: "success",
            text: "User created",
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
            text: "something went wrong",
            confirmButtonColor: "purple",
          });
        });
      // const data = response.data;
    };
  };
  

