import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
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
