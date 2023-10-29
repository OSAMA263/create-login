import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CreateUser } from "./store/CreateAccountSlice";

export default function CreateAccount() {
  const dispatch = useDispatch();
  const Accounts = useSelector((state) => state.accounts.users);
  // create  user state
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState({ name: "", email: "" });
  // handle user information
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  // handle submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if the user or email already exist
    const userExist = Accounts.find(
      (acc) => acc.email === user.email || acc.name === user.name
    );
    if (userExist) {
      if (userExist.name === user.name && userExist.email === user.email) {
        setErr({ name: "name already used!", email: "email already used!" });
      } else if (userExist.name === user.name) {
        setErr({ name: "name already used!", email: "" });
      } else if (userExist.email === user.email) {
        setErr({ name: "", email: "email already used!" });
      }
    } else {
      setErr({ name: "", email: "" });
      dispatch(CreateUser(user));
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(Accounts));
  }, [Accounts]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-1/2 mx-auto text-start gap-4 flex-col [&_input]:border-black [&_input]:border "
      >
        <div className="flex flex-col gap-y-4">
          <input
            onChange={handleChange}
            type="text"
            placeholder="name"
            name="name"
          />
          <small className="text-red-400">{err.name}</small>
        </div>
        <div className="flex flex-col gap-y-4">
          <input
            onChange={handleChange}
            type="email"
            placeholder="email"
            name="email"
          />
          <small className="text-red-400">{err.email}</small>
        </div>
        <div className="flex flex-col gap-y-4">
          <input
            onChange={handleChange}
            type="password"
            placeholder="password"
            name="password"
          />
        </div>
        <button className="border-black border" type="submit">
          create account
        </button>
      </form>
      <NavLink to="/login" className="underline">
        login
      </NavLink>
    </>
  );
}
