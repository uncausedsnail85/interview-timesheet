import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Timesheet from "./Timesheet";
import Header from "./Header";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Timesheet />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App; 
