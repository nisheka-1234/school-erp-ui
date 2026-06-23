import React, { useState, useEffect } from "react";
import "./fees.css";

import {
  FaArrowLeft,
  FaHome,
  FaPlus,
  FaSave,
  FaEdit,
  FaThumbsUp
} from "react-icons/fa";

import bottomImg from "../../assets/school.jpg";

function Feespage(props) {

  /* ✅ STUDENT VIEW CHECK */

  const isStudentView =
    props.isStudent;
  const [editable, setEditable] =
    useState(false);

  const [showPopup, setShowPopup] =
    useState(false);

  const [rows, setRows] = useState([
    {
      id: 1,
      _id: "",

      paymentDate: "",

      feesType: "",

      amount: "",

      paidAmount: ""
    }
  ]);

  /* SAFE STUDENT ID */

  console.log(
    "FULL STUDENT:",
    props.student
  );

  const studentId =
    props.student?._id ||
    props.student?.id ||
    props.student?.studentId;

  /* LOAD FEES */

  useEffect(() => {

    if (!studentId) {

      console.log(
        "Waiting for student..."
      );

      return;
    }

    const loadFees = async () => {

      try {

        const response = await fetch(
          `http://localhost:5000/fees/get/${studentId}`
        );

        const data =
          await response.json();

        console.log(
          "LOADED FEES:",
          data
        );

        if (
          Array.isArray(data) &&
          data.length > 0
        ) {

          setRows(

            data.map((item) => ({

              id: item._id,

              _id: item._id,

              paymentDate:
                item.paymentDate || "",

              feesType:
                item.feesType || "",

              amount:
                item.amount || "",

              paidAmount:
                item.paidAmount || ""

            }))

          );

        }

      } catch (err) {

        console.log(
          "LOAD ERROR:",
          err
        );

      }

    };

    loadFees();

  }, [studentId]);

  /* ADD ROW */

  const addRow = () => {

    setRows([

      ...rows,

      {

        id: Date.now(),

        _id: "",

        paymentDate: "",

        feesType: "",

        amount: "",

        paidAmount: ""

      }

    ]);

  };

  /* UPDATE ROW */

  const updateRow = (
    index,
    field,
    value
  ) => {

    const updated = [...rows];

    updated[index][field] = value;

    setRows(updated);

  };

  /* SAVE FEES */

  const handleSave = async () => {

    console.log(
      "STUDENT ID:",
      studentId
    );

    if (!studentId) {

      console.log(
        "Student not ready"
      );

      return;
    }

    try {

      const payload = rows.map(
        (row) => ({

          _id:
            row._id || "",

          studentId,

          studentname:
            props.student?.name || "",

          classname:
            props.student?.classname || "",

          paymentDate:
            row.paymentDate,

          feesType:
            row.feesType,

          amount:
            Number(
              row.amount || 0
            ),

          paidAmount:
            Number(
              row.paidAmount || 0
            )

        })
      );

      console.log(
        "SENDING:",
        payload
      );

      const response = await fetch(
        "http://localhost:5000/fees/save",
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

      const text =
        await response.text();

      console.log(
        "SAVE RESPONSE:",
        text
      );

      if (response.ok) {

        setShowPopup(true);

        setTimeout(() => {

          setShowPopup(false);

        }, 2500);

        setEditable(false);

      } else {

        console.log(
          "Save failed"
        );

      }

    } catch (err) {

      console.log(
        "SAVE ERROR:",
        err
      );

    }

  };

  /* TOTALS */

  const totalAmount =
    rows.reduce(

      (sum, row) =>

        sum +
        Number(row.amount || 0),

      0
    );

  const paidAmount =
    rows.reduce(

      (sum, row) =>

        sum +
        Number(
          row.paidAmount || 0
        ),

      0
    );

  const balance =
    totalAmount - paidAmount;

  return (

    <div className="fees-container">

      {/* NAVBAR */}

      <div className="fees-navbar">

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

      {/* BANNER */}

      <div className="fees-banner">

        <div>

          <h1>
            Student Fees
          </h1>

          <p>
            Fees Management System
          </p>

        </div>

      </div>

      {/* ✅ TEACHER ONLY BUTTONS */}

      {!isStudentView && (

      <div className="fees-buttons">

        <button onClick={addRow}>

          <FaPlus />

          Add Row

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

      </div>

      )}

      {/* TABLE */}

      <div className="fees-table-box">

        <table>

          <thead>

            <tr>

              <th>Sl No</th>

              <th>Payment Date</th>

              <th>Fees Type</th>

              <th>Amount</th>

              <th>Paid Amount</th>

              <th>Balance Amount</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {rows.map(
              (row, index) => (

                <tr key={row.id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>

                    <input

                      type="date"

                      value={
                        row.paymentDate
                      }

                      disabled={
                        isStudentView || !editable
                      }

                      onChange={(e) =>
                        updateRow(
                          index,
                          "paymentDate",
                          e.target.value
                        )
                      }

                    />

                  </td>

                  <td>

                    <input

                      value={
                        row.feesType
                      }

                      disabled={
                        isStudentView || !editable
                      }

                      onChange={(e) =>
                        updateRow(
                          index,
                          "feesType",
                          e.target.value
                        )
                      }

                    />

                  </td>

                  <td>

                    <input

                      type="number"

                      value={
                        row.amount
                      }

                      disabled={
                        isStudentView || !editable
                      }

                      onChange={(e) =>
                        updateRow(
                          index,
                          "amount",
                          e.target.value
                        )
                      }

                    />

                  </td>

                  <td>

                    <input

                      type="number"

                      value={
                        row.paidAmount
                      }

                      disabled={
                        isStudentView || !editable
                      }

                      onChange={(e) =>
                        updateRow(
                          index,
                          "paidAmount",
                          e.target.value
                        )
                      }

                    />

                  </td>

                  <td>

                    ₹

                    {Number(
                      row.amount || 0
                    ) -

                      Number(
                        row.paidAmount || 0
                      )}

                  </td>

                  <td>

                    <button

                      className={

                        Number(
                          row.amount || 0
                        ) ===

                        Number(
                          row.paidAmount || 0
                        )

                          ? "paid-btn paid"

                          : "paid-btn unpaid"
                      }

                    >

                      {

                        Number(
                          row.amount || 0
                        ) ===

                        Number(
                          row.paidAmount || 0
                        )

                          ? "Fully Paid"

                          : `Balance ₹${
                              Number(
                                row.amount || 0
                              ) -

                              Number(
                                row.paidAmount || 0
                              )
                            }`

                      }

                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* TOTAL */}

      <div className="fees-total-box">

        <div className="fees-card">

          <h2>
            Total Fees
          </h2>

          <h1>
            ₹{totalAmount}
          </h1>

        </div>

        <div className="fees-card">

          <h2>
            Total Paid Amount
          </h2>

          <h1>
            ₹{paidAmount}
          </h1>

        </div>

        <div className="fees-card">

          <h2>
            Balance
          </h2>

          <h1>
            ₹{balance}
          </h1>

        </div>

      </div>

      {/* POPUP */}

      {showPopup && (

        <div className="fees-popup">

          <FaThumbsUp />

          Fees Saved Successfully

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

export default Feespage;