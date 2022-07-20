import React, { Component } from 'react'
import axios from 'axios';
import { useState, useEffect } from "react";
import Teacher from '../stylesheets/Images/Home Page/Teacher.png'

export class TeacherRegister extends Component {
    constructor(props) {
        super(props);    
                
        this.onChangeTeacherName = this.onChangeTeacherName.bind(this);
        this.onChangeTeacherEmail = this.onChangeTeacherEmail.bind(this);
        this.onChangeTeacherCountry = this.onChangeTeacherCountry.bind(this);
        this.onChangeTeacherPassword = this.onChangeTeacherPassword.bind(this);
        this.onChangeTeacherPic = this.onChangeTeacherPic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            teacherName: '',
            teacherEmail: '',
            teacherCounty: '',
            teacherPassword: '',
            teacherPic: '',
        }
    }

    async onSubmit(e) {
        e.preventDefault();

        const newTeacher = {
            teacherName: this.state.teacherName,
            teacherEmail: this.state.teacherEmail,
            teacherCounty: this.state.teacherCounty,
            teacherPassword: this.state.teacherPassword,
            teacherPic: this.state.teacherPic
        }

        console.log(newTeacher);

        await axios.post('http://localhost:5000/teacher/signup', newTeacher)
        // .then(res => {console.log("TEEEEEEEEEEEEEEEST1: "+ JSON.stringify(res.data))})
        .then(res => {localStorage.setItem("CurrentTeacher", JSON.stringify(res.data))})        
        .catch(err => {console.log(err)})
            // .then(useEffect(() => {
            //     // storing input name
            //     localStorage.setItem("CurrentTeacher", JSON.stringify(res.data));
            //   }, [res.data]));
            //.then(res => console.log(res.data)); //https://stackoverflow.com/questions/62927389/how-react-js-localstorage-with-axios-api-response
        console.log("CURRENT USER: "+localStorage.getItem("CurrentTeacher"))             
        // .then(console.log("TESSSTT: "+(localStorage.getItem("CurrentTeacher"))));
           
        window.location = '/teacher/home';
        // this.setState({
        //     teacherName: '',
        //     teacherEmail: '',
        //     teacherCounty: '',
        //     teacherPassword: '',
        //     teacherPic: '',
        // })

    }

    onChangeTeacherName(e){
        this.setState({
            teacherName:e.target.value            
        })        
    }
    onChangeTeacherEmail(e){
        this.setState({
            teacherEmail:e.target.value
        })
    }
    onChangeTeacherCountry(e){
        this.setState({
            teacherCounty:e.target.value
        })
    }
    onChangeTeacherPassword(e){
        this.setState({
            teacherPassword:e.target.value
        })
    }
    onChangeTeacherPic(e){
        this.setState({
            teacherPic:e.target.files[0].name
        })
        console.log(this.state.teacherPic)
    }

  render() {
    return (
      <div>
          {/* <h1>Sign up</h1> */}

            <div className = "container flex justify-content-center align-items-center mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <div className="card shadow">
                            {/* <img src="https://source.unsplash.com/random/?Student-Online#<%+new Date().getTime()%>');" alt=""/> */}
                            <img src={Teacher} alt=""/>
                            <div  className = "card-body">
                                <h5 className = "card-title">Sign up</h5>
                                <form onSubmit={this.onSubmit} enctype="multipart/form-data"> 
                                    <div className = "mb-3">
                                        <label class="form-label" for="name">Teacher Name</label>
                                        <input className="form-control" type = "text" id="name" name="name" onChange={this.onChangeTeacherName} autoFocus/>                                      
                                    </div>
                                    <div className = "mb-3">
                                        <label className="form-label" for="email">Email</label>
                                        <input className="form-control" type = "email" id="email" name="email"onChange={this.onChangeTeacherEmail} />                                      
                                    </div>
                                    <div className = "mb-3">
                                        <label className="form-label" for="country" >Country of Origin</label>
                                        <select className="form-select" data-flag="true" onChange={this.onChangeTeacherCountry}>
                                            <option value="Australia">Select Country...</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Canada">Canada</option>                                          
                                            <option value="New Zealand">New Zealand</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="USA">United States</option>
                                            <option value="Australia">Other</option>
                                        </select>                                      
                                    </div>     
                                    <div className = "mb-3">
                                        <label className="form-label" for="password">Password</label>
                                        <input className="form-control" type = "password" id="password" name="password" onChange={this.onChangeTeacherPassword}/>                                            
                                    </div>                             
                                    <div class="mb-3">
                                        <label for="formFileMultiple" class="form-label"><h6>Profile Picture</h6></label>
                                        <input className="form-control" type="file" id="teacherPic" name = "teacherPic" onChange={this.onChangeTeacherPic}/>
                                    </div>                                
                                    <button className = "btn btn-secondary col-12">Creat Account</button>
                                </form>
                                <p className="mt-4">Already have an account? <a href="/teacher/login">Click here to log in</a></p>                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default TeacherRegister