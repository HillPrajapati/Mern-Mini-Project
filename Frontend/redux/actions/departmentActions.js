import axiosInstance from '../../helper/axiosHelper'; // Import the custom Axios instance
import { API_URLS } from '../../constant/apiConstants';
import { USER_MESSAGES } from '../../constant/appConstants';

export const createDepartment = (departmentData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(API_URLS.CREATE_DEPARTMENT, departmentData);
    dispatch({
      type: 'CREATE_DEPARTMENT_SUCCESS',
      payload: response.data.data,
    });
    debugger
    return response.data; 
  } catch (error) {
    dispatch({
      type: 'CREATE_DEPARTMENT_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_CREATED,
    });
  }
};

export const createDepartmentAssignEmployee = (departmentData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(API_URLS.ASSIGN_DEPARTMENT, departmentData);
    dispatch({
      type: 'CREATE_DEPARTMENT_ASSIGNMET_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_DEPARTMENT_ASSIGNMET_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_CREATED,
    });
  }
};


export const updateDepartmentAssignEmployee = (departmentData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(API_URLS.UPDATE_ASSIGNMENT, departmentData);
    dispatch({
      type: 'UPDATE_DEPARTMENT_ASSIGNMET_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_DEPARTMENT_ASSIGNMENT_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_CREATED,
    });
  }
};

export const getDepartments = (departmentData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(API_URLS.GET_DEPARTMENTS,departmentData);
    dispatch({
      type: 'GET_DEPARTMENTS_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_DEPARTMENTS_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_FETCH_ERROR,
    });
  }
};

export const deleteDepartment = (departmentData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(API_URLS.DELETE_DEPARTMENT, departmentData);
    dispatch({
      type: 'DELETE_DEPARTMENTS_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_DEPARTMENTS_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_DELETED,
    });
  }
};

export const updateDepartment = (departmentData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(API_URLS.UPDATE_DEPARTMENT, departmentData);
    dispatch({
      type: 'UPDATE_DEPARTMENTS_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_DEPARTMENTS_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_UPDATED,
    });
  }
};

export const updateAssigment = (departmentData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(API_URLS.UPDATE_ASSIGNMENT, departmentData);
    dispatch({
      type: 'UPDATE_DEPARTMENTS_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_DEPARTMENTS_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_UPDATED,
    });
  }
};

export const assigDepartment = (departmentData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(API_URLS.ASSIGN_DEPARTMENT, departmentData);
    dispatch({
      type: 'ASSIGN_DEPARTMENTS_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'ASSIGN_DEPARTMENTS_ERROR',
      payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_UPDATED,
    });
  }
};

// export const fetDepartment = (departmentData) => async (dispatch) => {
//   try {
//     const response = await axiosInstance.post(API_URLS.ASSIGN_DEPARTMENT,departmentData);
//     dispatch({
//       type: 'ASSIGN_DEPARTMENTS_SUCCESS',
//       payload: response.data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: 'ASSIGN_DEPARTMENTS_ERROR',
//       payload: error.response ? error.response.data.message : USER_MESSAGES.DEPARTMENT_UPDATED,
//     });
//   }
// };
export const clearError = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERROR",
  });
};

export const clearDepartmentState = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_STATE",
  });
};
