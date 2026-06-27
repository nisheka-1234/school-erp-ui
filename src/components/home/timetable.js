import React, {
  useState,
  useEffect
} from "react";

import "./timetable.css";

import {
  FaArrowLeft,
  FaHome,
  FaPlus,
  FaSave,
  FaEdit,
  FaPaperPlane,
  FaTrash
} from "react-icons/fa";

function Timetablepage(props) {

  
  const isStudentView =
    props.isStudent;

  const [editable, setEditable] =
    useState(false);

  const [showPopup, setShowPopup] =
    useState(false);

  const [popupText, setPopupText] =
    useState("");

  const [
    announcement,
    setAnnouncement
  ] = useState("");

  const [
    announcementDate,
    setAnnouncementDate
  ] = useState("");

  const [
    announcementTime,
    setAnnouncementTime
  ] = useState("");

  const [
    selectedRow,
    setSelectedRow
  ] = useState(null);

  const [
    selectedColumn,
    setSelectedColumn
  ] = useState(null);

  const [columns, setColumns] =
    useState([
      "Period 1",
      "Period 2",
      "Period 3"
    ]);

  const [rows, setRows] =
    useState([
      {
        day: "Monday",
        values: ["", "", ""]
      },

      {
        day: "Tuesday",
        values: ["", "", ""]
      },

      {
        day: "Wednesday",
        values: ["", "", ""]
      },

      {
        day: "Thursday",
        values: ["", "", ""]
      },

      {
        day: "Friday",
        values: ["", "", ""]
      }
    ]);

  

  const addRow = () => {

    setRows([

      ...rows,

      {
        day:
          `Day ${rows.length + 1}`,

        values:
          Array(
            columns.length
          ).fill("")
      }

    ]);

  };

  

  const addColumn = () => {

    const newColumns = [

      ...columns,

      `Period ${columns.length + 1}`

    ];

    setColumns(newColumns);

    const updatedRows =
      rows.map((row) => ({

        ...row,

        values: [
          ...row.values,
          ""
        ]

      }));

    setRows(updatedRows);

  };

  /* DELETE ROW */

  const deleteRow = (
    rowIndex
  ) => {

    const updated =
      rows.filter(
        (_, index) =>
          index !== rowIndex
      );

    setRows(updated);

  };

  /* DELETE COLUMN */

  const deleteColumn = (
    colIndex
  ) => {

    const updatedColumns =
      columns.filter(
        (_, index) =>
          index !== colIndex
      );

    setColumns(updatedColumns);

    const updatedRows =
      rows.map((row) => ({

        ...row,

        values:
          row.values.filter(
            (_, index) =>
              index !== colIndex
          )

      }));

    setRows(updatedRows);

  };

  /* UPDATE CELL */

  const updateCell = (

    rowIndex,
    colIndex,
    value

  ) => {

    const updated = [...rows];

    updated[rowIndex]
      .values[colIndex] =
      value;

    setRows(updated);

  };

  /* SHOW POPUP */

  const showMessage = (
    text
  ) => {

    setPopupText(text);

    setShowPopup(true);

    setTimeout(() => {

      setShowPopup(false);

    }, 2500);

  };

  /* SAVE TIMETABLE */

  const handleSave =
  async () => {

    try {

      const payload = {

        classname:
          props.className,

        columns,

        rows,

        announcement: {

          text:
            announcement,

          date:
            announcementDate ||

            new Date()
            .toLocaleDateString(),

          time:
            announcementTime ||

            new Date()
            .toLocaleTimeString()

        }

      };

      console.log(
        "SENDING:",
        payload
      );

      const response =
        await fetch(

          "https://school-erp-server-fmwp.onrender.com/timetable/save",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body:
              JSON.stringify(
                payload
              )

          }

        );

      const text =
        await response.text();

      console.log(
        "SERVER:",
        text
      );

      if (response.ok) {

        setEditable(false);

        showMessage(
          "Time Table Saved Successfully"
        );

      }

      else {

        showMessage(
          "Save Failed"
        );

      }

    }

    catch (err) {

      console.log(err);

      showMessage(
        "Server Error"
      );

    }

  };

  const sendAnnouncement = async () => {
  try {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const payload = {
      classname: props.className,
      columns,
      rows,
      announcement: {
        text: announcement,
        date: currentDate,
        time: currentTime,
      },
    };

    const response = await fetch(
      "https://school-erp-server-fmwp.onrender.com/timetable/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    console.log("SERVER RESPONSE:", data);

    if (response.ok) {
      setAnnouncement(""); 
      setAnnouncementDate(currentDate);
      setAnnouncementTime(currentTime);

      showMessage("Announcement Sent & Saved");
    } else {
      showMessage("Announcement Failed");
    }
  } catch (err) {
    console.log(err);
    showMessage("Server Error");
  }
};

  /* LOAD */

  useEffect(() => {

    if (!props.className)
      return;

    const loadData =
    async () => {

      try {

        const response =
          await fetch(
            `https://school-erp-server-fmwp.onrender.com/timetable/get/${props.className}`
          );

        const data =
          await response.json();

        console.log(data);

        if (data) {

          setColumns(
            data.columns || []
          );

          setRows(
            data.rows || []
          );

          setAnnouncement(

            data
            ?.announcement
            ?.text || ""

          );

          setAnnouncementDate(

            data
            ?.announcement
            ?.date || ""

          );

          setAnnouncementTime(

            data
            ?.announcement
            ?.time || ""

          );

        }

      }

      catch (err) {

        console.log(err);

      }

    };

    loadData();

  }, [props.className]);

  return (

    <div className=
    "timetable-container">

      {/* NAVBAR */}

      <div className=
      "timetable-navbar">

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
      "timetable-banner">

        <div>

          <h1>
            Time Table
          </h1>

          <p>
            Weekly Class Schedule
          </p>

        </div>

      </div>

      

      <div className=
      "table-box">

        <table>

          <thead>

            <tr>

              <th>
                Day
              </th>

              {columns.map(

                (
                  column,
                  index
                ) => (

                  <th
                    key={index}
                  >

                    {column}

                  </th>

                )

              )}

            </tr>

          </thead>

          <tbody>

            {rows.map(

              (
                row,
                rowIndex
              ) => (

                <tr
                  key={rowIndex}
                >

                  <td>
                    {row.day}
                  </td>

                  {row.values.map(

                    (
                      value,
                      colIndex
                    ) => (

                      <td
                        key={colIndex}
                      >

                        <input

                          value={value}

                          disabled={
                            isStudentView ||
                            !editable
                          }

                          onChange={(e) =>
                            updateCell(

                              rowIndex,
                              colIndex,
                              e.target.value

                            )
                          }

                        />

                      </td>

                    )

                  )}

                </tr>

              )

            )}

          </tbody>

        </table>

      </div>

    

      {!isStudentView && (

        <div className=
        "table-buttons">

          <button
            onClick={addRow}
          >

            <FaPlus />

            Add Row

          </button>

          <button
            onClick={addColumn}
          >

            <FaPlus />

            Add Column

          </button>

          <button

            onClick={() =>
              setEditable(true)
            }

          >

            <FaEdit />

            Edit

          </button>

          <button
            onClick={handleSave}
          >

            <FaSave />

            Save

          </button>

          <button

            onClick={() => {

              if (
                selectedRow !== null
              ) {

                deleteRow(
                  selectedRow
                );

                setSelectedRow(
                  null
                );

              }

              else if (
                selectedColumn !== null
              ) {

                deleteColumn(
                  selectedColumn
                );

                setSelectedColumn(
                  null
                );

              }

            }}

          >

            <FaTrash />

            Delete

          </button>

        </div>

      )}

      

      {!isStudentView && (

        <div className=
        "announcement-box">

          <textarea

            placeholder=
            "Type Announcement..."

            value={announcement}

            onChange={(e) =>

              setAnnouncement(
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

            Send

          </button>

        </div>

      )}

    

      {isStudentView &&
      announcement && (

        <div className=
        "student-class-announcement">

          <h2>
            Class Announcement
          </h2>

          <p>
            {announcement}
          </p>

          <small>

            {announcementDate}

            {" "}

            {announcementTime}

          </small>

        </div>

      )}

      

      {showPopup && (

        <div className=
        "popup">

          {popupText}

        </div>

      )}

    </div>

  );

}

export default Timetablepage;