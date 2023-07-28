import { Grid, PrimaryNav } from "@trussworks/react-uswds";
import Home from "./pages/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Home />} />
          <Route path="/reports" element={<Home />} />
          <Route path="/report-form" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
