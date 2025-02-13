const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "EMPLOYEE_SUCCESS":
      return { ...state, employees: action.payload, loading: false };
    case "LOGIN_ERROR":
    case "REGISTER_ERROR":
    case "EMPLOYEE_ERROR":  
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "CLEAR_STATE":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
