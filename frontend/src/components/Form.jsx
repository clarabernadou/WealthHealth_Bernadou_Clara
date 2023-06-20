import React, { useState, useEffect } from "react";
import CustomDatePicker from "./DatePicker";
import Selector from "./Selector";
import Modal from "./Modal"
import "./form.css"

// Import format to change the date format
import { format } from "date-fns";

// States for state selector
const stateOptions = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
];

// Departments for department selector
const departmentOptions = [
  { label: 'Sales', value: 'Sales' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Human Resources', value: 'Human Resources' },
  { label: 'Legal', value: 'Legal' }
];

export default function Form() {
  // State variables for form inputs
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputBirthDate, setInputBirthDate] = useState(new Date());
  const [inputStartDate, setInputStartDate] = useState(new Date());
  const [inputStreet, setInputStreet] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputState, setInputState] = useState(stateOptions[0].value);
  const [inputZipCode, setInputZipCode] = useState("");
  const [inputDepartment, setInputDepartment] = useState(departmentOptions[0].value);
  
  // State variable for modal visibility
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    if (isModalOpen) {
      // Disable form inputs and scroll when the modal is open
      document.body.style.overflow = "hidden";
      document.querySelectorAll("input, select, textarea").forEach((el) => {
        el.setAttribute("disabled", "disabled");
      });

      // Close the confirmation modal with escape
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "auto";
      document.querySelectorAll("input, select, textarea").forEach((el) => {
        el.removeAttribute("disabled");
      });
    }
  }, [isModalOpen]);

  // Function to open the confirmation modal
  const openConfirmModal = () => {
    setShowModal(true);
    setIsModalOpen(true);
  };

  // Function to close the confirmation modal
  const closeConfirmModal = () => {
    setShowModal(false);
    setIsModalOpen(false);
  };

  // Function to close the confirmation modal with escape
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeConfirmModal();
    }
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

  // Function to handle department selection
  const handleDepartmentChange = (selectedDepartment) => {
    setInputDepartment(selectedDepartment);
  };

  return (
    <div className="container">
      <a href="/table">View Current Employees</a>
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
          <Selector 
            value={inputState}  
            onChange={handleStateChange}
            inputOptions={stateOptions}
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
        <Selector
          name="department"
          id="department"
          required
          value={inputDepartment}
          onChange={handleDepartmentChange}
          inputOptions={departmentOptions}
        />
      </form>

      {/* Save button */}
      <button className="save-btn" onClick={handleSave}>Save</button>

      {/* Confirmation modal */}
      {showModal && (
        <Modal closeConfirmModal={closeConfirmModal}></Modal>
      )}
    </div>
  );
}
