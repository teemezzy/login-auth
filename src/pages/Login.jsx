import React, { useEffect, useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const navigate = useNavigate();
  const { data, error, loading } = useFetch("https://my-json-database.herokuapp.com/users");

  useEffect(() => {
    try {
      isAvailable();
    } catch (error) {
      // console.log(error);
    }
  });

  const isAvailable = () => {
    const user = localStorage.getItem("userDetails");
    if (user === null) {
      return <Route exact path="login" element={<Login />} />;
    } else {
      const convertUser = JSON.parse(user);
      console.log(convertUser?.id);
      navigate(`/dashboard/${convertUser?.id}`);
    }
  };

  if (error) return <h2>Error...</h2>;
  if (loading) return <h2>Loading...</h2>;

  //Logic for logging in
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailExist = data.find((f) => f.email === email.toLowerCase());
    const passwordExist = data.find((f) => f.password === password);
    const emailNotExisting = data.find((n) => n.email !== email.toLowerCase());
    const passwordNotExisting = data.find((p) => p.password !== password);

    if (emailExist && passwordExist) {
      const id = emailExist;
      navigate(`/dashboard/${id.id}`);
      setEmail("");
      setPassword("");

      //for storing to local storage
      localStorage.setItem("userDetails", JSON.stringify(emailExist));
    } else if (emailNotExisting && passwordExist) {
      // console.log("No user associated with " + email);
      setErrorEmail(true);
      setTimeout(() => {
        setErrorEmail(false);
      }, 3000);
    } else if (emailExist && passwordNotExisting) {
      // console.log("Password is wrong");
      setErrorPassword(true);
      setTimeout(() => {
        setErrorPassword(false);
      }, 3000);
    } else if (emailNotExisting) {
      setErrorEmail(true);
      setTimeout(() => {
        setErrorEmail(false);
      }, 3000);
    } else if (passwordNotExisting) {
      setErrorPassword(true);
      setTimeout(() => {
        setErrorPassword(false);
      }, 3000);
    }
  };

  return (
    <div className="new-user">
      <h1>
        Login{" "}
        <span>
          <Link to="/">Go Back Home</Link>
        </span>
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-parent">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            {errorEmail && (
              <small className="small">Email does not exist</small>
            )}
          </div>
          <div className="input-parent">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {errorPassword && (
              <small className="small">Password is wrong</small>
            )}
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
