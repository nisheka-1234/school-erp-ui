import React, { useEffect, useState, useCallback } from "react";
import "./studentannouncement.css";
import axios from "axios";
import { FaArrowLeft, FaBell } from "react-icons/fa";

function Studentannouncement(props) {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const globalRes = await axios.get(
        "https://school-erp-server-4.onrender.com/announcement/get"
      );

      const classRes = await axios.get(
        `https://school-erp-server-4.onrender.com/timetable/get/${props.className}`
      );

      const globalAnnouncements = globalRes.data || [];

      const classAnnouncement = classRes.data?.announcement?.text
        ? [
            {
              text: classRes.data.announcement.text,
              date: classRes.data.announcement.date,
              time: classRes.data.announcement.time,
              type: "class",
            },
          ]
        : [];

      setAnnouncements([
        ...classAnnouncement,
        ...globalAnnouncements.map((item) => ({
          text: item.text,
          date: item.date,
          time: item.time,
          type: "global",
        })),
      ]);
    } catch (error) {
      console.log(error);
    }
  }, [props.className]);


  useEffect(() => {
    if (props.className) {
      fetchAnnouncements();
    }
  }, [fetchAnnouncements, props.className]); 

  return (
    <div className="student-announcement-container">

      
      <div className="student-announcement-navbar">
        <button className="back-btn" onClick={props.goBack}>
          <FaArrowLeft />
          Back
        </button>

        <h2>Notifications</h2>
      </div>

      
      <div className="notification-wrapper">

        {announcements.length === 0 && (
          <div className="notification-card">
            <FaBell className="bell-icon" />
            <div>
              <h3>No Announcements Yet</h3>
            </div>
          </div>
        )}

        {announcements.map((item, index) => (
          <div key={index} className="notification-card">

            <FaBell className="bell-icon" />

            <div>

              <h3>
                {item.type === "class"
                  ? "Class Announcement"
                  : "School Announcement"}
              </h3>

              <p>{item.text}</p>

              <small>
                {item.date} {item.time}
              </small>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Studentannouncement;