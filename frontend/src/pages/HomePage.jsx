import React from 'react'
import '../stylesheets/homePage.css'
import Student from '../stylesheets/Images/Home Page/Student.png'
import Teacher from '../stylesheets/Images/Home Page/Teacher.png'
import School from '../stylesheets/Images/Home Page/School.png'

function HomePage() {

const handleClickTeacher = (myLink) => () => {
    window.location.href=myLink;
}

const handleClickStudent = (myLink) => () => {
    window.location.href=myLink;
}

  return (
    <div>
        <body className = "bodyDivHome">
        <div className="containerHome">
            <div className="logIn-planels" onClick={handleClickStudent("/student/home")}>
                <img src={Student}
                    alt="Online Student" className="logIn-img"/>
                <h2 className="logIn-header">Student</h2>
            </div>

            <div className="logIn-planels" onClick={handleClickTeacher("/teacher/signup")}>
                <img src={Teacher}
                    alt="Online Teacher" className="logIn-img"/>
                <h2 className="logIn-header">Teacher</h2>
            </div>

            <div className="logIn-planels">
                <img src={School}
                    alt="Online School" className="logIn-img"/>
                <h2 className="logIn-header">School</h2>
            </div>
        </div>
    </body>
    </div>
  )
}

export default HomePage