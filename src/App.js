import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Timesheet from "./Timesheet";
import Dashbaord from "./Dashboard";
import Header from "./Header";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashbaord />} />
          <Route path="/timesheet" element={<Timesheet />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App; 
