import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useFetch(
    "https://my-json-database.herokuapp.com/users/" + id
  );

  useEffect(() => {
    const user = localStorage.getItem("userDetails");
    if (user === null) return navigate("/login");
    const convertUser = JSON.parse(user);
    // console.log(convertUser?.id);
    navigate(`/dashboard/${convertUser?.id}`);
  }, [navigate]);

  if (error) return <h2>Error...</h2>;
  if (loading) return <h2>Loading...</h2>;
  // console.log(data)

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  return (
    <div>
      <h1>
        Dashboard{" "}
        <span>
          Go Back <Link to="/">Home</Link>
        </span>{" "}
        or{" "}
        <Link to="/login" onClick={handleLogout}>
          Log Out
        </Link>
      </h1>

      <h2>Name: {data.firstName + " " + data.lastName}</h2>
      <h2>Email: {data.email}</h2>
    </div>
  );
};

export default Dashboard;
