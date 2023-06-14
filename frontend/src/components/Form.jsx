import React, { useState } from "react";
import CustomDatePicker from "./DatePicker";
import StateSelector from "./CountrySelector";

// Import modal close icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Import format to change the date format
import { format } from "date-fns";

export default function Form() {

  // State variables for form inputs
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputBirthDate, setInputBirthDate] = useState(format(new Date(), "dd/MM/yyyy"));
  const [inputStartDate, setInputStartDate] = useState(format(new Date(), "dd/MM/yyyy"));  
  const [inputStreet, setInputStreet] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputState, setInputState] = useState("Alabama");
  const [inputZipCode, setInputZipCode] = useState("");
  const [inputDepartment, setInputDepartment] = useState("Sales");
  
  // State variable for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to open the confirmation modal
  const openConfirmModal = () => {
    setShowModal(true);
  };

  // Function to close the confirmation modal
  const closeConfirmModal = () => {
    setShowModal(false);
  };
  
  const handleSave = () => {
    // Check if all required fields are filled
    if (!inputFirstName || !inputLastName || !inputStreet || !inputCity || !inputZipCode || !inputDepartment) {
      alert('Please fill in all text fields.');
      return;
    }

    // Change date format
    const inputBirthDateFormatted = format(inputBirthDate, "dd/MM/yyyy");
    const inputStartDateFormatted = format(inputStartDate, "dd/MM/yyyy");

    // Create an object with form data values
    const data = {
      firstName: inputFirstName,
      lastName: inputLastName,
      birthDate: inputBirthDateFormatted,
      startDate: inputStartDateFormatted,
      address: {
        street: inputStreet,
        city: inputCity,
        state: inputState,
        zipCode: inputZipCode,
      },
      department: inputDepartment,
    };

    // Get employee data list from localStorage and add the new data
    let employeeDataList = JSON.parse(localStorage.getItem('employeeDataList') || '[]');
    employeeDataList.push(data);
    localStorage.setItem('employeeDataList', JSON.stringify(employeeDataList));

    // Open the confirmation modal
    openConfirmModal();
  };

  // Function to handle state selection
  const handleStateChange = (selectedState) => {
    setInputState(selectedState);
  };

  // Confirmation modal component
  const ConfirmModal = () => (
    <div className="backgroundModal">
      <div id="confirmation" className="modal">
        Employee Created!      
        <FontAwesomeIcon
          icon={faTimes}
          style={{
            color: "rgb(255, 255, 255)",
            backgroundColor: "black",
            padding: "7px 9px",
            borderRadius: "25px",
            position: "absolute",
            top: "-15px",
            right: "-15px",
          }}
          onClick={closeConfirmModal}
        />
      </div>
    </div>
  );

  return (
    <div className="container">
      <a href="">View Current Employees</a>
      <h2>Create Employee</h2>
      <form action="#" id="create-employee">

        {/* First Name input */}
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          required
          value={inputFirstName}
          onChange={(e) => setInputFirstName(e.target.value)}
        />

        {/* Last Name input */}
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          required
          value={inputLastName}
          onChange={(e) => setInputLastName(e.target.value)}
        />

        {/* Date of Birth input */}
        <label htmlFor="date-of-birth">Date of Birth</label>
        <CustomDatePicker  
          selected={inputBirthDate} 
          onChange={(date) => setInputBirthDate(date)} 
          id="date-of-birth"
        />

        {/* Start Date input */}
        <label htmlFor="start-date">Start Date</label>
        <CustomDatePicker  
          selected={inputStartDate} 
          onChange={(date) => setInputStartDate(date)} 
          id="start-date"
        />

        {/* Address fieldset */}
        <fieldset className="address">
          <legend>Address</legend>

          {/* Street input */}
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            required
            value={inputStreet}
            onChange={(e) => setInputStreet(e.target.value)}
          />

          {/* City input */}
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            required
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />

          {/* State selection */}
          <label htmlFor="state">State</label>
          <StateSelector 
            value={inputState}  
            onChange={handleStateChange}
          />

          {/* Zip Code input */}
          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="number"
            required
            value={inputZipCode}
            onChange={(e) => setInputZipCode(e.target.value)}
          />
        </fieldset>

        {/* Department selection */}
        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          required
          value={inputDepartment}
          onChange={(e) => setInputDepartment(e.target.value)}
        >
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
      </form>

      {/* Save button */}
      <button onClick={handleSave}>Save</button>
      
      {/* Confirmation modal */}
      {showModal && <ConfirmModal />}
    </div>
  );
}
