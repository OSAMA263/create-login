import "./App.css";
import Login from "./Login";
import { Route, Routes, useLocation } from "react-router";
import CreateAccount from "./CreateAccount";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  return (
    <>
      {/* <Example></Example> */}
      <Routes location={location} key={location.pathname}>
        <Route path="/create-login" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/create-account"
          element={<CreateAccount></CreateAccount>}
        ></Route>
      </Routes>
    </>
  );
}

const Home = () => {
  const admin = useSelector((state) => state.login);

  return (
    <>
      <div className="flex justify-end">
        {/* check if logged in */}
        <NavLink to="/login">login</NavLink>
      </div>
      <div>{!admin.name && "you are not logged in"}</div>

      <div>name:{admin.name ? admin.name : "guest"}</div>
      <div>{admin.password && "password:" + admin.password}</div>
    </>
  );
};

export default App;
