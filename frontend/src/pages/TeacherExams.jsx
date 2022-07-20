import React, { Component } from 'react'
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { FaSort } from 'react-icons/fa'

export default class teacherExams extends Component {
  constructor(props){super(props);
    this.handleDelete = this.handleDelete.bind(this)
    this.handleClickExamQuestions = this.handleClickExamQuestions.bind(this)
    this.studentsCompletedCount = this.studentsCompletedCount.bind(this)
    this.studentsCompletedList = this.studentsCompletedList.bind(this)
    this.markButton = this.markButton.bind(this)
    // this.showStudentResponses = this.showStudentResponses.bind(this)
    this.state={exams:[]};
    // this.state={examQuestion:{}}  
}

  componentDidMount(){ // this loads our lessons prior to the page loading    
    axios.get('http://localhost:5000/exams')
    .then(response=>{
        this.setState({exams:response.data})
        console.log(this.state.exams)
        // console.log(this.state.lessons[46].lessonName)
    })
    .catch((error)=>{
      console.log(error)
      console.log("did not work")
    })
}

studentsCompletedCount(item){
  return <p>{item.length}</p>
}

studentsCompletedList(item){

}

// showStudentResponses(exam, student){
//   console.log(exam, student)
// }

  handleDelete = function(item){
    console.log(item._id)
    axios.delete('http://localhost:5000/exams/delete/'+item._id)
        .then(response => { console.log(response.data)});  
      this.setState({
        exams: this.state.exams.filter(el => el._id !== item._id)
      })
  }

  markButton = function(item, subitem){    
    if(typeof subitem.result !== "undefined"){
      return <td><a href="/teacher/exam/focus" onClick={()=>this.handleClickExamQuestions(item, subitem)}>{subitem.result}</a></td> 
    } else 
      return <td><a href="/teacher/exam/focus" onClick={()=>this.handleClickExamQuestions(item, subitem)}>Mark</a></td> 
  }

  handleClickExamQuestions = async function(exam,student){ 
    await localStorage.removeItem("CurrentExam")
    // const newRequest = [exam.examName,student.studentEmail] // https://stackoverflow.com/questions/49944387/how-to-correctly-use-axios-params-with-arrays 
    console.log(exam,student)
    // console.log(newRequest)
    // axios.get('http://localhost:5000/exams/questions/'+exam.examName,)        
    await axios.get('http://localhost:5000/exams/questions/'+'{"exam": "'+exam.examName+'", "student": "'+student.studentEmail+'"}')  
    // .then(res => console.log((res.data))) 
        .then(res => {localStorage.setItem("CurrentExam", JSON.stringify(res.data))})
        .then (window.location ="/teacher/exam/focus")      
        .catch(err => {console.log(err)})    
        console.log("Found Exam: "+localStorage.getItem("CurrentExam")) 
        
      
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
                <th scope="col">Students Enrolled <FaSort/></th>
                <th scope="col">Students Completed <FaSort/></th>
                <th scope="col">Price <FaSort/></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

            {this.state.exams.sort((a, b) => a.examName > b.examName ? 1 : -1).map((item)=>( 
              <tr>
                <th scope="row">{this.state.exams.indexOf(item) +1}</th>
                <td ><button class="btn btn-link" style = {link} onClick = {()=>this.handleClickExamQuestions(item,"")}>{item.examName}</button></td>
                <td>{item.examTimer} min</td>
                <td></td> 
                <td>
                  <a style={link} href="#" data-bs-toggle="modal" data-bs-target={"#exampleModal"+this.state.exams.indexOf(item)}>  {this.studentsCompletedCount(item.studentsCompleted)}</a>                  

                  <div class="modal fade" id={"exampleModal"+this.state.exams.indexOf(item)} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Students who have completed this exam:</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                              <table class="table table-hover">
                                <thead>
                                  <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col"> Student Name <FaSort/> </th>                          
                                    <th scope="col">Student Email<FaSort/></th>
                                    <th scope="col">Date Completed<FaSort/></th>
                                    <th scope="col">Result<FaSort/></th>
                                  </tr>
                                </thead>
                                <tbody>                               

                                {item.studentsCompleted.sort((a, b) => b.dateCompleted > a.dateCompleted ? 1 : -1).map((subitem)=>(
                                  <tr>
                                    {/* <th scope="row"></th> */}
                                    <td> <a href="/teacher/students">{subitem.student}</a></td>
                                    <td>{subitem.studentEmail}</td>
                                    <td>{subitem.dateCompleted}</td> 
                                    {this.markButton(item, subitem)}
                                    {/* <td><a href="/teacher/exam/focus" onClick={()=>this.handleClickExamQuestions(item, subitem)}>Mark</a></td>                            */}
                                  </tr> 
                                ))} 
                                </tbody>
                              </table>
                          </div>                 
                        </div>
                      </div>
                  </div>

                </td>
                <td>{item.examPrice}</td> 
                <td><p><FaEdit  style={icon}/> <FaTrash onClick = {()=>this.handleDelete(item)} style={icon}/></p></td> 
                {/* <td></td>  */}
              </tr>
            ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col offset-9">
              <a className="btn btn-secondary shadow mt-3" href="/teacher/exams/new"><FaPlus/> Add New Exam</a>   
            </div>
          </div>   
        </div>  
      </div>
    )
  }
}
