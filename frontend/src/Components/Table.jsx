import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function Table() {
  const [employeeDataList, setEmployeeDataList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employeeDataList") || "[]");
    setEmployeeDataList(data);
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    const sortedArray = employeeDataList.slice().sort((a, b) => {
      let valueA = null;
      let valueB = null;

      if (column.includes("address")) {
        const addressProperty = column.split(".")[1];
        valueA = a.address[addressProperty];
        valueB = b.address[addressProperty];
      } else {
        valueA = a[column];
        valueB = b[column];
      }

      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setEmployeeDataList(sortedArray);
    setCurrentPage(1);
  };

  const handleEntriesChange = (event) => {
    setEntries(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const maxPage = Math.ceil(filteredData.length / entries);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    pageButtons.push(
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={currentPage === page ? "active" : ""}
      >
        {page}
      </button>
    );
  }

  return (
    <div className="table-wrapper">
      <h1>Current Employees</h1>
      <div className="table-header">
        <label>
          Show
          <select value={entries} onChange={handleEntriesChange}>
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
            <th className="table-option" onClick={() => handleSort("firstName")}>
              <div className="sort-arrow">
                First Name
                <FontAwesomeIcon icon={faSort} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("lastName")}>
              <div className="sort-arrow">
                Last Name
                <FontAwesomeIcon icon={faSort} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("startDate")}>
              <div className="sort-arrow">
                Start Date
                <FontAwesomeIcon icon={faSort} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("department")}>
              <div className="sort-arrow">
                Department
                <FontAwesomeIcon icon={faSort} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("birthDate")}>
              <div className="sort-arrow">
                Date of Birth
                <FontAwesomeIcon icon={faSort} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("address.street")}>
              <div className="sort-arrow">
                Street
                <FontAwesomeIcon icon={faSort} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("address.city")}>
              <div className="sort-arrow">
                City
                <FontAwesomeIcon icon={faSort} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("address.state")}>
              <div className="sort-arrow">
                State
                <FontAwesomeIcon icon={faSort} />
              </div>
            </th>
            <th className="table-option" onClick={() => handleSort("address.zipCode")}>
              <div className="sort-arrow">
                Zip Code
                <FontAwesomeIcon icon={faSort} />
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
          Showing {((currentPage - 1) * entries) + 1} to {Math.min(currentPage * entries, filteredData.length)} of{" "}
          {filteredData.length} entries
        </p>
        <div>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>
          {pageButtons}
          <button onClick={handleNext} disabled={currentPage === maxPage}>
            Next
          </button>
        </div>
      </div>
      <a href="/" className="homeLink">Home</a>
    </div>
  );
}