import React, { useState } from "react";
import Swal from "sweetalert2";

import "./teacherlogin.css";
import bgImage from "../../assets/background.jpg";

function Teacherlogin(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = () => {

  const teacherUser = "adminlogin";
  const teacherPass = "admin@0987";

  if (
    username === teacherUser &&
    password === teacherPass
  ) {

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome!"
    });

    props.goHome();

  } else {

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Wrong Username or Password"
    });

  }

};
  return (

    <div
      className="teacher-page-container"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >

      <div className="teacher-overlay">

        <div className="teacher-page-box">

          <h2>Teacher Login</h2>

          <p className="login-subtitle">
            Access Teacher Dashboard
          </p>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>
            Login
          </button>

        </div>

      </div>

    </div>

  );

}

export default Teacherlogin;