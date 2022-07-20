import React, { Component } from 'react'
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'
import { FaSort } from 'react-icons/fa'
import { FaHourglassHalf } from 'react-icons/fa'

export default class StudentExams extends Component {
    constructor(props){super(props);
        this.handleClickExamQuestions = this.handleClickExamQuestions.bind(this)  
        this.showResult = this.showResult.bind(this)  
        this.state={exams:[]};
        // this.state={examQuestion:{}}  
    }
    
      componentDidMount(){ // this loads our lessons prior to the page loading
        localStorage.removeItem("CurrentExam")
        axios.get('http://localhost:5000/exams')
        .then(response=>{
            this.setState({exams:response.data})
            console.log(this.state.exams)
            console.log("TEST: "+ JSON.parse(localStorage.getItem("CurrentStudent")).studentEmail)
            // console.log(this.state.lessons[46].lessonName)
        })
        .catch((error)=>{
          console.log(error)
          console.log("did not work")
        })
    }   
    
      handleClickExamQuestions =  function(exam,student){ 
   
         localStorage.removeItem("CurrentExam")
        // const newRequest = [exam.examName,student.studentEmail] // https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays 
        console.log(exam,student)
        // console.log(newRequest)
        // axios.get('http://localhost:5000/exams/questions/'+exam.examName,)        
           axios.get('http://localhost:5000/exams/questions/'+'{"exam": "'+exam.examName+'", "student": "'+student+'"}')  
          // .then(res => console.log((res.data))) 
              .then(res => {localStorage.setItem("CurrentExam", JSON.stringify(res.data))})  
              .then(window.location="/student/exam/focus")    
              .catch(err => {console.log(err)})    
              //console.log("Found Exam: "+localStorage.getItem("CurrentExam"))                 
                   
      }

      showResult = function(item){
        //console.log(item.studentsCompleted)
        try{
        const result = item.studentsCompleted.filter(obj => {return obj.studentEmail == JSON.parse(localStorage.getItem("CurrentStudent")).studentEmail})[0].result
        console.log("RESULT"+result)
        if (!result){          
          return <span class="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
            <h7 tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover"> Awaiting mark <FaHourglassHalf/></h7>
          </span>
        }
        return <div>{result}</div>
        }catch(e){
          console.log(e)
        }
      }
    
      render() {
    
        const icon ={ 
          cursor: "pointer",
          background: "none",
          border: "none",
       }
        const link ={ 
          color: "black",
          textDecoration:"none"
       }
    
         const btn ={
            height:"80%",
            width:"80%"
        }
    
        return (
          <div>
            <div className="mb-4 container bg-white shadow mt-3 p-5 rounded">
              <div className="row p-3">                            
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>                                                            
              </div>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col"> Exam Name <FaSort/> </th>
                    {/* <th scope="col">Created by <FaSort/></th> */}
                    {/* <th scope="col">Created by</th>
                    <th scope="col">Created on</th> */}
                    {/* <th scope="col">Created by <FaSort/></th> */}
                    <th scope="col">Exam Length<FaSort/></th>
                    <th scope="col">Price <FaSort/></th>
                    <th scope="col">Enrolled? <FaSort/></th>
                    <th scope="col">Result <FaSort/></th>                  
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
    
                {this.state.exams.sort((a, b) => a.examName > b.examName ? 1 : -1).map((item)=>( 
                  <tr>
                    <th scope="row">{this.state.exams.indexOf(item) +1}</th>
                    <td ><button class="btn btn-link" style = {link} onClick = {()=>this.handleClickExamQuestions(item,JSON.parse(localStorage.getItem("CurrentStudent")).studentEmail)}>{item.examName}</button></td>
                    <td>{item.examTimer}</td>
                    <td>{item.examPrice}</td> 
                    <td></td>
                    <td>{this.showResult(item)}</td>
                    {/* <td>{item.studentsCompleted.filter(obj => {return obj.studentEmail = JSON.parse(localStorage.getItem("CurrentStudent")).studentEmail})[0].result}</td>                                     */}
                  </tr>
                ))}
                </tbody>
              </table>            
            </div>  
          </div>
        )
      }
}
