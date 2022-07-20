import React, {useEffect, useState} from 'react'
import reactDom from 'react-dom'
import axios from 'axios'
import {BrowserRouter, Route, Routes} from 'react-router-dom' // hashrouter is another option instead of browserrouter

import MainHeader from './components/MainHeader'
import NavBar from './components/NavBar'
import Filter from './components/Filter'
import ClassData from './seeds/ClassData'
import HomePage from './pages/HomePage'
import {v4 as uuidv4} from 'uuid'
import CreateNewClass2 from './pages/CreateNewClass2'
// import ClassCard2 from './components/ClassCard2'
import MyClasses from './pages/MyClasses'
import EditClass from './pages/EditClass'
import TeacherRegister from './pages/TeacherRegister'
import TeacherLogin from './pages/TeacherLogin'
import TeacherLanding from './pages/TeacherLanding'
import StudentLogin from './pages/StudentLogin'
import StudentRegister from './pages/StudentRegister'
import TeacherExams from './pages/TeacherExams'
import NewExam from './pages/NewExam'
import TeacherExamFocus from './pages/TeacherExamFocus'
import StudentExams from './pages/StudentExams'
import StudentList from './pages/StudentList'

const App = () => {

    // const [data, setData] = React.useState(null);
    // React.useEffect(() => {
    //   fetch("/api")
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));
    // }, []);
    
   const [classes, setClasses] = useState(ClassData)

   const NavStyle={
       display:"none"
   }
    const lessonCardButtonStyle={
        display:"none"
    }
   //console.log(classes)
  return(   
    <BrowserRouter>
        <Routes>

            {/* ---------- TEACHER ROUTES --------- */}

            <Route exact path = '/' element ={                
                <HomePage />                
            }> </Route>

            <Route exact path = '/teacher/home' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container offset-1">
                                    <NavBar currentPageStudent={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">
                                <Filter currentPageExam={NavStyle}/>
                                <TeacherLanding currentPageStudent = {lessonCardButtonStyle} currentPageTeacherMyClasses={lessonCardButtonStyle}/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/teacher/students' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container offset-1">
                                    <NavBar currentPageStudent={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">
                                <StudentList/>
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/teacher/classes/new' element={ 
                <div className="container">               
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container offset-1">
                                    <NavBar currentPageStudent={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">
                                <CreateNewClass2/> 
                            </div>
                        </div>
                    </div>                     
                </div>               
            }> </Route>

            <Route exact path = '/teacher/classes/edit/:id' element={ 
                <div className="container">               
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container offset-1">
                                    <NavBar currentPageStudent={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">
                             <EditClass/>
                            </div>
                        </div>
                    </div>
                     
                </div>               
            }> </Route>

            <Route exact path = '/teacher/classes' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container offset-1">
                                    <NavBar currentPageStudent={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">                                
                                <MyClasses/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/teacher/exams' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container offset-1">
                                    <NavBar currentPageStudent={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">                                
                                <TeacherExams/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/teacher/exams/new' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container offset-1">
                                    <NavBar currentPageStudent={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">                                
                                <NewExam/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/teacher/exam/focus' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container offset-1">
                                    <NavBar currentPageStudent={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">                                
                                <TeacherExamFocus/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/teacher/signup' element ={   
                <div className="container">
                    <TeacherRegister/> 
                </div>
            }> </Route>

            <Route exact path = '/teacher/login' element ={   
                <div className="container">
                    <TeacherLogin/> 
                </div>
            }> </Route>

            {/* ---------- STUDENT ROUTES --------- */}

            <Route exact path = '/student/home' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container">
                                    <NavBar currentPageTeacher={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">
                                <Filter currentPageExam={NavStyle} />
                                <TeacherLanding currentPageTeacherMyClasses={lessonCardButtonStyle}/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/student/classes' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container">
                                    <NavBar currentPageTeacher={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">                                
                                <MyClasses/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/student/exams' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container">
                                    <NavBar currentPageTeacher={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">
                                <Filter currentPageHome={NavStyle}/>
                                <StudentExams/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

            <Route exact path = '/student/signup' element ={   
                <div className="container">
                    <StudentRegister/> 
                </div>
            }> </Route>

            <Route exact path = '/student/login' element ={   
                <div className="container">
                    <StudentLogin/> 
                </div>
            }> </Route>

            <Route exact path = '/student/exam/focus' element ={   
                <div className="container">
                    <MainHeader />
                    <div className="d-flex flex-row">             
                            <div className = "col-3 text-dark bg-white rounded shadow" > {/*style="height:100vh"*/} {/* note: VH doesn't seem to work in react*/}
                                <div className="container">
                                    <NavBar currentPageTeacher={NavStyle}/>
                                </div>
                            </div>
                        <div className="col-9 .bg-secondary">
                            <div className="container">                                
                                <TeacherExamFocus/> 
                            </div>
                        </div>
                    </div>
                </div>
            }> </Route>

        </Routes>
    </BrowserRouter>
  )
}



export default App


//---- Default Code ----

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
