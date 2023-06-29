import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import "./styles/table.css";

export default function Table() {
  // State variables for store infos
  const [employeeDataList, setEmployeeDataList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState({});
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employeeDataList") || "[]"); // Recovery employee list from local storage
    setEmployeeDataList(data);
  }, []);

  // Recovery search value and reset to the first page
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  // Sort the employee data based on the selected column
  const handleSort = (column) => {
    const isDesc = sortOrder[column] === "desc";
    const newSortOrder = isDesc ? "asc" : "desc";
  
    const sortedArray = employeeDataList.slice().sort((a, b) => {
      let valueA = null;
      let valueB = null;
  
      if (column.includes("address")) {
        // Sorting for address properties
        const addressProperty = column.split(".")[1];
        valueA = a.address[addressProperty];
        valueB = b.address[addressProperty];
      } else {
        // Sorting for other properties
        valueA = a[column];
        valueB = b[column];
      }
  
      if (isDesc) {
        return valueB.localeCompare(valueA);
      } else {
        return valueA.localeCompare(valueB);
      }
    });
  
    const updatedSortOrder = {};
    Object.keys(sortOrder).forEach((key) => {
      updatedSortOrder[key] = "";
    });
  
    setSortOrder({ ...updatedSortOrder, [column]: newSortOrder });
    setEmployeeDataList(sortedArray);
    setCurrentPage(1);
  };

  // Update the number of entries per page and reset to the first page
  const handleEntriesChange = (event) => {
    setEntries(parseInt(event.target.value));
    setCurrentPage(1);
  };

   // Navigate to the previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to the next page
  const handleNext = () => {
    const maxPage = Math.ceil(filteredData.length / entries);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navigate to a specific page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter the employee data with search bar value
  const filteredData = employeeDataList.filter((employee) => {
    const firstName = employee.firstName.toLowerCase();
    const lastName = employee.lastName.toLowerCase();
    const birthDate = employee.birthDate;
    const department = employee.department.toLowerCase();
    const startDate = employee.startDate;
    const street = employee.address.street.toLowerCase();
    const city = employee.address.city.toLowerCase();
    const state = employee.address.state.toLowerCase();
    const zipCode = employee.address.zipCode;

    return (
      firstName.startsWith(search.toLowerCase()) ||
      lastName.includes(search.toLowerCase()) ||
      birthDate.includes(search) ||
      department.includes(search.toLowerCase()) ||
      startDate.includes(search) ||
      street.includes(search.toLowerCase()) ||
      city.includes(search.toLowerCase()) ||
      state.includes(search.toLowerCase()) ||
      zipCode.includes(search)
    );
  });

  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const maxPage = Math.ceil(filteredData.length / entries);

  const pageButtons = [];
  for (let page = 1; page <= maxPage; page++) {
    // Generate page buttons for pagination
    pageButtons.push(
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={currentPage === page ? "active" : ""}
        style={{ fontWeight: currentPage === page ? 600 : "normal" }}
      >
        {page}
      </button>
    );
  }

  // Get the sort icon with the current sort order of the column
  const getSortIcon = (column) => {
    if (sortOrder[column] === "desc") {
      return faSortUp;
    } else if (sortOrder[column] === "asc") {
      return faSortDown;
    } else {
      return faSort;
    }
  };

  return (
    <div className="table-wrapper">
      <h1>Current Employees</h1>
      <div className="table-header">
        <label>
          Show
          <select className="show-entries" value={entries} onChange={handleEntriesChange}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          entries
        </label>
        <label>
          Search:
          <input id="search" aria-label="search" value={search} onChange={handleSearch} />
        </label>
      </div>
      <table className="table" id="table">
        <thead>
          <tr>
            <th className="table-option" onClick={() => handleSort("firstName")}>
              <div className="sort-arrow">
                First Name
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("firstName")} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("lastName")}>
              <div className="sort-arrow">
                Last Name
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("lastName")} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("startDate")}>
              <div className="sort-arrow">
                Start Date
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("startDate")} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("department")}>
              <div className="sort-arrow">
                Department
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("department")} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("birthDate")}>
              <div className="sort-arrow">
                Date of Birth
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("birthDate")} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("address.street")}>
              <div className="sort-arrow">
                Street
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("address.street")} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("address.city")}>
              <div className="sort-arrow">
                City
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("address.city")} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("address.state")}>
              <div className="sort-arrow">
                State
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("address.state")} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("address.zipCode")}>
              <div className="sort-arrow">
                Zip Code
                <FontAwesomeIcon className="sort-icon" icon={getSortIcon("address.zipCode")} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="custom-tbody">
          {paginatedData.map((employee, index) => (
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
      <div className="paginated">
        <p>
          Showing <strong>{((currentPage - 1) * entries) + 1}</strong> to <strong>{Math.min(currentPage * entries, filteredData.length)}</strong> of{" "}
          <strong>{filteredData.length}</strong> entries
        </p>
        <div className="paginated-btn">
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>
          {pageButtons}
          <button onClick={handleNext} disabled={currentPage === maxPage}>
            Next
          </button>
        </div>
      </div>
      <a href="/">Home</a>
    </div>
  );
}