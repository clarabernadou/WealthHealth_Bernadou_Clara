import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Form from "./Components/Form";
import Table from "./Components/Table";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
