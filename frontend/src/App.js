import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import Form from "./Components/Form";
import Table from "./Components/Table";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
