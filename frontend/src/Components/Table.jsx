import React, { useState, useEffect } from "react";

export default function Table() {
  const [employeeDataList, setEmployeeDataList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employeeDataList") || "[]");
    setEmployeeDataList(data);
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = employeeDataList.filter((employee) => {
    const firstName = employee.firstName.toLowerCase();
    const lastName = employee.lastName.toLowerCase();
    const birthDate = employee.birthDate.toLowerCase();
    const startDate = employee.startDate.toLowerCase();
    const street = employee.address.street.toLowerCase();
    const city = employee.address.city.toLowerCase();
    const state = employee.address.state.toLowerCase();
    const zipCode = employee.address.zipCode.toLowerCase();

    return (
      firstName.includes(search.toLowerCase()) ||
      lastName.includes(search.toLowerCase()) ||
      birthDate.includes(search.toLowerCase()) ||
      startDate.includes(search.toLowerCase()) ||
      street.includes(search.toLowerCase()) ||
      city.includes(search.toLowerCase()) ||
      state.includes(search.toLowerCase()) ||
      zipCode.includes(search.toLowerCase())
    );
  });

  console.log(search);

  return (
    <div className="table-wrapper">
      <h1>Current Employees</h1>
      <div className="table-header">
        <label>
          Show
          <select>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          entries
        </label>
        <label>
          Search:
          <input id="search" value={search} onChange={handleSearch} />
        </label>
      </div>
      <table className="table" id="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody className="custom-tbody">
          {filteredData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.birthDate}</td>
              <td>{employee.address.street}</td>
              <td>{employee.address.city}</td>
              <td>{employee.address.state}</td>
              <td>{employee.address.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}