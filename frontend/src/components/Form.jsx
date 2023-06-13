import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import CustomDatePicker from "./DatePicker";
import StateSelector from "./CountrySelector";

export default function Form() {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputBirthDate, setInputBirthDate] = useState(Date());
  const [inputStartDate, setInputStartDate] = useState(Date());
  const [inputStreet, setInputStreet] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputState, setInputState] = useState("Alabama");
  const [inputZipCode, setInputZipCode] = useState("");
  const [inputDepartment, setInputDepartment] = useState("Sales");
  const [showModal, setShowModal] = useState(false);

  const openConfirmModal = () => {
    setShowModal(true);
  };

  const closeConfirmModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (inputBirthDate == null) {
      setInputBirthDate(Date());
    }

    if (inputStartDate == null) {
      setInputStartDate(Date());
    }

    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "" || inputs[i].value.trim() === null) {
        alert('Veuillez remplir tous les champs de texte.');
        return;
      }
    }

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

    let employeeDataList = JSON.parse(localStorage.getItem('employeeDataList') || '[]');
    employeeDataList.push(data);
    localStorage.setItem('employeeDataList', JSON.stringify(employeeDataList));

    openConfirmModal();
  };

  const handleStateChange = (selectedState) => {
    setInputState(selectedState);
  };

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
        <CustomDatePicker  
          selected={inputBirthDate} 
          onChange={(date) => setInputBirthDate(date)} 
          id="date-of-birth"
        />

        <label htmlFor="start-date">Start Date</label>
        <CustomDatePicker  
          selected={inputStartDate} 
          onChange={(date) => setInputStartDate(date)} 
          id="start-date"
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
          <StateSelector 
            value={inputState}  
            onChange={handleStateChange}
          />

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
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
      </form>
      <button onClick={handleSave}>Save</button>
      {showModal && <ConfirmModal />}
    </div>
  );
}
