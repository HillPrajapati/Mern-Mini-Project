import { combineReducers } from "redux";
import userReducer from "./userReducer";
import departmentReducer from "./departmentReducer";

const rootReducer = combineReducers({
  user: userReducer,
  department: departmentReducer,
});

export default rootReducer;
