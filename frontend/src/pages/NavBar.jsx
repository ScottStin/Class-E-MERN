import React, { Component } from 'react'
import axios from 'axios';
import reactDom from 'react-dom'

export default class NavBar extends Component {
    constructor(props) {
        super(props); 

        this.handleLogOutClick = this.handleLogOutClick.bind(this)
    
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
    }

    handleLogOutClick(){
        console.log("Logged in: " + JSON.parse(localStorage.getItem("CurrentTeacher")))
        axios.get('http://localhost:5000/teacher/logout')
        localStorage.removeItem("CurrentTeacher");
        window.location = '/';
        console.log("Logged Out:"+ JSON.parse(localStorage.getItem("CurrentTeacher")))
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
                    <img className="mt-3 mb-3" src={JSON.parse(localStorage.getItem("CurrentTeacher")).teacherPic.url.replace('/upload','/upload/w_900,h_900,c_thumb,c_crop,g_face')} style={imgStyle}alt=""/>
                    <h3 className="offset-1 mb-5">{JSON.parse(localStorage.getItem("CurrentTeacher")).teacherName}</h3> 
        
                    <a className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle} href = "/teacher/home">Home</a>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle} href = "/teacher/classes">My Classes</a>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Students</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>Exams</button>            
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>Courses</button>
                    {/* <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Teachers</button> */}
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>Homework</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>Marking</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Lesson Prep</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My School</button>
                    <div className="dropdown">
                        <button type="button" className="btn btn-secondary btn-lg mt-1 mb-3 dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={divStyle}>My Account</button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Edit Account</a>
                            <a class="dropdown-item" href="#" onClick = {this.handleLogOutClick}>Logout</a>
                        </div>
                    </div>
                </div>

                <div className="container" style={this.props.currentPageStudent}>                                   
                    <img className="mt-3 mb-3" src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" style={divStyle}alt=""/>
                    <a href=""><h3 className="offset-3 mb-5">Log in</h3> </a>                    
        
                    <a className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle} href = "/student/home">Home</a>
                    <a className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Classes</a>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Teachers</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Exams</button>            
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Courses</button>
                    {/* <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Teachers</button> */}
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Homework</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My Classmates</button>
                    <button className="btn btn-secondary btn-lg mt-1 mb-3" style={divStyle}>My School</button>
                    <div className="dropdown">
                        <button type="button" className="btn btn-secondary btn-lg mt-1 mb-3 dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={divStyle}>My Account</button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Edit Account</a>
                            <a class="dropdown-item" href="#" onClick = {this.handleLogOutClick}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


