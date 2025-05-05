import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthRedirect from "./pages/AuthRedirect";
import Profile from "./pages/Profile";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/api/v1/google_authentication_redirect" element={<AuthRedirect />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
