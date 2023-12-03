import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/routes/Private";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard/>} />
        </Route>

        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
