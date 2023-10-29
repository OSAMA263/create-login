import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogInUser } from "./store/LoginSlice";
import { NavLink } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    password: "",
    remember: false,
  });
  const [err, setErr] = useState({ name: "", password: "" });
  const Accounts = useSelector((state) => state.accounts.users);
  const admin = useSelector((state) => state.login);

  // handle user information
  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    // check if the user does exist
    const findedUser = Accounts.find((acc) => acc.name === user.name);
    if (
      findedUser &&
      findedUser.password === user.password &&
      findedUser.name === user.name
    ) {
      setErr({ name: "", password: "" });
      dispatch(LogInUser({ ...findedUser, remember: user.remember }));
    } else if (!findedUser) {
      setErr((err) => ({ ...err, name: "no user was found with this name" }));
    } else if (findedUser && findedUser.email != user.email) {
      setErr((err) => ({ ...err, password: "password is wrong" }));
    }
  };
  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(admin));
  }, [admin]);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex w-1/2 mx-auto gap-4 text-start flex-col [&_input]:border-black [&_input]:border "
      >
        <div className="flex gap-y-4 flex-col">
          <input
            placeholder="name"
            onChange={handleChange}
            name="name"
            type="text"
          />
          <small className="text-red-500">{err.name}</small>
        </div>
        <div className="flex gap-y-4 flex-col">
          <input
            placeholder="password"
            onChange={handleChange}
            name="password"
            type="password"
          />
          <small className="text-red-500">{err.password}</small>
        </div>
        <button className="border-black border" type="submit">
          log in
        </button>
      </form>
      <NavLink to="/create-account" className="underline">
        create account?
      </NavLink>
      <br />
      <NavLink to="/create-login" className="underline">
        home
      </NavLink>
    </div>
  );
}
