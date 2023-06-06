import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import Form from "./Components/Form";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
