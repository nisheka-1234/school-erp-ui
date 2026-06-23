import React from "react";
import "./homepage.css";

import {
  FaHome,
  FaSignOutAlt,
  
  FaBullhorn,
  FaGraduationCap
} from "react-icons/fa";


function Homepage(props) {

  const classes = [
    "Pre KG",
    "LKG",
    "UKG",
    "1 STD",
    "2 STD",
    "3 STD",
    "4 STD",
    "5 STD",
    "6 STD",
    "7 STD",
    "8 STD",
    "9 STD",
    "10 STD",
    "11 STD",
    "12 STD"
  ];

  return (

    <div className="home-container">

   

      <div className="navbar">

        <div className="nav-left">

          <FaHome className="nav-icon" />

          <h2>Teacher Home</h2>

        </div>

        <button
          className="logout-btn"
          onClick={props.goLogout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>


     

      <div className="top-text">

        <h1>
          Ready To Update? 📝
        </h1>

        <p>
          Log Today's Improvement
        </p>

      </div>


     
<div className="quote-box">

  <h2>
    "Every Entry Tells A Student's Story"
  </h2>

</div>


      

      <div className="class-grid">

        {classes.map((item, index) => (

          <button
            key={index}
            className="class-btn"
            onClick={()=>props.openClass(item)}
          >

            <FaGraduationCap />

            {item}

          </button>

        ))}

      </div>


      

      <button className="announcement-btn" onClick={props.goAnnouncement}>

        <FaBullhorn />

        Announcement

      </button>

    </div>

  );

}

export default Homepage;