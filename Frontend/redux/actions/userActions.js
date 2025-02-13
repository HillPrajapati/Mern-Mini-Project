import axios from 'axios';
import { API_URLS } from '../../constant/apiConstants';
import { USER_MESSAGES } from '../../constant/appConstants';
import axiosInstance from '../../helper/axiosHelper';

export const loginUser = (userData) => async (dispatch) => {
  try {

    const response = await axios.post(API_URLS.LOGIN, userData);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    debugger
    dispatch({
      type: 'LOGIN_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.INVALID_CREDENTIALS,
    });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOADING",
    })
    const response = await axios.post(API_URLS.REGISTER, userData);
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'REGISTER_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.USER_REGISTERED,
    });
  }
};

export const getUserWithEmployeeRole = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOADING",
    })
    const response = await axiosInstance.post(API_URLS.GET_USER_FOR_EMPLOYEE, userData);
    dispatch({
      type: 'EMPLOYEE_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'EMPLOYEE_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.USER_REGISTERED,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERROR",
  })
};

export const clearUserState = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_STATE",
  })
};
