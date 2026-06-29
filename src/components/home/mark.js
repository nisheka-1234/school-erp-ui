import React, {
  useState,
  useEffect
} from "react";

import "./mark.css";

import {
  FaArrowLeft,
  FaHome,
  FaPlus,
  FaSave,
  FaEdit,
  FaChartPie,
  FaSearch
} from "react-icons/fa";

function Markspage(props) {

  const isStudentView =
    props.isStudent;

  const [examTitle, setExamTitle] =
    useState("");

  const [editable, setEditable] =
    useState(false);

  const [showPopup, setShowPopup] =
    useState(false);

  const [examNumber, setExamNumber] =
    useState(1);

  const [showTotal, setShowTotal] =
    useState(false);

  const [searchExam, setSearchExam] =
    useState("");
    const [examList, setExamList] =
  useState([]);

const [showExamList, setShowExamList] =
  useState(false);

  const [rows, setRows] = useState([
    {
      id: 1,
      subject: "",
      marks: "",
      outof: ""
    }
  ]);


  

  useEffect(() => {

    const loadStudentMarks =
    async () => {

      try {

        const studentId =
          props.student?._id ||
          props.student?.id ||
          props.student?.studentId;

        if (!studentId) return;

        const response =
        await fetch(

          `https://school-erp-server-4.onrender.com/marks/all/${studentId}`

        );

        const data =
        await response.json();

        console.log(
          "STUDENT MARKS:",
          data
        );
      if (
  data &&
  data.length > 0
) {

  setExamTitle("");

  setRows([
    {
      id: 1,
      subject: "",
      marks: "",
      outof: ""
    }
  ]);

  setShowTotal(false);


        }

      } catch (err) {

        console.log(
          "LOAD MARKS ERROR:",
          err
        );

      }

    };

    loadStudentMarks();

  }, [props.student]);


  

  const addRow = () => {

    setRows([
      ...rows,
      {
        id: rows.length + 1,
        subject: "",
        marks: "",
        outof: ""
      }
    ]);

  };


  

  const updateRow = (
    index,
    field,
    value
  ) => {

    const updated = [...rows];

    updated[index][field] = value;

    setRows(updated);

  };


 

  const totalMarks =
    rows.reduce(
      (sum, row) =>
        sum + Number(row.marks || 0),
      0
    );

  const totalOutOf =
    rows.reduce(
      (sum, row) =>
        sum + Number(row.outof || 0),
      0
    );

  const average =
    totalOutOf > 0
      ? (
          (totalMarks / totalOutOf) *
          100
        ).toFixed(1)
      : 0;


 

  const saveMarksToDB =
  async () => {

    try {

      const studentId =
        props.student?._id ||
        props.student?.id ||
        props.student?.studentId;

      const response =
      await fetch(

        "https://school-erp-server-4.onrender.com/marks/save",

        {

          method: "POST",

          headers: {

            "Content-Type":
            "application/json",

          },

          body: JSON.stringify({

            studentId:
              studentId,

            studentname:
              props.student?.name || "",

            registernumber:
              props.student?.regno || "",

            examtitle:
              examTitle,

            rows:
              rows,

            totalmarks:
              totalMarks,

            totaloutof:
              totalOutOf,

            average:
              average,

          }),

        }

      );

      const data =
      await response.text();

      console.log(
        "SAVE RESPONSE:",
        data
      );

    }

    catch (err) {

      console.log(
        "SAVE ERROR:",
        err
      );

    }

  };
  const loadExamNames =
async () => {

  try {

    const studentId =
      props.student?._id ||
      props.student?.id ||
      props.student?.studentId;

    const response =
      await fetch(
        `https://school-erp-server-4.onrender.com/marks/all/${studentId}`
      );

    const data =
      await response.json();

    setExamList(data || []);

    setShowExamList(true);

  }

  catch (err) {

    console.log(
      "LOAD EXAMS ERROR:",
      err
    );

  }

};


  

  const searchSavedMarks =
  async () => {

    try {

      const studentId =
        props.student?._id ||
        props.student?.id ||
        props.student?.studentId;

      const response =
      await fetch(

        `https://school-erp-server-4.onrender.com/marks/search/${searchExam}?studentId=${studentId}`

      );

      const data =
      await response.json();

      console.log(
        "SEARCH RESULT:",
        data
      );

      if (!data) {

        alert("No Exam Found");

        return;

      }

      setExamTitle(
        data.examtitle || ""
      );

      setRows(
        data.rows || []
      );

      setShowTotal(true);

    }

    catch (err) {

      console.log(
        "SEARCH ERROR:",
        err
      );

    }

  };


 

  const handleSave = () => {

    setEditable(false);

    setShowPopup(true);

    saveMarksToDB();

    setTimeout(() => {

      setShowPopup(false);

    }, 2500);

  };


  return (

    <div className="marks-main-container">



      <div className="marks-navbar">

        <button
          className="marks-nav-btn"
          onClick={props.goBack}
        >

          <FaArrowLeft />

        </button>

        <button
          className="marks-nav-btn home-btn"
          onClick={props.goHome}
        >

          <FaHome />

          Back To Home

        </button>

      </div>


      {/* TOP */}

      <div className="marks-top-section">

        <h1>

          Student Marks

        </h1>

        <p>

          Manage Examination Results

        </p>

      </div>


      

      <div className="search-box">

        <FaSearch className="search-icon"  onClick={loadExamNames}/>

        <input
          type="text"
          placeholder="Search Saved Exams"
          value={searchExam}

          onChange={(e) =>
            setSearchExam(
              e.target.value
            )
          }

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              searchSavedMarks();

            }

          }}
        />

      </div>
      {showExamList && (

  <div className="exam-list">

    {examList.map(
      (exam, index) => (

        <div
          key={index}
          className="exam-item"
          onClick={() => {

            setExamTitle(
              exam.examtitle || ""
            );

            setRows(
              exam.rows || []
            );

            setShowTotal(true);

            setShowExamList(false);

          }}
        >

          {exam.examtitle}

        </div>

      )
    )}

  </div>

)}
{!isStudentView && (

     

      <div className="title-box">

        <input
          type="text"

          placeholder={`Enter Exam ${examNumber} Name`}

          value={examTitle}

          disabled={
            isStudentView || !editable
          }

          onChange={(e) =>
            setExamTitle(
              e.target.value
            )
          }
        />

      </div>
      )}


      {/* TABLE */}

      <div className="marks-table-container">

        <table className="marks-table">

          <thead>

            <tr>

              <th>
                Sl No
              </th>

              <th>
                Subject Name
              </th>

              <th>
                Marks
              </th>

              <th>
                Out Of
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map(
              (
                row,
                index
              ) => (

                <tr key={row.id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>

                    <input
                      value={
                        row.subject
                      }

                      disabled={
                        isStudentView || !editable
                      }

                      onChange={(e) =>
                        updateRow(
                          index,
                          "subject",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="number"

                      value={
                        row.marks
                      }

                      disabled={
                        isStudentView || !editable
                      }

                      onChange={(e) =>
                        updateRow(
                          index,
                          "marks",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="number"

                      value={
                        row.outof
                      }

                      disabled={
                        isStudentView || !editable
                      }

                      onChange={(e) =>
                        updateRow(
                          index,
                          "outof",
                          e.target.value
                        )
                      }
                    />

                  </td>

                </tr>

              )
            )}


            {showTotal && (

              <tr className="total-row">

                <td colSpan="2">

                  TOTAL

                </td>

                <td>

                  {totalMarks}

                </td>

                <td>

                  {totalOutOf}

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>



      {!isStudentView && (

      <div className="marks-action-buttons">

        <button
          className="add-row-btn"
          onClick={addRow}
        >

          <FaPlus />

          Add Row

        </button>
<button
  className="edit-btn"
  onClick={() => {

    setEditable(true);

    setExamTitle("");

    setRows([
      {
        id: 1,
        subject: "",
        marks: "",
        outof: ""
      }
    ]);

    setShowTotal(false);

  }}
>
  <FaEdit />
  Edit
</button>

        <button
          className="save-btn"
          onClick={handleSave}
        >

          <FaSave />

          Save

        </button>

        <button
          className="total-btn"

          onClick={() =>
            setShowTotal(true)
          }
        >

          <FaChartPie />

          Total

        </button>

        <button
          className="new-exam-btn"

          onClick={() => {

            setExamNumber(
              examNumber + 1
            );

            setRows([
              {
                id: 1,
                subject: "",
                marks: "",
                outof: ""
              }
            ]);

            setExamTitle("");

            setEditable(true);

            setShowTotal(false);

          }}
        >

          New Exam

        </button>

      </div>

      )}


      {/* RESULT */}

      {showTotal && (

        <div className="result-box">

          <div className="average-box">

            <h2>
              Average
            </h2>

            <h1>
              {average}%
            </h1>

          </div>


          <div className="pie-chart">

            <div
              className="pie-fill"
              style={{
                background:
                  `conic-gradient(
                    #3b82f6 0% ${average}%,
                    rgba(255,255,255,0.15) ${average}% 100%
                  )`
              }}
            >

              <div className="pie-center">

                {average}%

              </div>

            </div>

          </div>

        </div>

      )}


      

      {showPopup && (

        <div className="save-popup">

          Saved Successfully

        </div>

      )}

    </div>

  );

}

export default Markspage;