import React from "react";
import "./welcome.css";

import bgImage from "../../assets/background.jpg";

function Welcome(props) {

  return (

    <div
      className="welcome-container"

      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >

      <div className="welcome-overlay">

        <div className="welcome-box">

          <h1 className="welcome-text">

            Welcome To
            <br />
            School Companion

          </h1>

          <p className="welcome-subtext">

            Smart School Management System

          </p>

          <div className="line"></div>

          <button
            className="login-btn"

            onClick={props.goTeacher}
          >

            Teacher Login

          </button>

          <button
            className="login-btn"

            onClick={props.goStudent}
          >

            Student Login

          </button>

        </div>

      </div>

    </div>

  );

}

export default Welcome;