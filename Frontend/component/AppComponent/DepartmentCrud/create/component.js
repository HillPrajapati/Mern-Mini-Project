import React, { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  clearError,
  createDepartmentAssignEmployee,
  updateDepartmentAssignEmployee
} from "../../../../redux/actions/departmentActions";
import Loader from "../../../SharedComponent/Loader/Component";
import { getUserWithEmployeeRole } from "../../../../redux/actions/userActions";

// Lazy load components
const Button = React.lazy(() => import("../../../GlobalComponent/Button/Component"));
const ErrorModal = React.lazy(() => import("../../../SharedComponent/ErrorModal/Component"));
const InputField = React.lazy(() => import("../../../GlobalComponent/InputForm/Component"));
const ViewDepartment = React.lazy(() => import("../View/Component"));

const DepartmentCrud = () => {
  const [currentPage, setCurrentPage] = useState(5);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  
  // Separate search states for Department Name and Location
  const [searchCriteria, setSearchCriteria] = useState({
    departmentName: "",  // For department name search
    location: "",        // For location search
  });
  const filterData = {
    currentPage,
    rowsPerPage,
    searchCriteria
  }

  const dispatch = useDispatch();
  const { departments, loading, error, count } = useSelector(
    (state) => state.department
  );
  const { user, employees } = useSelector((state) => state.user);

  const [departmentData, setDepartmentData] = useState({
    departmentName: "",
    category: "",
    location: "",
    salary: "",
    assignedEmployees: [], // Store selected employees here
  });

  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  // Fetch data whenever page, rows, or search criteria changes
  useEffect(() => {
    dispatch(getDepartments(filterData));
    dispatch(getUserWithEmployeeRole()); // Fetch employees to assign
  }, [dispatch, currentPage, rowsPerPage, searchCriteria]);

  // Handle input changes for department form fields
  const handleInputChange = (e) => {
    setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value, // Dynamically update the relevant search field
    });
  };

  // Handle employee selection for the department
  const handleEmployeeSelection = (e, isType = "UPDATE") => {
    const { checked, value } = e.target;
    let assignedEmployeesArray = departmentData?.assignedEmployees && isType === "UPDATE"
      ? departmentData?.assignedEmployees?.split(",").map(email => email.trim()) // Trim to remove extra spaces
      : [];

    if (checked) {
      assignedEmployeesArray.push(value); // Add to the array
    } else {
      assignedEmployeesArray = assignedEmployeesArray.filter(
        (email) => email !== value
      );
    }

    setDepartmentData({
      ...departmentData,
      assignedEmployees: isType === "CREATE" ? assignedEmployeesArray : assignedEmployeesArray.join(", "),
    });
  };

  // Handle employee selection for create
  const handleEmployeeSelectionForCreate = (e) => {
    debugger
    const { checked, value } = e.target;
    let assignedEmployeesArray = departmentData?.assignedEmployees.length>0
      ? departmentData?.assignedEmployees?.split(",").map(email => email.trim())
      : [];

    if (checked) {
      assignedEmployeesArray.push(value);
    } else {
      assignedEmployeesArray = assignedEmployeesArray.filter(
        (email) => email !== value
      );
    }

    setDepartmentData({
      ...departmentData,
      assignedEmployees: assignedEmployeesArray.join(", "),
    });
  };

  // Handle create department
  const handleCreate = async () => {
    try {
      const result = await dispatch(createDepartment(departmentData));
      if (result && !error && departmentData.assignedEmployees.length) {
        await dispatch(createDepartmentAssignEmployee({
          assignedEmployees: departmentData.assignedEmployees,
          departmentId: result.data._id
        }));
      }

      dispatch(getDepartments(filterData)); // Refresh departments list
      setDepartmentData({
        departmentName: "",
        category: "",
        location: "",
        salary: "",
        assignedEmployees: [],
      });

    } catch (error) {
      console.error('Error creating department or assigning employees:', error);
    }
  };

  // Handle editing department
  const handleEdit = (department) => {
    setDepartmentData({
      id: department.id,
      departmentName: department.departmentName,
      category: department.category,
      location: department.location,
      salary: department.salary,
      assignedEmployees: department.assignedEmployees || [],
    });
    setShowModal(true);
  };

  // Handle department update
  const handleUpdate = async () => {
    await dispatch(updateDepartment(departmentData));

    if (!error && departmentData.assignedEmployees) {
      const assignedEmployeeIds = departmentData.assignedEmployees
        .split(",")
        .map(email => {
          const employee = employees.find(emp => emp.email === email.trim());
          return employee ? employee._id : null;
        })
        .filter(id => id !== null);

      await dispatch(updateDepartmentAssignEmployee({
        userIds: assignedEmployeeIds,
        departmentId: departmentData.id
      }));
    }

    dispatch(getDepartments(filterData)); // Refresh the department list after update
    setShowModal(false);
  };

  // Handle department deletion
  const handleDelete = (id) => {
    dispatch(deleteDepartment({ id }));
    dispatch(getDepartments(filterData)); // Refresh the department list after delete
  };

  const onCloseErrorModal = () => {
    dispatch(clearError());
  };

  return (
    <div className="department-container">
      {loading && <Loader />}
      <h2>Department CRUD</h2>

      {error && (
        <Suspense fallback={<Loader />}>
          <ErrorModal message={error} type="error" onClose={onCloseErrorModal} />
        </Suspense>
      )}

      {user?.roleName === "Manager" && (
        <div>
          <Suspense fallback={<Loader />}>
            

            {/* Department Form */}
            <div className="input-field">
              <label htmlFor="departmentName">Department Name</label>
              <InputField
                type="text"
                id="departmentName"
                name="departmentName"
                placeholder="Department Name"
                value={departmentData.departmentName}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="category">Category</label>
              <InputField
                type="text"
                id="category"
                name="category"
                placeholder="Category"
                value={departmentData.category}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="location">Location</label>
              <InputField
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                value={departmentData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="salary">Salary</label>
              <InputField
                type="number"
                id="salary"
                name="salary"
                placeholder="Salary"
                value={departmentData.salary}
                onChange={handleInputChange}
              />
            </div>
          </Suspense>

          <div className="employee-assignment">
            <h4>Assign Employees:</h4>
            {employees?.map((employee) => (
              <div key={employee._id}>
                <label htmlFor={employee._id}>
                  <input
                    type="checkbox"
                    id={employee._id}
                    value={employee._id}
                    checked={departmentData.assignedEmployees.includes(employee._id)}
                    onChange={(e) => handleEmployeeSelectionForCreate(e, "CREATE")}
                  />
                  {employee.email}
                </label>
              </div>
            ))}
          </div>

          <Suspense fallback={<Loader />}>
            <Button onClick={handleCreate} style={{ marginTop: "12px" }}>Create Department</Button>
          </Suspense>
        </div>
      )}
 {/* Search Fields */}
 <div className="input-field" style={{marginTop:"12px"}}>
              <label htmlFor="departmentName">Search by Department Name</label>
              <InputField
                type="text"
                id="departmentName"
                name="departmentName"
                placeholder="Search Department"
                value={searchCriteria.departmentName}
                onChange={handleSearchChange}
                required={false}

              />
            </div>

            <div className="input-field">
              <label htmlFor="location">Search by Location</label>
              <InputField
                type="text"
                id="location"
                name="location"
                placeholder="Search Location"
                value={searchCriteria.location}
                onChange={handleSearchChange}
                required={false}
              />
            </div>
      {departments?.length > 0 ? (
        <Suspense fallback={<Loader />}>
          <ViewDepartment
            departments={departments}
            count={count}
            onEdit={handleEdit}
            onDelete={handleDelete}
            departmentData={departmentData}
            setDepartmentData={setDepartmentData}
            showModal={showModal}
            setShowModal={setShowModal}
            handleInputChange={handleInputChange}
            handleUpdate={handleUpdate}
            employees={employees}
            handleEmployeeSelection={handleEmployeeSelection}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            row={currentPage}
            page={rowsPerPage}
            roleName={user?.roleName}
            searchCriteria={searchCriteria}
            handleSearchChange={handleSearchChange}
          />
        </Suspense>
      ) : (
        <p>
          {user?.roleName === "Manager"
            ? "You haven't assigned departments to Employees"
            : "You don't have any assigned departments yet"}
        </p>
      )}
    </div>
  );
};

export default DepartmentCrud;
