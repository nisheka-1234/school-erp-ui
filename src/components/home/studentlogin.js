import React, { useState } from "react";
import Swal from "sweetalert2";
import "./studentlogin.css";

import bgImage from "../../assets/background.jpg";

function Studentlogin(props) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");
const handleLogin = async () => {

  try {

    const response =
      await fetch(

        "https://school-erp-server-4.onrender.com/student/login",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            username,
            password

          })

        }

      );

    const data =
      await response.json();

    console.log(
      "LOGIN RESPONSE:",
      data
    );

    if (response.ok) {

     Swal.fire({
  icon: "success",
  title: "Login Successful",
  text: "Welcome!"
}); 

      props.setSelectedStudent(
        data
      );

      props.goStudentHome();

    }

    else {

      alert(
        data.message
      );

    }

  }

  catch (error) {

    console.log(error);

    alert("Server Error");

  }

};
  return (

    <div
      className="student-page-container"

      style={{
        backgroundImage:
          `url(${bgImage})`
      }}
    >

      <div className="student-overlay">

        <div className="student-page-box">

          <h2>

            Student Login

          </h2>

          <p className="student-subtitle">

            Access Student Dashboard

          </p>

          <input
            type="text"

            placeholder="Enter Username"

            value={username}

            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="password"

            placeholder="Enter Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            onClick={handleLogin}
          >

            Login

          </button>

        </div>

      </div>

    </div>

  );

}

export default Studentlogin;