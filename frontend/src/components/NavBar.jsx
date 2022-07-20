import React, { Component } from 'react'
import axios from 'axios';
import reactDom from 'react-dom'
import {FaStar} from "react-icons/fa"

export default class NavBar extends Component {
    constructor(props) {
        super(props); 

        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.handleStudentLogOutClick = this.handleStudentLogOutClick.bind(this);
        this.isLoggedInStudent = this.isLoggedInStudent.bind(this)
        this.deleteAll = this.deleteAll.bind(this)
        this.examCount = this.examCount.bind(this)
        this.state={exams:[],examMarkCount:[]};
    }     

    componentDidMount(){ // this loads our lessons prior to the page loading
        axios.get('http://localhost:5000/teacher/current/')
        // .then(response=>{
        //     this.setState({currentTeacher:response.data})
        //     console.log(this.state.currentTeacher)
        //     // console.log(this.state.lessons[46].lessonName)
        // })
        // .catch((error)=>{
        //   console.log(error)
        //   console.log("current teacher did not work")
        // })  
        axios.get('http://localhost:5000/exams') // this willbe used to see if there are any exams that need marking. We can display this on the teacher's navbar
        .then(response=>{
            this.setState({exams:response.data})
            //console.log(this.state.exams)
            this.state.exams.map((item)=>{
                //console.log(item.studentsCompleted.filter(item =>{return !item.result}))
                this.state.examMarkCount=[...this.state.examMarkCount,item.studentsCompleted.filter(item =>{return !item.result}).length]
            })       
            console.log (this.state.examMarkCount.reduce((partialSum, a) => partialSum + a, 0))
            //console.log(this.state.exams.filter(item =>{return item.examName}))
            // console.log(this.state.exams[0].studentsCompleted.filter(item =>{return !item.result}).length)
        })
        .catch((error)=>{
            //console.log(error)
            //console.log("did not work")
        }) 
       
    }

    examCount(){

        console.log("test")
        // return <div>{this.state.exams.length}</div>
        return <div>Exams <span class="badge alert-secondary">+{this.state.examMarkCount.reduce((partialSum, a) => partialSum + a, 0)}</span></div>
    }

    handleLogOutClick(){
        console.log("Logged in: " + JSON.parse(localStorage.getItem("CurrentTeacher")))
        axios.get('http://localhost:5000/teacher/logout')
        localStorage.removeItem("CurrentTeacher");
        window.location = '/';
        console.log("Logged Out:"+ JSON.parse(localStorage.getItem("CurrentTeacher")))
    }   

    deleteAll(){
        console.log("fired")
        axios.delete('http://localhost:5000/exams/delete')        
    }

    handleStudentLogOutClick(){
        console.log("Logged in: " + JSON.parse(localStorage.getItem("CurrentStudent")))
        axios.get('http://localhost:5000/student/logout')
        localStorage.removeItem("CurrentStudent");
        window.location = '/';
        console.log("Logged Out:"+ JSON.parse(localStorage.getItem("CurrentStudent")))
    }   

    isLoggedInStudent(CurrentStudent){
        const imgStyle = {
            borderRadius:"50%",
            width:"75%",
        }
        if(CurrentStudent && JSON.parse(localStorage.getItem("CurrentStudent")).studentLevel){
            return <div className="row">
                {/* <div className="col-12"> */}
                    <img className="mt-3 mb-3 mx-auto d-block" src={JSON.parse(localStorage.getItem("CurrentStudent")).studentPic.url.replace('/upload','/upload/w_900,h_900,c_thumb')} alt="" style={imgStyle}/>
                    <h3 className="text-center">{JSON.parse(localStorage.getItem("CurrentStudent")).studentName}</h3>
                    <h3 className="mb-5 text-center text-warning"> <FaStar/> {JSON.parse(localStorage.getItem("CurrentStudent")).studentLevel}  <FaStar/></h3>
                {/* </div> */}
            </div>
        }  if (CurrentStudent && !JSON.parse(localStorage.getItem("CurrentStudent")).studentLevel){
            return <div className="row">
                <img className="mt-3 mb-3 mx-auto d-block" src={JSON.parse(localStorage.getItem("CurrentStudent")).studentPic.url.replace('/upload','/upload/w_900,h_900,c_thumb')} alt="" style={imgStyle}/>
                <h3 className="text-center mb-5">{JSON.parse(localStorage.getItem("CurrentStudent")).studentName}</h3>                          
            </div>
        }
        return [<img className="mt-3 mb-3 mx-auto d-block" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" alt="" style={imgStyle}/>,
        <a href="/student/signup"><h3 className="mb-5 text-center">Log in</h3> </a>] 
    }

    isLoggedInTeacher(CurrentTeacher){
        const imgStyle = {
            borderRadius:"50%",
            width:"75%",
        }
        if(CurrentTeacher){
            return [<img className="mt-3 mb-3" src={JSON.parse(localStorage.getItem("CurrentTeacher")).teacherPic.url.replace('/upload','/upload/w_900,h_900,c_thumb,c_crop,g_face')} alt="" style={imgStyle}/>,
            <h3 className="offset-1 mb-5">{JSON.parse(localStorage.getItem("CurrentTeacher")).teacherName}</h3>]
        }
    }

    render() {
            
    const divStyle = {
        width:"75%",
    }
    const imgStyle = {
        borderRadius:"50%",
        width:"75%",
    }
        return(        
            <div>
                <div className="container" style={this.props.currentPageTeacher}>                                   
                    {/* <img className="mt-3 mb-3" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" style={divStyle}alt=""/> */}
                    {/* <img className="mt-3 mb-3" src={JSON.parse(localStorage.getItem("CurrentTeacher")).teacherPic.url.replace('/upload','/upload/w_900,h_900,c_thumb,c_crop,g_face')} style={imgStyle}alt=""/>
                    <h3 className="offset-1 mb-5">{JSON.parse(localStorage.getItem("CurrentTeacher")).teacherName}</h3>  */}
                    {this.isLoggedInTeacher(localStorage.getItem("CurrentTeacher"))}    
        
                    <a className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle} href = "/teacher/home">Home</a>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle} href = "/teacher/classes">My Classes</a>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle} href ="/teacher/students">My Students</a>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3" href = "/teacher/exams" style={divStyle}>{this.examCount()}</a>            
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>Courses</button>
                    {/* <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Teachers</button> */}
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>Homework</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>Marking</button>
                    {/* <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle} onClick = {this.deleteAll}>Marking</button> */}
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>Packages</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Lesson Prep</button>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3"  href = "https://www.youstudy.edu.au/" target = "_blank" style={divStyle}>My School</a>
                    <div className="dropdown">
                        <button type="button" className="btn btn-secondary btn-lg mt-1 mb-3 dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={divStyle}>My Account</button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Edit Account</a>
                            <a class="dropdown-item" href="#" onClick = {this.handleLogOutClick}>Logout</a>
                        </div>
                    </div>
                </div>

                <div className="container" style={this.props.currentPageStudent}>                                   
                    {/* <img className="mt-3 mb-3" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" style={divStyle}alt=""/> */}
                    {this.isLoggedInStudent(localStorage.getItem("CurrentStudent"))}                                      
                    {/* <img className="mt-3 mb-3" src={JSON.parse(localStorage.getItem("CurrentStudent")).studentPic.url.replace('/upload','/upload/w_900,h_900,c_thumb,c_crop,g_face')} style={imgStyle}alt=""/>
                    <h3 className="offset-1 mb-5">{JSON.parse(localStorage.getItem("CurrentStudent")).studentName}</h3>  */}

                    <a className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" style={divStyle} href = "/student/home">Home</a>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" href = "/student/classes" style={divStyle}>My Classes</a>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" style={divStyle}>My Teachers</button>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" href = "/student/exams" style={divStyle}>My Exams</a>           
                    <button className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" style={divStyle}>My Courses</button>
                    {/* <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Teachers</button> */}
                    <button className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" style={divStyle}>My Homework</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" style={divStyle}>My Packages</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" style={divStyle}>My Classmates</button>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3 mx-auto d-block" href = "https://www.youstudy.edu.au/" target = "_blank" style={divStyle}>My School</a>
                    <div className="dropdown">
                        <button type="button" className="btn btn-secondary btn-lg mt-1 mb-3 dropdown-toggle mx-auto d-block" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={divStyle}>My Account</button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Edit Account</a>
                            <a class="dropdown-item" href="#" onClick = {this.handleStudentLogOutClick}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


