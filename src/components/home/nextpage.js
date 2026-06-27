import React, { useState, useEffect } from "react";
import "./nextpage.css";

import {
  FaArrowLeft,
  FaSave,
  FaEdit,
  FaEye,
  FaPlus
} from "react-icons/fa";

function Studentpage(props) {

  console.log("CLASS FROM PARENT:", props.className);

  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

 
  useEffect(() => {

    console.log(
      "CLASS NAME RECEIVED:",
      props.className
    );

  }, [props.className]);


  useEffect(() => {

    if (!props.className) return;

    fetch(
      `https://school-erp-server-fmwp.onrender.com/details/student?classname=${props.className}`
    )
      .then((res) => res.json())

      .then((data) => {

        console.log("STUDENT DATA:", data);

        const formatted = data.map((s, i) => ({

          
          id: s._id,

          slno: i + 1,

          name:
            s.studentname ||
            s.name ||
            "",

          regno:
            s.registernumber ||
            s.regno ||
            "",

          username:
            s.username ||
            "",

          password:
            s.password ||
            "",

          classname:
            s.classname ||
            ""

        }));

        setStudents(formatted);

      })

      .catch((err) =>
        console.log(err)
      );

  }, [props.className]);

  
  const addRow = () => {

    const newStudent = {

     
      id: Date.now(),

      slno: students.length + 1,

      name: "",

      regno: "",

      username: "",

      password: "",

      classname:
        props.className || ""

    };

    setStudents([
      ...students,
      newStudent
    ]);

  };

  
  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...students];

    updated[index][field] = value;

    setStudents(updated);

  };

  
  const saveStudentsToDB = async () => {

    try {

      const payload = students

        .filter(
          (s) =>
            s.name || s.regno
        )

        .map((s) => ({

          name: s.name,

          regno: s.regno,

          username: s.username,

          password: s.password,

          classname:
            props.className || ""

        }));

      console.log(
        "SAVE PAYLOAD:",
        payload
      );

      await fetch(
        "https://school-erp-server-fmwp.onrender.com/details/savestudent",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(
            payload
          )

        }
      );

    } catch (error) {

      console.log(error);

    }

  };


  const handleSave = async () => {

    await saveStudentsToDB();

    fetch(
      `https://school-erp-server-fmwp.onrender.com/details/student?classname=${props.className}`
    )
      .then((res) => res.json())

      .then((data) => {

        const formatted = data.map((s, i) => ({

          id: s._id,

          slno: i + 1,

          name:
            s.studentname ||
            s.name ||
            "",

          regno:
            s.registernumber ||
            s.regno ||
            "",

          username:
            s.username ||
            "",

          password:
            s.password ||
            "",

          classname:
            s.classname ||
            ""

        }));

        setStudents(formatted);

      });

    setEditMode(false);

    setShowPopup(true);

    setTimeout(() => {

      setShowPopup(false);

    }, 2000);

  };

  return (

    <div className="glass-main-container">

      <div className="glass-navbar">

        <button
          className="glass-back-btn"
          onClick={props.goHome}
        >

          <FaArrowLeft />

          Back To Home

        </button>

      </div>

      <div className="glass-top-section">

        <h1>
          {props.className} Students
        </h1>

        <p>
          Manage Every Student Easily
        </p>

      </div>

      
      <div className="glass-table-wrapper">

        <table className="glass-table">

          <thead>

            <tr>

              <th>SL NO</th>

              <th>Student Name</th>

              <th>Register Number</th>

              <th>Username</th>

              <th>Password</th>

            </tr>

          </thead>

          <tbody>

            {students.map((
              student,
              index
            ) => (

              <tr

                key={student.id}

                onClick={() => {

                  console.log(
                    "SELECTED:",
                    student
                  );

                  setSelectedStudent(
                    student
                  );

                }}

                className={
                  selectedStudent?.id ===
                  student.id
                    ? "glass-selected-row"
                    : ""
                }

              >

                <td>
                  {index + 1}
                </td>

                <td>

                  <input

                    className="glass-input"

                    value={student.name}

                    disabled={!editMode}

                    onChange={(e) =>
                      handleChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }

                  />

                </td>

                <td>

                  <input

                    className="glass-input"

                    value={student.regno}

                    disabled={!editMode}

                    onChange={(e) =>
                      handleChange(
                        index,
                        "regno",
                        e.target.value
                      )
                    }

                  />

                </td>

                <td>

                  <input

                    className="glass-input"

                    value={student.username}

                    disabled={!editMode}

                    onChange={(e) =>
                      handleChange(
                        index,
                        "username",
                        e.target.value
                      )
                    }

                  />

                </td>

                <td>

                  <input

                    className="glass-input"

                    value={student.password}

                    disabled={!editMode}

                    onChange={(e) =>
                      handleChange(
                        index,
                        "password",
                        e.target.value
                      )
                    }

                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      
      <div className="glass-button-section">

        <button
          className="glass-save-btn"
          onClick={handleSave}
          disabled={!editMode}
        >

          <FaSave />

          Save

        </button>

        <button
          className="glass-edit-btn"
          onClick={() =>
            setEditMode(true)
          }
        >

          <FaEdit />

          Edit

        </button>

        {selectedStudent && (

          <button
            className="glass-view-btn"
            onClick={() =>
              props.openStudent(
                selectedStudent
              )
            }
          >

            <FaEye />

            View Details

          </button>

        )}

        <button
          className="glass-add-btn"
          onClick={addRow}
        >

          <FaPlus />

          Add New Student

        </button>
        <button
  className="glass-view-btn"
  onClick={() =>
    props.openTimeTable()
  }
>

  Time Table & Announcement

</button>

      </div>

      {showPopup && (

        <div className="glass-popup">

          Saved Successfully ✅

        </div>

      )}

    </div>

  );
}

export default Studentpage;