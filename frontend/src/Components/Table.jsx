import React, { useState, useEffect } from "react";

export default function Table() {
  const [employeeDataList, setEmployeeDataList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employeeDataList") || "[]");
    setEmployeeDataList(data);
  }, []);

  console.log(employeeDataList);

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
            <label>Search : <input></input></label>            
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
            {employeeDataList.map((employee, index) => (
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