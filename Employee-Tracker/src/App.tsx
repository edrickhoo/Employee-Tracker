import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeList from "./containers/EmployeeList/EmployeeList";
import EmployeeAdd from "./containers/EmployeeAdd/EmployeeAdd";
import EmployeeEdit from "./containers/EmployeeEdit/EmployeeEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/add" element={<EmployeeAdd />} />
          <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
