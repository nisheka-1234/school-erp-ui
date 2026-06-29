import React, {

  useState,
  useEffect

} from "react";

import "./announcement.css";

import axios from "axios";

import {

  FaArrowLeft,
  FaHome,
  FaPaperPlane

} from "react-icons/fa";

import bottomImg
from "../../assets/school.jpg";


function Announcementpage(props) {

  const [message, setMessage] =
  useState("");

  const [showPopup, setShowPopup] =
  useState(false);

  const [announcements,
  setAnnouncements] =
  useState([]);


  /* LOAD FROM DB */

  useEffect(() => {

    fetchAnnouncements();

  }, []);

const fetchAnnouncements = async () => {
  try {
    const res = await axios.get(
      "https://school-erp-server-4.onrender.com/announcement/get"
    );

    setAnnouncements(res.data); // ✔ show ALL announcements from DB
  } catch (error) {
    console.log(error);
  }
};

  /* SEND */

  const sendAnnouncement =
  async () => {

    if (message.trim() === "") {

      return;

    }

    const newAnnouncement = {

      text: message,

      date:
      new Date()
      .toLocaleDateString(),

      time:
      new Date()
      .toLocaleTimeString()

    };

    try {

      await axios.post(

        "https://school-erp-server-4.onrender.com/announcement/save",

        newAnnouncement

      );

      fetchAnnouncements();

      setShowPopup(true);

      setMessage("");

      setTimeout(() => {

        setShowPopup(false);

      }, 2500);

    }

    catch (error) {

      console.log(error);

    }

  };


  return (

    <div className=
    "announcement-container">

      {/* NAVBAR */}

      <div className=
      "announcement-navbar">

        <button
          className="nav-btn"
          onClick={props.goBack}
        >

          <FaArrowLeft />

        </button>

        <button
          className="nav-btn"
          onClick={props.goHome}
        >

          <FaHome />

          Back To Home

        </button>

      </div>


      {/* TOP */}

      <div className=
      "announcement-banner">

        <div>

          <h1>
            Announcements
          </h1>

          <p>
            Send Messages
            To Students
          </p>

        </div>

      </div>


      {/* MESSAGE */}

      <div className=
      "message-box">

        <textarea

          placeholder=
          "Type Announcement Here..."

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

        ></textarea>

        <button
          onClick={
            sendAnnouncement
          }
        >

          <FaPaperPlane />

          Send Message

        </button>

      </div>


      {/* OLD */}

      <div className=
      "old-announcements">

        <h2>
          Sent Announcements
        </h2>

        {announcements.map(
          (item, index) => (

            <div
              key={index}
              className=
              "announcement-card"
            >

              <h3>
                {item.text}
              </h3>

              <p>

                {item.date}

                {" "}

                {item.time}

              </p>

            </div>

          )
        )}

      </div>


      {/* POPUP */}

      {showPopup && (

        <div className="popup">

          Announcement Sent
          Successfully ✅

        </div>

      )}


      {/* IMAGE */}

      <img

        src={bottomImg}

        alt="bottom"

        className="bottom-img"

      />

    </div>

  );

}

export default Announcementpage;