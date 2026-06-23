import React, { useState, useEffect } from "react";
import "./attenence.css";

import {
  FaArrowLeft,
  FaHome,
  FaThumbsUp
} from "react-icons/fa";

function Studentdetails(props) {

  const [selectedDate, setSelectedDate] = useState(null);

  // attendance stored separately by month
  const [attendanceData, setAttendanceData] = useState({});

  const [showOptions, setShowOptions] = useState(false);

  const [workingDays, setWorkingDays] = useState(0);

  const [absentDays, setAbsentDays] = useState(0);

  const [progress, setProgress] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(0);

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
  ];

  const currentMonthData = months[currentMonth];

  const dayNames = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
  ];

  // SELECT DATE
  const selectDate = (month, day) => {

    // ✅ STUDENT CANNOT EDIT
    if (props.isStudent) return;

    setSelectedDate({
      month,
      day
    });

    setShowOptions(true);
  };

  // SET ATTENDANCE
  const setAttendance = (type) => {

    // ✅ STUDENT CANNOT EDIT
    if (props.isStudent) return;

    if (!selectedDate) return;

    const {
      month,
      day
    } = selectedDate;

    setAttendanceData((prev) => ({

      ...prev,

      [month]: {

        ...(prev[month] || {}),

        [day]: type

      }

    }));

    setShowOptions(false);
  };

  // DATE COLOR
  const getColor = (month, day) => {

    const value =
      attendanceData?.[month]?.[day];

    if (value === "present")
      return "#3b82f6";

    if (value === "absent")
      return "#6366f1";

    if (value === "holiday")
      return "#0ea5e9";

    return "rgba(255,255,255,0.92)";
  };

  // SAVE ATTENDANCE
  const handleSave = async () => {

    // ✅ STUDENT CANNOT SAVE
    if (props.isStudent) return;

    try {

      const monthName =
        currentMonthData.name;

      const monthData =
        attendanceData?.[monthName] || {};

      const studentId =
        props.student?._id ||
        props.student?.id ||
        props.student?.studentId;

      const res = await fetch(
        "http://localhost:5000/attendance/save",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            studentId,

            studentname:
              props.student?.name || "",

            classname:
              props.student?.classname || "",

            month: monthName,

            attendance: monthData

          })
        }
      );

      const text = await res.text();

      console.log(text);

      if (!res.ok) {
        console.log("SAVE FAILED");
        return;
      }

      setShowPopup(true);

      setTimeout(() => {

        setShowPopup(false);

      }, 2500);

    } catch (err) {

      console.log(
        "SAVE ERROR:",
        err.message
      );

    }
  };

  // LOAD SAVED ATTENDANCE
  useEffect(() => {

    const loadAttendance = async () => {

      try {

        const studentId =
          props.student?._id ||
          props.student?.id ||
          props.student?.studentId;

        if (!studentId) return;

        const res = await fetch(
          `http://localhost:5000/attendance/get?studentId=${studentId}`
        );

        const data = await res.json();

        const formattedData = {};

        data.forEach((item) => {

          formattedData[item.month] =
            item.attendance || {};

        });

        setAttendanceData(formattedData);

      } catch (err) {

        console.log(
          "Load Attendance Error:",
          err.message
        );

      }

    };

    loadAttendance();

  }, [props.student]);

  // AUTO UPDATE WORKING DAYS / ABSENT / PROGRESS
  useEffect(() => {

    setSelectedDate(null);

    setShowOptions(false);

    const monthName =
      currentMonthData.name;

    const monthData =
      attendanceData?.[monthName] || {};

    const values =
      Object.values(monthData);

    const total = values.filter(
      v =>
        v === "present" ||
        v === "absent"
    ).length;

    const absent = values.filter(
      v => v === "absent"
    ).length;

    const present = values.filter(
      v => v === "present"
    ).length;

    setWorkingDays(total);

    setAbsentDays(absent);

    const percentage =
      total === 0
        ? 0
        : (present / total) * 100;

    setProgress(percentage);

  }, [
    attendanceData,
    currentMonth,
    currentMonthData.name
  ]);

  return (

    <div className="details-container">

      {/* NAVBAR */}

      <div className="details-navbar">

        <button
          className="back-btn"
          onClick={props.goBack}
        >
          <FaArrowLeft />
        </button>

        <button
          className="home-btn"
          onClick={props.goHome}
        >
          <FaHome />
          Back To Home
        </button>

      </div>

      {/* BANNER */}

      <div className="details-banner">

        <div>

          <h1>
            {props.student?.name || "Student"}
          </h1>

          <p>
            2026 Attendance Management
          </p>

        </div>

      </div>

      {/* TOP BUTTONS */}

      <div className="top-buttons">

        <button className="active-btn">
          Attendance
        </button>

        <button onClick={props.goMarks}>
          Marks
        </button>

        <button onClick={props.goFees}>
          Fees
        </button>

        
      </div>

      {/* CALENDAR */}

      <div className="calendar-container">

        <div className="month-box">

          <div className="month-top">

            <button
              className="month-arrow"
              onClick={() =>
                currentMonth > 0 &&
                setCurrentMonth(currentMonth - 1)
              }
            >
              ←
            </button>

            <h2>
              {currentMonthData.name} 2026
            </h2>

            <button
              className="month-arrow"
              onClick={() =>
                currentMonth < 11 &&
                setCurrentMonth(currentMonth + 1)
              }
            >
              →

            </button>

          </div>

          {/* DAY NAMES */}

          <div className="days-row">

            {dayNames.map((day) => (

              <div
                key={day}
                className="day-name"
              >
                {day}
              </div>

            ))}

          </div>

          {/* DATES */}

          <div className="dates-grid">

            {Array.from({

              length:
                new Date(
                  2026,
                  currentMonth,
                  1
                ).getDay()

            }).map((_, index) => (

              <div key={index}></div>

            ))}

            {Array.from({

              length: currentMonthData.days

            }, (_, i) => i + 1).map((day) => (

              <div

                key={day}

                className="date-box"

                style={{
                  background:
                    getColor(
                      currentMonthData.name,
                      day
                    ),

                  cursor:
                    props.isStudent
                      ? "default"
                      : "pointer"
                }}

                onClick={() =>
                  selectDate(
                    currentMonthData.name,
                    day
                  )
                }

              >

                {day}

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* OPTIONS */}

      {!props.isStudent && showOptions && (

        <div className="attendance-options">

          <button
            className="present-btn"
            onClick={() =>
              setAttendance("present")
            }
          >
            Present
          </button>

          <button
            className="absent-btn"
            onClick={() =>
              setAttendance("absent")
            }
          >
            Absent
          </button>

          <button
            className="holiday-btn"
            onClick={() =>
              setAttendance("holiday")
            }
          >
            Holiday
          </button>

          <button
            className="none-btn"
            onClick={() =>
              setAttendance("none")
            }
          >
            None
          </button>

        </div>

      )}

      {/* INPUTS */}

      <div className="attendance-inputs">

        <input
          value={`Working Days : ${workingDays}`}
          readOnly
        />

        <input
          value={`Absent Days : ${absentDays}`}
          readOnly
        />

      </div>

      {/* PROGRESS */}

      <div className="progress-section">

        <div className="progress-line">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          ></div>

        </div>

      </div>

      {/* SAVE */}

      {!props.isStudent && (

        <div className="save-box">

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Attendance
          </button>

        </div>

      )}

      {/* POPUP */}

      {showPopup && (

        <div className="popup">

          <FaThumbsUp />

          Saved Successfully

        </div>

      )}

    </div>

  );
}

export default Studentdetails;