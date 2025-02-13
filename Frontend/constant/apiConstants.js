// apiConstants.js
const BASE_URL = `http://localhost:5000`
export const API_URLS = {
    BASE_URL,
    LOGIN: `${BASE_URL}/api/v1/users/login`,
    REGISTER: `${BASE_URL}/api/v1/users/register`,
    GET_USER_FOR_EMPLOYEE: `${BASE_URL}/api/v1/users/get-user-list-for-employee`,
    // DEPARTMENT
    GET_DEPARTMENTS: `${BASE_URL}/api/v1/managers/department/get-all`,
    CREATE_DEPARTMENT: `${BASE_URL}/api/v1/managers/department/create`,
    UPDATE_DEPARTMENT: `${BASE_URL}/api/v1/managers/department/update`,
    DELETE_DEPARTMENT: `${BASE_URL}/api/v1/managers/department/delete`,
    ASSIGN_DEPARTMENT: `${BASE_URL}/api/v1/managers/department/create-assign-to-employee`,
    UPDATE_ASSIGNMENT: `${BASE_URL}/api/v1/managers/department/update-assign-to-employee`,
};
