
import React, { Component } from 'react'
import { FaRegPlayCircle } from 'react-icons/fa'
import axios from 'axios' 

export default class TeacherExamShow extends Component {
  constructor(props) {
    super(props);
    this.handleQuestionArrayClick = this.handleQuestionArrayClick.bind(this)      
    this.submitButton = this.submitButton.bind(this)      
    this.handleSubmitStudentResponse = this.handleSubmitStudentResponse.bind(this)  
    this.handleSubmitTeacherFeedback = this.handleSubmitTeacherFeedback.bind(this)         
    this.myTest = this.myTest.bind(this)      
    this.responseField = this.responseField.bind(this)      
    // this.enrolledStudtCount = this.enrolledStudtCount.bind(this)      
    this.state = {  
      studentName: "",
      studentResponse:""
    }
  }

  componentDidMount(){ // this loads our lessons prior to the page loading
    var i, tabcontent
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";    
  }
  tabcontent[0].style.display="block"
  // if (JSON.parse(localStorage.getItem("CurrentExam"))[0].student!=="undefined"){
  //   console.log(JSON.parse(localStorage.getItem("CurrentExam"))[0].student)
  // }  
}
  
  handleQuestionArrayClick(num){
    // this.setState({currentArrayItemNum:num})
    // console.log(this.state.currentArrayItemNum)
    var i, tabcontent 
    tabcontent = document.getElementsByClassName("tabcontent");
    console.log(num)
    console.log(tabcontent)
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabcontent[num].style.display="block"
  }

  submitButton(num1,num2){
    if(num1==num2){ 
      if(JSON.parse(localStorage.getItem("CurrentTeacher"))==null){            
        return <button className = "btn btn-secondary offset-11" onClick = {this.handleSubmitStudentResponse}>Submit Answers</button>
      } else if (JSON.parse(localStorage.getItem("CurrentTeacher"))!==null){
        try{
          if(JSON.parse(localStorage.getItem("CurrentExam"))[0][0].examQuestionResponse!=="undefined"){
            return <div className = "row">
              <div className = "col-1 offset-8">
                <input type="text" id = "finalScore" placeholder = "Final Score..."/>
              </div>
              <div className = "col-1 offset-1">
                <button className = "btn btn-secondary offset-11" onClick = {this.handleSubmitTeacherFeedback}>Submit</button> 
              </div>
            </div>   
          }
        }catch(e){
          console.log(e)
        }    
      }
    }
  }  

  handleSubmitStudentResponse(e){ // NOTE TO SELF: add modal thanking student for submitting and explaining that it might take a few days to mark. Also add 'results pending' to results      
  //handleSubmitStudentResponse(parentExam){ // NOTE TO SELF: add modal thanking student for submitting and explaining that it might take a few days to mark. Also add 'results pending' to results      
    //e.preventDefault();
    let questionResponses = []
    JSON.parse(localStorage.getItem("CurrentExam")).sort((a, b) => a.examQuestionName > b.examQuestionName ? 1 : -1).map((item)=>      
      // console.log(item.examQuestionName+"Response")
      questionResponses=[...questionResponses,{response:document.getElementById(item.examQuestionName+"Response").value,question:item.examQuestionName}]
    )
    console.log(questionResponses)    
    const examQuestionMark={                    
      student: JSON.parse(localStorage.getItem("CurrentStudent")).studentName,
      studentEmail:  JSON.parse(localStorage.getItem("CurrentStudent")).studentEmail,      
      examQuestionResponse: questionResponses, 
      parentExamRef:JSON.parse(localStorage.getItem("CurrentExam"))[0].parentExamRef
    }
    console.log(examQuestionMark)

    axios.post('http://localhost:5000/exams/new/studentresponse',examQuestionMark)
    .then(res=>console.log("New Exam:"+res.data))
    window.location='/student/exams'  
  }  

  handleSubmitTeacherFeedback(e){
    console.log(JSON.parse(localStorage.getItem("CurrentExam"))[0].parentExamRef) 
    let teacherFeedback = []
    JSON.parse(localStorage.getItem("CurrentExam")).sort((a, b) => a.examQuestionName > b.examQuestionName ? 1 : -1).map((item)=>     
      teacherFeedback=[...teacherFeedback,{comment:document.getElementById(item.examQuestionName+"Feedback").value,question:item.examQuestionName}]
    )
  const examQuestionMark ={
    studentEmail:JSON.parse(localStorage.getItem("CurrentExam"))[0][0].studentEmail,
    teacherFeedback:teacherFeedback,
    parentExamRef:JSON.parse(localStorage.getItem("CurrentExam"))[0].parentExamRef,
    mark:document.getElementById("finalScore").value
  }
    axios.post('http://localhost:5000/exams/new/teacherfeedback',examQuestionMark)
    window.location='/teacher/exams' 
  }

 myTest(){ 
    console.log("HERE: "+JSON.parse(localStorage.getItem("CurrentExam"))[3].examQuestionMark.filter(obj=>{return obj.studentEmail==="JACK.jajttaaa@test.com"})[0].examQuestionResponse)   
      // const unfilteredObject = JSON.parse(localStorage.getItem("CurrentExam"))[3].examQuestionMark.filter(obj=>{return obj.studentEmail==="JACK.jajttaaa@test.com"})
      // console.log(unfilteredObject[0].examQuestionResponse)
      // console.log(JSON.parse(localStorage.getItem("CurrentExam").examQuestionMark.filter(obj=>{return obj.studentEmail==="STEVE.jajttaaa@test.com"}).examQuestionResponse))    
  }

  responseField(item){
    try{
      let index = JSON.parse(localStorage.getItem("CurrentExam")).findIndex(object => {return object.examQuestionName === item;})
      // console.log("CURRENT EXAM: "+item)
      // console.log("INDEX: "+index)
      console.log((JSON.parse(localStorage.getItem("CurrentExam"))))
      
      if (JSON.parse(localStorage.getItem("CurrentExam"))[0][0].examQuestionResponse!=="undefined"){
        console.log("success")
        return <div>
          <h6>Student Response:</h6>          
          <h5 className = "border p-5 mb-3">{JSON.parse(localStorage.getItem("CurrentExam"))[index][0].examQuestionResponse}</h5>, 
          <br></br>,        
        </div>;           
      }    
    } catch (e){
      console.log("response field failed")
      return <input type="text" className="form-control" id = {item+"Response"} placeholder = "Response..."/>
    }  
  }

  feedbackField(item){
    try{
      let index = JSON.parse(localStorage.getItem("CurrentExam")).findIndex(object => {return object.examQuestionName === item;})
      console.log(item)    
    if(JSON.parse(localStorage.getItem("CurrentTeacher")) && JSON.parse(localStorage.getItem("CurrentExam"))[0][0].examQuestionResponse!=="undefined"&&JSON.parse(localStorage.getItem("CurrentExam"))[0][0].comments=="undefined"){          
      return <div>
        <h6>Teacher Feedback:</h6> 
        <textarea type="textarea" className="form-control" rows = "5" id = {item+"Feedback"} placeholder = "Feedback..."/> 
      </div>
    } else if(JSON.parse(localStorage.getItem("CurrentTeacher")) && JSON.parse(localStorage.getItem("CurrentExam"))[0][0].examQuestionResponse!=="undefined"&&JSON.parse(localStorage.getItem("CurrentExam"))[0][0].comments!=="undefined"){
      return <div>
        <h6>Teacher Feedback:</h6> 
        <textarea type="textarea" className="form-control" rows = "5" id = {item+"Feedback"} placeholder = "Feedback..." value={JSON.parse(localStorage.getItem("CurrentExam"))[index][0].comments}/>
      </div>
    }    
    } catch (e){
      console.log("feedback field failed")      
    }  
  }

  render() {
    return (
      <div>
        
        {JSON.parse(localStorage.getItem("CurrentExam")).sort((a, b) => a.examQuestionName > b.examQuestionName ? 1 : -1).map((item)=>( 
          <div className="tabcontent">
            <div className="mb-4 container bg-white shadow p-5 rounded"> 
              <h1 className = "mb-3">{item.parentExamRef}</h1> <hr></hr>
              <h3 className = "mb-3">{item.examQuestionName}</h3>
              <p className = "mb-5 font-italic text-muted">{item.examQuestionDescription}</p>
              <h5 className = "border p-5 mb-5">{item.examQuestionPrompt}</h5>
              {/* <h6><FaRegPlayCircle size={42} color='grey'/> Click here to record your answer </h6>  */}             
              {/* <input type="text" className="form-control" id = {item.examQuestionName+"Response"} placeholder = "Response..."/> */}
              {this.responseField(item.examQuestionName)}
              {this.feedbackField(item.examQuestionName)}

              <nav aria-label="Page navigation example">
                <ul class="pagination mt-5">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>

                    {JSON.parse(localStorage.getItem("CurrentExam")).map((item2)=>( 
                        <li class="page-item"><a class="page-link" href="#" onClick={()=>this.handleQuestionArrayClick(JSON.parse(localStorage.getItem("CurrentExam")).findIndex(object => {
                          return object.examQuestionName === item2.examQuestionName;}))}>{JSON.parse(localStorage.getItem("CurrentExam")).findIndex(object => {
                          return object.examQuestionName === item2.examQuestionName;})+1}</a></li>
                    ))}    

                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>  
            {/* <button onClick={this.myTest}>TEST</button> */}

            {this.submitButton(JSON.parse(localStorage.getItem("CurrentExam")).length -1, JSON.parse(localStorage.getItem("CurrentExam")).sort((a, b) => a.examQuestionName > b.examQuestionName ? 1 : -1).findIndex(object => {return object.examQuestionName === item.examQuestionName;}))}

            </div>
          </div>
        ))}        
      </div>
    )
  }
}
