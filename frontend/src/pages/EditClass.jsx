import React, { Component } from 'react'
import axios from 'axios'
import ClassData from '../seeds/ClassData'
import { FaTimes } from 'react-icons/fa' // we did a npm i react-icons which gave us font awesome. Wer're now using it here
import { withRouter  } from "react-router";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom"

export default class CreateNewClass2 extends Component {
  constructor(props) {
    super(props);
    this.onChangeLessonname = this.onChangeLessonname.bind(this);
    this.onChangeLessonDescription = this.onChangeLessonDescription.bind(this);
    this.onChangeLessonType = this.onChangeLessonType.bind(this);
    this.onChangeLessonSize = this.onChangeLessonSize.bind(this);
    this.onChangeLessonLevel = this.onChangeLessonLevel.bind(this);
    this.onChangeLessonTeacher = this.onChangeLessonTeacher.bind(this);
    this.onChangeLessonStartDate = this.onChangeLessonStartDate.bind(this);
    this.onChangeLessonStartTime = this.onChangeLessonStartTime.bind(this);
    this.onChangeLessonLength = this.onChangeLessonLength.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
    
    this.state = {
      lessonName: '',
      lessonDescription: '',      
      lessonType: '',      
      lessonSize: '',      
      lessonLevel: [],      
      lessonTeacher: '',      
      lessonStartDate: '',      
      lessonStartTime: '',      
      lessonLength: '',      
    }
  } 


  // componentDidMount() {
  //   axios.get('http://localhost:5000/teacher/'+this.props.match.params.id)
  //     .then(response => {
  //       this.setState({
  //         lessonName: response.data.lessonName,
  //         lessonDescription: response.data.lessonDescription,
  //         // date: new Date(response.data.date)
  //       })   
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })

  //   // axios.get('http://localhost:5000/users/')
  //   //   .then(response => {
  //   //     if (response.data.length > 0) {
  //   //       this.setState({
  //   //         users: response.data.map(user => user.username),
  //   //       })
  //   //     }
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   })

  // }

  componentDidMount(){ // this loads our lessons prior to the page loading
    axios.get('http://localhost:5000/teacher/home/')
    .then(response=>{
        this.setState({
          lessonName:response.data.filter(item=>{return item._id===window.location.pathname.split("/edit/:").pop()})[0].lessonName,
          lessonDescription:response.data.filter(item=>{return item._id===window.location.pathname.split("/edit/:").pop()})[0].lessonDescription,
          lessonType:response.data.filter(item=>{return item._id===window.location.pathname.split("/edit/:").pop()})[0].lessonType,
          lessonSize:response.data.filter(item=>{return item._id===window.location.pathname.split("/edit/:").pop()})[0].lessonSize,
          lessonLevel:response.data.filter(item=>{return item._id===window.location.pathname.split("/edit/:").pop()})[0].lessonLevel,
          lessonTeacher:response.data.filter(item=>{return item._id===window.location.pathname.split("/edit/:").pop()})[0].lessonTeacher,
          lessonLength:response.data.filter(item=>{return item._id===window.location.pathname.split("/edit/:").pop()})[0].lessonLength,          
        })// note: only using this code because this.props.match.params.id isn't working.
          console.log(this.state.lessonDescription)
    })
    .catch((error)=>{
      console.log(error)
      console.log("did not work")
    })
}

  onChangeLessonname(e) {
    this.setState({
      lessonName: e.target.value
    })
  }
  onChangeLessonDescription(e) {
    this.setState({
      lessonDescription: e.target.value
    })
  }
  onChangeLessonType(e) {
    this.setState({
      lessonType: e.target.value
    })
  }
  onChangeLessonSize(e) {
    this.setState({
      lessonSize: e.target.value
    })
  }
  onChangeLessonLevel(e) {
    this.setState({
      lessonLevel: e.target.value
    })
  }
  onChangeLessonTeacher(e) {
    this.setState({
      lessonTeacher: e.target.value
    })
  }
  onChangeLessonStartDate(e) {
    this.setState({
      lessonStartDate: e.target.value
    })
  }
  onChangeLessonStartTime(e) {
    this.setState({
      lessonStartTime: e.target.value
    })
  }
  onChangeLessonLength(e) {
    this.setState({
      lessonLength: e.target.value
    })
  }
  onChangeLessonLevel(){
    this.state.lessonLevel = []
    for(let i = 0; i< document.querySelectorAll('input[class="form-check-input level"]:checked').length;i++){
      let level = document.querySelectorAll('input[class="form-check-input level"]:checked')[i].value
      this.state.lessonLevel.push(level)
      console.log(this.state.lessonLevel)
    }  
  }

  onSubmit(e) {
    
    e.preventDefault();



    const editedLesson = {
      lessonName: this.state.lessonName,
      lessonDescription: this.state.lessonDescription,
      lessonType: this.state.lessonType,      
      lessonSize: this.state.lessonSize,      
      lessonLevel: this.state.lessonLevel,      
      lessonTeacher: this.state.lessonTeacher,      
      lessonStartDate: this.state.lessonStartDate,      
      lessonStartTime: document.getElementById("startTimeHours").value +":"+document.getElementById("startTimeMin").value + " " + document.getElementById("startTimeAmPm").value,      
      lessonLength: this.state.lessonLength,  
      
    }

    console.log(editedLesson);
    console.log(window.location.pathname.split("/edit/").pop()); // note: only using this code because this.props.match.params.id isn't working.

    
    axios.post('http://localhost:5000/teacher/update/' + window.location.pathname.split("/edit/:").pop(), editedLesson)
      .then(res => console.log(res.data));

    window.location = '/teacher/classes';
  }

  render() {     
      //const{lessonName,lessonDescription} = this.state
    return (
      
     <div>
      
        <div className="row">
          <h1 class = "text-center mt-5 mb-5">Edit Class</h1>
          <div class = "col-md-6 offset-md-3">            
            <form onSubmit={this.onSubmit}>
              <div className="tabcontent" id="firstPage">
              
                <div className="mb-4">
                  <label className="form-label" for="nameFirstPage"><h6>Lesson Name</h6></label>
                  <input className="form-control" type = "text" id="nameFirstPage" name="class[name]"  value = {this.state.lessonName} onChange={this.onChangeLessonname} />
                </div>                
                <div className="mb-4">
                  <label className="form-label" for="description"><h6>Lesson Description</h6></label>
                  <textarea className="form-control" type = "text" id="descriptionFirstPage" name="class[description]" value = {this.state.lessonDescription} onChange={this.onChangeLessonDescription} />
                </div>

                <div class="mb-4">
                    <label class="form-label" for="lessonType"><h6>Type of Lesson</h6></label>
                    <select class="form-select" aria-label="Default select example" id="lessonType" name="class[type]" onChange={this.onChangeLessonType}>
                        <option selected value = {this.state.lessonType} > {this.state.lessonType} </option>
                        <option  value ="General English">General English</option>
                        <option  value ="PTE Exam Prep">PTE Exam Prep</option>
                        <option  value ="IELTS Exam Prep">IELTS Exam Prep</option>                    
                        <option  value ="Cambridge Exam Prep">Cambridge Exam Prep</option>                    
                        <option  value ="Business English">Business English</option>                    
                    </select>
                </div>  

                <div class="mb-4">
                    <label class="form-label" for="classSize"><h6>Class Size</h6></label>
                    <select class="form-select" aria-label="Default select example" id="classSize" name="class[type]" onChange = {this.onChangeLessonSize}>
                        <option selected value ="16">Select Class Size...</option>
                        <option  value ="1">One-on-One Class</option>
                        <option  value ="3">Small (2-3 students)</option>
                        <option  value ="8">Medium (4-8 Students)</option>                    
                        <option  value ="16">Large (9-16 Students)</option>                   
                    </select>
                </div>  

                <div class = "mb-4">      
                    <label for="classLevel"><h6>Level</h6></label>        
                    <div class = "form-check" id = "classLevel">                    
                      <input class="form-check-input level" type="checkbox" value="A1" id="A1" name = "class[level]"onClick={()=>this.onChangeLessonLevel()}/>
                      <label class="form-check-label mb-1" for="A1">Beginner (A1)</label> <br></br>
                      <input class="form-check-input level" type="checkbox" value="A2" id="A2" name = "class[level]"onClick={()=>this.onChangeLessonLevel()}/>
                      <label class="form-check-label mb-1" for="A2">Lower-Intermediate (A2)</label> <br></br>
                      <input class="form-check-input level" type="checkbox" value="B1" id="B1" name = "class[level]"onClick={()=>this.onChangeLessonLevel()}/>
                      <label class="form-check-label mb-1" for="B1">Intermediate (B1)</label> <br></br>
                      <input class="form-check-input level" type="checkbox" value="B2" id="B2" name = "class[level]"onClick={()=>this.onChangeLessonLevel()}/>
                      <label class="form-check-label mb-1" for="B2">Upper-Intermediate (B2)</label> <br></br>
                      <input class="form-check-input level" type="checkbox" value="C1" id="C1" name = "class[level]"onClick={()=>this.onChangeLessonLevel()}/>
                      <label class="form-check-label mb-1" for="C1">Advanced (C1)</label> <br></br>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="form-label" for="lessonTeacher"><h6>Teacher</h6></label>
                    <select class="form-select" aria-label="Default select example" id="lessonTeacher" name="class[teacher]" onChange = {this.onChangeLessonTeacher}>
                        <option selected value ="">Select a teacher for these lessons...</option>                                      
                        <option  value ="Scott Stinson">Scott Stinson</option>                                      
                        <option  value ="Tamara Loyacono">Tamara Loyacono</option>                                      
                        <option  value ="Carol Doyle">Carol Doyle</option>                                      
                    </select>
                </div> 

                <div class="mb-4">
                  <label for="dateSelect"><h6>Schedule Your Lessons</h6></label>
                  <input type="date" id ="dateSelect" class = "form-control date" placeholder="Select Date"  value = {this.state.lessonStartDate} onChange={this.onChangeLessonStartDate}/> <br></br>
                </div>

                <div class="mb-4">
                    <label class="form-label" for="startTime"><h6>Start Time</h6></label>
                    <div className="row">
                      <div className="col-3">
                        <select class="form-select" aria-label="Default select example" id="startTimeHours" name="class[startTime]">
                            <option  value ="1">1</option>                                          
                            <option  value ="2">2</option>                                          
                            <option  value ="3">3</option>                                          
                            <option  value ="4">4</option>                                          
                            <option  value ="5">5</option>                                          
                            <option  value ="6">6</option>                                          
                            <option  value ="7">7</option>                                          
                            <option  value ="8">8</option>                                          
                            <option  value ="9">9</option>                                          
                            <option  value ="10">10</option>                                          
                            <option  value ="11">11</option>                                          
                            <option selected value ="12">12</option>                                          
                        </select>
                      </div>
                      <div className="col-1"> <b>:</b></div>
                      <div className="col-3">
                        <select class="form-select" aria-label="Default select example" id="startTimeMin" name="class[startTime]">
                            <option selected value ="00">00</option>                                    
                            <option  value ="15">15</option>                                    
                            <option  value ="30">30</option>                                    
                            <option  value ="45">45</option>                                    
                        </select>
                      </div>
                      <div className="col-3">
                        <select class="form-select" aria-label="Default select example" id="startTimeAmPm" name="class[startTime]">
                            <option selected value ="PM">PM</option>                                    
                            <option  value ="AM">AM</option>                                    
                        </select>
                      </div>
                    </div>
                </div>

                <div class = "mb-4">      
                    <label for="length"><h6>Length</h6></label>        
                    <div class = "form-check" id = "length">                    
                      <input class="form-check-input" type="radio" value="1" id="1 Hour" name = "class[length]" onChange={this.onChangeLessonLength} />
                      <label class="form-check-label mb-1" for="1 Hour">1 Hour</label> <br></br>
                      <input class="form-check-input" type="radio" value="2" id="2 Hours" name = "class[length]" onChange={this.onChangeLessonLength}  />
                      <label class="form-check-label mb-1" for="2 Hours">2 Hours</label> <br></br>
                      <input class="form-check-input" type="radio" value="3" id="3 Hours" name = "class[length]" onChange={this.onChangeLessonLength} />
                      <label class="form-check-label mb-1" for="3 Hours">3 Hours</label> <br></br>                    
                    </div>
                </div>          
              
            </div>
            
            <button className="btn btn-secondary mt-3 mb-3">Submit</button>
            </form>

        </div>
      </div>      
    </div>    
    )
  }
}

//export default CreateNewClass2