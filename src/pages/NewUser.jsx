import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

const NewUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExist, setEmailExist] = useState(false);

  const naviagte = useNavigate();

  const { data, error, loading } = useFetch("https://my-json-database.herokuapp.com/users");

  if (error) return <h3>Error...</h3>;
  if (loading) return <h3>Loading...</h3>;

  const handleFirst = (e) => {
    setFirstName(e.target.value);
  };

  const handleLast = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPresent = data.find((p) => p.email === email);

    if (isPresent) {
      setEmailExist(true);

      setTimeout(() => {
        setEmailExist(false);
      }, 6000);
    } else {
      const userDetails = {
        firstName: firstName.toUpperCase(),
        lastName: lastName.toUpperCase(),
        email: email.toLowerCase(),
        password: password,
      };

      await fetch("https://my-json-database.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: { "Content-Type": "application/json" },
      });

      naviagte("/");
    }
  };

  return (
    <div className="new-user">
      <h1>
        New User{" "}
        <span>
          <Link to="/">Go Back Home</Link>
        </span>
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-parent">
            <input
              type="text"
              value={firstName}
              onChange={handleFirst}
              placeholder="First Name"
            />
          </div>

          <div className="input-parent">
            <input
              type="text"
              value={lastName}
              onChange={handleLast}
              placeholder="Last Name"
            />
          </div>

          <div className="input-parent">
            <input
              type="text"
              value={email}
              onChange={handleEmail}
              placeholder="Email Address"
            />
            {emailExist && (
              <small className="small">
                Email exist please <Link to="/login">login</Link>
              </small>
            )}
          </div>

          <div className="input-parent">
            <input
              type="password"
              value={password}
              onChange={handlePass}
              placeholder="Password"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
