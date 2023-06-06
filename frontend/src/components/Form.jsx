import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addData } from "../Reducers/dataReducer";

export default function Form() {
    const dispatch = useDispatch(); // Add dispatch for Redux action

    // Create states to store input values
    const [inputFirstName, setInputFirstName] = useState("");
    const [inputLastName, setInputLastName] = useState("");
    const [inputBirthDate, setInputBirthDate] = useState("");
    const [inputStartDate, setInputStartDate] = useState("");
    const [inputStreet, setInputStreet] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [inputState, setInputState] = useState("");
    const [inputZipCode, setInputZipCode] = useState("");
    const [inputDepartment, setInputDepartment] = useState("");
  
    const handleSave = () => {
      // Retrieve employee data from the form inputs
      const data = {
        firstName: inputFirstName,
        lastName: inputLastName,
        birthDate: inputBirthDate,
        startDate: inputStartDate,
        address: {
          street: inputStreet,
          city: inputCity,
          state: inputState,
          zipCode: inputZipCode,
        },
        department: inputDepartment,
      };
  
      
      let employeeDataList = JSON.parse(localStorage.getItem('employeeDataList')) || []; // Retrieve existing employee data from localStorage or create an empty array if it doesn't exist
      employeeDataList.push(data); // Add the new employee data to the array
      localStorage.setItem('employeeDataList', JSON.stringify(employeeDataList)); // Store the updated employee data in localStorage
  
      dispatch(addData(data)); // Dispatch an action to add the employee data to the Redux store
    };
  return (
    <div className="container">
      <a href="">View Current Employees</a>
      <h2>Create Employee</h2>
      <form action="#" id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          required
          value={inputFirstName}
          onChange={(e) => setInputFirstName(e.target.value)}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          required
          value={inputLastName}
          onChange={(e) => setInputLastName(e.target.value)}
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          id="date-of-birth"
          type="text"
          required
          value={inputBirthDate}
          onChange={(e) => setInputBirthDate(e.target.value)}
        />

        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          type="text"
          required
          value={inputStartDate}
          onChange={(e) => setInputStartDate(e.target.value)}
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            required
            value={inputStreet}
            onChange={(e) => setInputStreet(e.target.value)}
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            required
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />

          <label htmlFor="state">State</label>
          <select
            name="state"
            id="state"
            required
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
          ></select>

          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="number"
            required
            value={inputZipCode}
            onChange={(e) => setInputZipCode(e.target.value)}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          required
          value={inputDepartment}
          onChange={(e) => setInputDepartment(e.target.value)}
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
      </form>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
