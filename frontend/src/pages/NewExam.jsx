import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa' // we did a npm i react-icons which gave us font awesome. Wer're now using it here
import { FaTrash } from 'react-icons/fa' // we did a npm i react-icons which gave us font awesome. Wer're now using it here
import { FaRegPlayCircle } from 'react-icons/fa' // we did a npm i react-icons which gave us font awesome. Wer're now using it here
import { FaUpload } from 'react-icons/fa' 
import { FaPlus } from 'react-icons/fa' 
import axios from 'axios'

export default class NewExam extends Component {
    constructor(props) {
        super(props);
    
        this.newQuestion = this.newQuestion.bind(this)
        this.handleQuestionArrayClick = this.handleQuestionArrayClick.bind(this)      
        this.currentArrayItem = this.currentArrayItem.bind(this)  
        this.createExam=this.createExam.bind(this)   
        this.state = {
            questionDescription:"",
            questionPrompt:"",
            questionArray:[{}],   
            examQuestionArray:[{}],   
            currentArrayItemNum:0      
        }
      }

      newQuestion(e){ 

        let newQuestion = {prompt:"text",response:"audio"}

        this.setState({questionArray:[...this.state.questionArray,newQuestion]})
        console.log(this.state.questionArray)
        var i, tabcontent
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        //   console.log(tabcontent[i])
        }
      } 

      handleQuestionArrayClick(num){
        this.setState({currentArrayItemNum:num})
        // console.log(this.state.currentArrayItemNum)
        var i, tabcontent
        tabcontent = document.getElementsByClassName("tabcontent");
        console.log(num)
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
          //   console.log(tabcontent[i])
        }
        tabcontent[num].style.display="block"
      }

      currentArrayItem(number){     
            if(number===this.state.currentArrayItemNum){
                return [
                    
                ]
            }
        }
    
        // createExam(e){
        //     e.preventDefault();
        //     for(let i=0; i < this.state.questionArray.length; i++){
        //         let newExamQuestion={                   
        //             questionName: document.getElementById(i+"questionName").value,
        //             questionPrompt: document.getElementById(i+"questionPrompt").value,
        //             questionDescription: document.getElementById(i+"questionDescription").value,              
        //         }                       
        //         // this.examQuestionArray.history.push(newExamQuestion)
        //         console.log(this.state.examQuestionArray)
        //     }
        //     const newExam = {
        //         examName:document.getElementById("examName").value,
        //         examTime:document.getElementById("examTimer").value,
        //         examQuestions:this.state.examQuestionArray
        //     }
        //     // axios.post('http://localhost:5000/exams/new',newExam)
        //     //     .then(res=>console.log("New Exam:"+res.data))

        //     console.log(newExam)

        // }
        createExam(e){
            e.preventDefault();
            const newExam = {
                examName:document.getElementById("examName").value,
                examTime:document.getElementById("examTimer").value
            }
            axios.post('http://localhost:5000/exams/new',newExam)
                .then(res=>console.log("New Exam:"+res.data))

            console.log(newExam)
            for(let i=0; i < this.state.questionArray.length; i++){
                const newQuestion={                    
                    questionName: document.getElementById(i+"questionName").value,
                    questionPrompt: document.getElementById(i+"questionPrompt").value,
                    questionDescription: document.getElementById(i+"questionDescription").value,
                    examName:document.getElementById("examName").value,
                    examTime:document.getElementById("examTimer").value,
                    examPrice:document.getElementById("examPrice").value,
                }
                axios.post('http://localhost:5000/exams/new/question',newQuestion)
                    .then(res=>console.log("New Question:"+res.data))
                // console.log((this.state.questionArray[i] +"questionPrompt").value)
                // console.log(newQuestion)
            }
            window.location='/teacher/exams'
        }

  render() {

    const hidden={
        display:"none"
    }

    const cardClose ={    
        position: "relative",
        right: "-800px",
        cursor: "pointer",
        background: "none",
        border: "none",
    }

    return (
        <div>
            <div className="container">
                <div className="mb-4 container bg-white shadow mt-3 p-5 rounded">
                    <h2 className = "mb-3">Exam Details</h2>
                    <label className="form-label " for="examName"><h6>Exam Name</h6></label>
                    <input className="form-control shadow mb-3" placeholder = "Exam Name" type = "text" id="examName" name="examName" o/>
                    <label class="form-label" for="responseType"><h6>Exam Time</h6></label>
                    <select class="form-select shadow mb-3" aria-label="Default select example" id="examTimer" name="examTimer">
                        <option selected value ="NA">Select Exam Timer...</option>
                        <option  value ="0">No Timer</option>
                        <option  value ="30">30 Minutes</option>
                        <option  value ="45">45 Minutes</option>
                        <option  value ="60">60 Minutes</option>
                        <option  value ="90">90 Minutes</option>    
                        <option  value ="120">2 hours</option>                
                        <option  value ="180">3 hours</option>               
                    </select>
                    <label className="form-label " for="examPrice"><h6>Exam Price</h6></label>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>                       
                        <input className="form-control shadow mb-3" placeholder = "AUD" type = "text" id="examPrice" name="examPrice" o/>
                        <div class="input-group-append">
                            <span class="input-group-text">.00</span>
                        </div>
                    </div>
                    <div className="row mt-3">                 
                        <div className="offset-9 col-3">
                            {/* <button className="btn btn-secondary shadow mt-3" onClick = {this.newQuestion}><FaPlus/> Add New Question</button> */}
                            <button className="btn btn-secondary shadow mt-3" onClick = {this.createExam}><FaUpload/> Upload New Exam</button>
                        </div>
                    </div> 
                </div> 

                <div class="mb-4 container bg-white shadow mt-5 p-5 rounded">
                    <h2 className = "mb-3">Create New Question</h2>
                    <label class="form-label" for="promptType"><h6>Prompt Type</h6></label>
                    <select class="form-select shadow mb-3" aria-label="Default select example" id="promptType" name="promptType">
                        <option selected value ="General English">Select Class Type...</option>
                        <option  value ="General English">Audio</option>
                        <option  value ="PTE Exam Prep">Image</option>
                        <option  value ="IELTS Exam Prep">Text</option>                   
                    </select>
                    <label class="form-label" for="responseType"><h6>Response Type</h6></label>
                    <select class="form-select shadow mb-3" aria-label="Default select example" id="responseType" name="responseType">
                        <option selected value ="General English">Select Response Type...</option>
                        <option  value ="General English">Audio</option>
                        <option  value ="General English">Drop and drag</option>
                        <option  value ="General English">Fill in the blanks</option>
                        <option  value ="General English">Multiple choice</option>
                        <option  value ="PTE Exam Prep">Written (essay)</option>    
                        <option  value ="PTE Exam Prep">Written (paragraph)</option>    
                        <option  value ="PTE Exam Prep">Written (short response)</option>               
                    </select>
                    <label class="form-label" for="questionTimer"><h6>Question Time</h6></label>
                    <select class="form-select shadow" aria-label="Default select example" id="questionTimer" name="questionTimer">
                        <option selected value ="NA">Select Question Timer...</option>
                        <option  value ="NA">No Timer</option>
                        <option  value ="30">30 Minutes</option>
                        <option  value ="45">45 Minutes</option>
                        <option  value ="60">60 Minutes</option>               
                    </select>
                    <div className="row mt-3">                 
                        <div className="offset-9 col-3">
                            <button className="btn btn-secondary shadow mt-3" onClick = {this.newQuestion}><FaPlus/> Add New Question</button>
                            {/* <button className="btn btn-secondary shadow mt-3" onClick = {this.createExam}><FaUpload/> Upload New Exam</button> */}
                        </div>
                    </div>  
                </div>               

                {this.state.questionArray.map((item)=>(     
                    <div className="tabcontent">                            
                        <div className="container bg-white shadow mt-5 p-5 mb-5 rounded">
                        <h2 className="mb-3">Page {this.state.questionArray.indexOf(item)+1}</h2>
                        {this.currentArrayItem(this.state.questionArray.indexOf(item))}  
                            <div className="mb-4">
                                <label className="form-label " for="questionName">Question Name</label>
                                <input className="form-control shadow" placeholder = "Question Name" type = "text" id={this.state.questionArray.indexOf(item)+"questionName"} name="questionName" o/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label " for="questionDescription">Question Description / Instructions</label>
                                <input className="form-control shadow" placeholder = "Question Description" type = "text" id={this.state.questionArray.indexOf(item)+"questionDescription"} name="questionDescription" o/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label " for="questionPrompt">Question Prompt</label>
                                <input className="form-control shadow" placeholder = "Question Prompt" type = "text" id={this.state.questionArray.indexOf(item)+"questionPrompt"} name="questionPrompt" o/>
                            </div>                            
                            
                            <div className="mb-1">
                                <label className="form-label " for="questionResponse">Question Response: AUDIO</label>
                                {/* <input className="form-control shadow" placeholder = "Student Response" type = "text" id="questionResponse" name="questionResponse" o/> */}
                            </div>
                            <FaRegPlayCircle size={42} color='grey'/>                            

                            <nav aria-label="Page navigation example">
                                <ul class="pagination mt-5">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    {this.state.questionArray.map((item)=>( 
                                        <li class="page-item"><a class="page-link" href="#" onClick={()=>this.handleQuestionArrayClick(this.state.questionArray.indexOf(item))}>{this.state.questionArray.indexOf(item)+1}</a></li>
                                    ))}                                  
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>   
                            <FaTrash color='grey' size={20} style={cardClose}/>                      
                        </div>   
                    </div>            
                ))}

            </div>
        </div>
    )
  }
}
