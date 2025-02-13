const initialState = {
  departments: [],
  count:0,
  loading: false,
  error: null,
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DEPARTMENT_LOADING":
      return { ...state, loading: action.payload };
    case "GET_DEPARTMENTS_SUCCESS":
      return { ...state, departments: action.payload.departments,count:action.payload.totalDepartments };
    case "CREATE_DEPARTMENT_SUCCESS":
      return { ...state, departments: [...state.departments, action.payload],  };

    // case "CREATE_DEPARTMENT_ASSIGNMET_SUCCESS":
    // // case "UPDATE_DEPARTMENT_ASSIGNMET_SUCCESS":
    //   return { ...state, departments: [ ...state.departments, assignedEmployees: action.payload ] };
    case "CREATE_DEPARTMENT_ERROR":
    case "CREATE_DEPARTMENT_ASSIGNMET_ERROR":
    case "UPDATE_DEPARTMENT_ASSIGNMENT_ERROR":
    case "GET_DEPARTMENTS_ERROR":
    case "DELETE_DEPARTMENTS_ERROR":
    case "UPDATE_DEPARTMENTS_ERROR":
    case "ASSIGN_DEPARTMENTS_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "CLEAR_STATE":
      return initialState;  // Make sure initialState is defined at the top
    default:
      return state;
  }
};


export default departmentReducer;
