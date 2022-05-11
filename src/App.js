import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";

function App() {
  return (
    <div className="parent">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="newuser" element={<NewUser />} />
        <Route exact path="dashboard/:id" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
