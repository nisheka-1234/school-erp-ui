import React, { useState } from "react";

import Welcome from "./components/login/welcome";

import Teacherlogin from "./components/login/teacherlogin";

import Homepage from "./components/home/homepage";

import Studentpage from "./components/home/nextpage";

import Studentdetails from "./components/home/attenence";

import Markspage from "./components/home/mark";

import Feespage from "./components/home/fees";

import Timetablepage from "./components/home/timetable";

import Studentlogin from "./components/home/studentlogin";

import Studenthome from "./components/home/studenthome";

import Announcementpage from "./components/home/announcement";

import Studentannouncement from "./components/home/studentannouncement";


function App() {

  const [page, setPage] =
    useState("welcome");

  const [
    previousPage,
    setPreviousPage
  ] = useState("");

  const [
    selectedClass,
    setSelectedClass
  ] = useState("");

  const [
    selectedStudent,
    setSelectedStudent
  ] = useState(null);

  const [students, setStudents] =
    useState([]);

  /* LOGIN TYPE */

  const [
    isStudentLogin,
    setIsStudentLogin
  ] = useState(false);


  /* NAVIGATE */

  const navigate = (nextPage) => {

    setPreviousPage(page);

    setPage(nextPage);

  };


  /* WELCOME */

  if (page === "welcome") {

    return (

      <Welcome

        goTeacher={() =>
          navigate(
            "teacherlogin"
          )
        }

        goStudent={() =>
          navigate(
            "studentlogin"
          )
        }

      />

    );

  }


  /* TEACHER LOGIN */

  if (page === "teacherlogin") {

    return (

      <Teacherlogin

        goHome={() => {

          setIsStudentLogin(false);

          navigate("home");

        }}

      />

    );

  }


  /* STUDENT LOGIN */

  if (page === "studentlogin") {

    return (

      <Studentlogin

        setSelectedStudent={
          setSelectedStudent
        }

        goStudentHome={() => {

          setIsStudentLogin(true);

          navigate(
            "studenthome"
          );

        }}

      />

    );

  }


  /* TEACHER HOME */

  if (page === "home") {

    return (

      <Homepage

        goLogout={() =>
          navigate(
            "welcome"
          )
        }

        openClass={(
          className
        ) => {

          setSelectedClass(
            className
          );

          navigate(
            "students"
          );

        }}

        goAnnouncement={() =>
          navigate("announcement")
        }

      />

    );

  }


  /* STUDENTS PAGE */

  if (page === "students") {

    return (

      <Studentpage

        className={selectedClass}

        students={students}

        setStudents={setStudents}

        goHome={() =>
          navigate("home")
        }

        openStudent={(student) => {

          setSelectedStudent(student);

          navigate("details");

        }}

        openTimeTable={() => {

          setSelectedClass(
            selectedClass
          );

          navigate("timetable");

        }}

      />

    );

  }


  /* TEACHER DETAILS */

  if (page === "details") {

    return (

      <Studentdetails

        student={
          selectedStudent
        }

        goBack={() =>
          navigate(
            "students"
          )
        }

        goHome={() =>
          navigate("home")
        }

        goMarks={() =>
          navigate("marks")
        }

        goFees={() =>
          navigate("fees")
        }

        goTimeTable={() => {

          setSelectedClass(
            selectedStudent?.classname
          );

          navigate(
            "timetable"
          );

        }}

      />

    );

  }


  /* STUDENT HOME */

  if (
    page === "studenthome"
  ) {

    return (

      <Studenthome

        student={
          selectedStudent
        }

        goHome={() =>
          navigate(
            "welcome"
          )
        }

        goProgress={() =>
          navigate(
            "studentdetails"
          )
        }

        goNotification={() =>
          navigate(
            "studentannouncement"
          )
        }

        goTimeTable={() => {

          setSelectedClass(
            selectedStudent?.classname
          );

          navigate(
            "timetable"
          );

        }}

      />

    );

  }


  /* STUDENT DETAILS */

  if (
    page === "studentdetails"
  ) {

    return (

      <Studentdetails

        student={
          selectedStudent
        }

        isStudent={true}

        goBack={() =>
          navigate(
            "studenthome"
          )
        }

        goHome={() =>
          navigate(
            "studenthome"
          )
        }

        goMarks={() =>
          navigate("marks")
        }

        goFees={() =>
          navigate("fees")
        }

        goTimeTable={() => {

          setSelectedClass(
            selectedStudent?.classname
          );

          navigate(
            "timetable"
          );

        }}

      />

    );

  }


  /* MARKS */

  if (page === "marks") {

    return (

      <Markspage

        student={selectedStudent}

        isStudent={
          isStudentLogin
        }

        goBack={() =>

          isStudentLogin
            ? navigate(
                "studentdetails"
              )
            : navigate(
                "details"
              )

        }

        goHome={() =>

          isStudentLogin
            ? navigate(
                "studenthome"
              )
            : navigate(
                "home"
              )

        }

      />

    );

  }


  /* FEES */

  if (page === "fees") {

    return (

      <Feespage

        student={selectedStudent}

        isStudent={
          isStudentLogin
        }

        goBack={() =>

          isStudentLogin
            ? navigate(
                "studentdetails"
              )
            : navigate(
                "details"
              )

        }

        goHome={() =>

          isStudentLogin
            ? navigate(
                "studenthome"
              )
            : navigate(
                "home"
              )

        }

      />

    );

  }


  /* ANNOUNCEMENT */

  if (page === "announcement") {

    return (

      <Announcementpage

        goBack={() =>
          navigate("home")
        }

        goHome={() =>
          navigate("home")
        }

      />

    );

  }


  /* STUDENT ANNOUNCEMENT */

  if (
    page === "studentannouncement"
  ) {

    return (

      <Studentannouncement
className={selectedStudent?.classname}
        goBack={() =>
          navigate(
            "studenthome"
          )
        }

      />

    );

  }


  /* TIMETABLE */

  if (
    page === "timetable"
  ) {

    return (

      <Timetablepage

        className={selectedClass}

        isStudent={
          isStudentLogin
        }

        goBack={() =>
          navigate(previousPage)
        }

        goHome={() =>

          isStudentLogin
            ? navigate(
                "studenthome"
              )
            : navigate(
                "home"
              )

        }

      />

    );

  }

}

export default App;