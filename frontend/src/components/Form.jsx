import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addData } from "../Reducers/dataReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Form() {
  const dispatch = useDispatch(); // Ajouter dispatch pour l'action Redux

  // Créer des états pour stocker les valeurs d'entrée
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputBirthDate, setInputBirthDate] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputStreet, setInputStreet] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputState, setInputState] = useState("");
  const [inputZipCode, setInputZipCode] = useState("");
  const [inputDepartment, setInputDepartment] = useState("");

  // Créer un état pour la fenêtre modale de confirmation
  const [showModal, setShowModal] = useState(false);

  function ConfirmModal() {
    return (
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
  }

  const openConfirmModal = () => {
    setShowModal(true);
  };

  const closeConfirmModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    // Vérifiez si tous les champs de texte sont remplis
    const inputs = document.querySelectorAll('input')
    let isFormValid = true;
    inputs.forEach(input => {
      if (input.value.trim() === "") {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      alert('Veuillez remplir tous les champs de texte.');
      return;
    }

    // Récupérer les données de l'employé à partir des entrées du formulaire
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


    let employeeDataList = JSON.parse(localStorage.getItem('employeeDataList')) || []; // Récupérer les données d'employé existantes depuis localStorage ou créer un tableau vide s'il n'existe pas
    employeeDataList.push(data); // Ajouter les nouvelles données d'employé au tableau
    localStorage.setItem('employeeDataList', JSON.stringify(employeeDataList)); // Stocker les données d'employé mises à jour dans localStorage

    dispatch(addData(data)); // Envoyer une action pour ajouter les données d'employé à l'état Redux
    openConfirmModal(); // Ouvrir la modale de confirmation
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
          >
            <option value="">Select State</option>
          </select>

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