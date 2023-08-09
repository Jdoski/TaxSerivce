import { Grid, PrimaryNav } from "@trussworks/react-uswds";
import Home from "./pages/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import Account from "./pages/Account";
import Reports from "./pages/Reports";
import GenerateReport from "./pages/GenerateReport";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/generate-report" element={<GenerateReport />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
