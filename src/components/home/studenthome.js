import React from "react";
import "./studenthome.css";

import {
  FaHome,
  FaBell,
  FaChartLine,
  FaSignOutAlt,
  FaUserGraduate,
  FaBookOpen,
  FaCalendarCheck
} from "react-icons/fa";

function Studenthome(props) {
  return (
    <div className="student-home-main">

     
      <div className="student-home-navbar">

        <button
          className="student-nav-btn"
          onClick={props.goMainHome}
        >
          <FaHome />
          Home
        </button>

        <h2 className="student-logo">
          School Companion
        </h2>

        <div className="student-nav-right">

          <button
            className="student-icon-btn"
            onClick={props.goNotification}
          >
            <FaBell />
          </button>
          <button className="timetable-btn"
  onClick={props.goTimeTable}
>

  Time Table

</button>

          <button
            className="student-nav-btn logout-btn"
            onClick={props.goHome}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>

      
      <div className="student-top-box">
        <h1>
          Welcome Back, {props.student?.name || "Student"}
        </h1>

        <p>
          Track Your Attendance, Marks, Fees & Timetable
        </p>
      </div>

      
      <div className="student-card-section">

        <div className="student-glass-card">
          <FaUserGraduate className="student-card-icon" />
          <h2>Student Portal</h2>
          <p>View all your academic details easily</p>
        </div>

        <div className="student-glass-card">
          <FaBookOpen className="student-card-icon" />
          <h2>Learning Progress</h2>
          <p>Check your marks and exam performance</p>
        </div>

        <div className="student-glass-card">
          <FaCalendarCheck className="student-card-icon" />
          <h2>Attendance</h2>
          <p>Monitor daily attendance records instantly</p>
        </div>

      </div>

      
      <div className="student-progress-btn-box">
        <button
          className="student-progress-btn"
          onClick={props.goProgress}
        >
          <FaChartLine />
          View Your Progress
        </button>
      </div>

    </div>
  );
}

export default Studenthome;