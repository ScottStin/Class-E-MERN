import React, { Component } from 'react'
import Student from '../stylesheets/Images/Home Page/Student.png'
import axios from 'axios';

export default class StudentLogin extends Component {
  constructor(props) {
    super(props);                  
    this.onSubmitLogin = this.onSubmitLogin.bind(this); 
    this.onChangePassword = this.onChangePassword.bind(this); 
    this.onChangeEmail = this.onChangeEmail.bind(this); 
    
    this.state = {
      studentPassword:'',
      studentEmail:'',
    }
  }

  async onSubmitLogin(e){
    
    e.preventDefault();

    const newStudent = {
      studentEmail: this.state.studentEmail,
      studentPassword: this.state.studentPassword,
    }    

    console.log(newStudent)

    await axios.post('http://localhost:5000/student/login',newStudent)
    .then(res => {localStorage.setItem("CurrentStudent", JSON.stringify(res.data))})        
    .catch(err => {console.log(err)})    
    console.log("CURRENT USER: "+localStorage.getItem("CurrentStudent")) 
    window.location = '/student/home';
  }

  onChangeEmail(e){
    this.setState({
      studentEmail: e.target.value
    })
  }

  onChangePassword(e){
    this.setState({
      studentPassword: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div className = "container flex justify-content-center align-items-center mt-5 mb-5">
          <div className="row">
              <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                  <div className="card shadow">
                      {/* <img src="https://source.unsplash.com/random/?english-teacher-online#<%+new Date().getTime()%>');" alt=""/> */}
                      <img src={Student} alt=""/>
                      <div  className = "card-body">
                          <h5 className = "card-title">Login</h5>
                          <form onSubmit={this.onSubmitLogin}>                          
                              <div className = "mb-3">
                                  <label class="form-label" for="studentEmail">Email</label>
                                  <input className="form-control" type = "input" id="studentEmail" name="studentEmail" onChange = {this.onChangeEmail} />                                      
                              </div>                                          
                              <div className = "mb-3">
                                  <label className="form-label" for="password">Password</label>
                                  <input className="form-control" type = "password" id="password" name="password" onChange = {this.onChangePassword} />                                            
                              </div>                              
                              <button className = "btn btn-secondary col-12">Login</button>
                          </form>
                          <p className="mt-4">New user? <a href="/student/signup">Click here to sign up</a></p> 
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
