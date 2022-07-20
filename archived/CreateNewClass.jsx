import React, {useState} from 'react'
import reactDom from 'react-dom'
import $ from 'jquery'
import { FaTimes } from 'react-icons/fa' // we did a npm i react-icons which gave us font awesome. Wer're now using it here
import ClassData from '../frontend/src/seeds/ClassData'

const CreateNewClass = () =>{

  

  const [classes, setClasses] = useState(ClassData)

  const [dateArray, setdDateArray] = useState([])
  function dateSelectorHandleChange(){
      //dateArray.push(document.querySelector("#dateSelect").value)
      setdDateArray(dateArray =>[...dateArray,document.querySelector("#dateSelect").value])
      console.log(dateArray)
      document.getElementById("dateSelect").setAttribute("focus");
      //autofocus
      //document.querySelector("#dateSelect").open
      //document.querySelector("#dateSelect").placeholder = "hello"// modalDateArray
  } 
  
  function dateCloseHandleChange(item){
    let index = dateArray.indexOf(item)
    dateArray.splice(index,1)
    setdDateArray(dateArray =>[...dateArray])    
  }

  const handleSubmit = async(event) =>{
    console.log("TEST")
  }
    
  const dateCardStyle = {
      width:"99%",
  }

  const hiddenPage = {
    display:"none",
  }

  const dateCardClose ={    
      position: "absolute",
      top: "0px",
      right: "0px",
      cursor: "pointer",
      background: "none",
      border: "none",
  }

  const openTab = function(tabName) {    
    var i, tabcontent, tablinks;
    console.log("click")
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      console.log(tabcontent[i])
    }
  
    // // Get all elements with class="tablinks" and remove the class "active"
    // tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }

    // document.getElementById("firstPageLink").className = "page-item disabled"
    // document.getElementById("secondPageLink").className = "page-item disabled"
    // document.getElementById(tabName+"Link").className = "page-item"
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    console.log(tabName)
    // evt.currentTarget.className += " active";
}
    
  return (
    <div>
      <div className="row">
        <h1 class = "text-center mt-5 mb-5">New Class</h1>
        <div class = "col-md-6 offset-md-3">
          <form action = "/teacher/new/class" method = "POST">
            <div className="tabcontent" id="firstPage">
            
              <div className="mb-4">
                <label className="form-label" for="nameFirstPage"><h6>Lesson Name</h6></label>
                <input className="form-control" type = "text" id="nameFirstPage" name="class[name]"/>
              </div>

              <div className="mb-4">
                <label className="form-label" for="description"><h6>Lesson Description</h6></label>
                <textarea className="form-control" type = "text" id="descriptionFirstPage" name="class[description]"/>
              </div>

              <div class="mb-4">
                  <label class="form-label" for="classType"><h6>Type of Lesson</h6></label>
                  <select class="form-select" aria-label="Default select example" id="classType" name="class[type]">
                      <option selected value ="General English">Select Class Type...</option>
                      <option  value ="General English">General English</option>
                      <option  value ="PTE Exam Prep">PTE Exam Prep</option>
                      <option  value ="IELTS Exam Prep">IELTS Exam Prep</option>                    
                      <option  value ="Cambridge Exam Prep">Cambridge Exam Prep</option>                    
                      <option  value ="Business English">Business English</option>                    
                  </select>
              </div>  

              <div class="mb-4">
                  <label class="form-label" for="classSize"><h6>Class Size</h6></label>
                  <select class="form-select" aria-label="Default select example" id="classSize" name="class[type]">
                      <option selected value ="10">Select Class Size...</option>
                      <option  value ="1">One-on-One Class</option>
                      <option  value ="3">Small (2-3 students)</option>
                      <option  value ="8">Medium (4-8 Students)</option>                    
                      <option  value ="16">Large (9-16 Students)</option>                   
                  </select>
              </div>  

              <div class = "mb-4">      
                  <label for="classLevel"><h6>Level</h6></label>        
                  <div class = "form-check" id = "classLevel">                    
                    <input class="form-check-input" type="checkbox" value="A1" id="A1" name = "class[level]"/>
                    <label class="form-check-label mb-1" for="A1">Beginner (A1)</label> <br></br>
                    <input class="form-check-input" type="checkbox" value="A2" id="A2" name = "class[level]"/>
                    <label class="form-check-label mb-1" for="A2">Lower-Intermediate (A2)</label> <br></br>
                    <input class="form-check-input" type="checkbox" value="B1" id="B1" name = "class[level]"/>
                    <label class="form-check-label mb-1" for="B1">Intermediate (B1)</label> <br></br>
                    <input class="form-check-input" type="checkbox" value="B2" id="B2" name = "class[level]"/>
                    <label class="form-check-label mb-1" for="B2">Upper-Intermediate (B2)</label> <br></br>
                    <input class="form-check-input" type="checkbox" value="C1" id="C1" name = "class[level]"/>
                    <label class="form-check-label mb-1" for="C1">Advanced (C1)</label> <br></br>
                  </div>
              </div>

              <div class="mb-4">
                <label for="dateSelect"><h6>Schedule Your Lessons</h6></label>
                <input type="date" id ="dateSelect" class = "form-control date" placeholder="Select Date" onChange={dateSelectorHandleChange}/> <br></br>
                {/* <textarea type="text" className="form-control" id="dateDisplay" name="dateDisplay">{dateArray}</textarea> */}
                <div className="row">
                {dateArray.map((item)=>( 
                  <div className="col-3">           
                    <div className="card mb-2" style={dateCardStyle}>
                      <h6 className="card-title p-2 text-center">{item}</h6> 
                      <FaTimes color='grey' style={dateCardClose} onClick ={function(){dateCloseHandleChange(item)}}/>                 
                    </div>
                  </div> 
                ))}
                </div>
              </div>

              <div class="mb-4">
                  <label class="form-label" for="startTime"><h6>Start Time</h6></label>
                  <div className="row">
                    <div className="col-3">
                      <select class="form-select" aria-label="Default select example" id="startTime" name="class[startTime]">
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
                      <select class="form-select" aria-label="Default select example" id="startTime" name="class[startTime]">
                          <option selected value ="00">00</option>                                    
                          <option  value ="15">15</option>                                    
                          <option  value ="30">30</option>                                    
                          <option  value ="45">45</option>                                    
                      </select>
                    </div>
                    <div className="col-3">
                      <select class="form-select" aria-label="Default select example" id="startTime" name="class[startTime]">
                          <option selected value ="PM">PM</option>                                    
                          <option  value ="AM">AM</option>                                    
                      </select>
                    </div>
                  </div>
              </div>

              <div class = "mb-4">      
                  <label for="length"><h6>Length</h6></label>        
                  <div class = "form-check" id = "length">                    
                    <input class="form-check-input" type="radio" value="A1" id="A1" name = "class[length]"/>
                    <label class="form-check-label mb-1" for="A1">1 Hour</label> <br></br>
                    <input class="form-check-input" type="radio" value="A2" id="A2" name = "class[length]"/>
                    <label class="form-check-label mb-1" for="A2">2 Hours</label> <br></br>
                    <input class="form-check-input" type="radio" value="B1" id="B1" name = "class[length]"/>
                    <label class="form-check-label mb-1" for="B1">3 Hours</label> <br></br>                    
                  </div>
              </div>          
            
          </div>

          <div id="secondPage" className ="tabcontent" style={hiddenPage}>
            {dateArray.map((item)=>( 
              <div className="container mt-3">           
                <div className="card mb-2 rounded shadow" style={dateCardStyle}>
                  <div className="container">

                    <h6 className="card-title p-2 text-center">{document.getElementById("classType").value}</h6> 
                    <div className="card-body p-2 text-center">{item}</div> 
                    <FaTimes color='grey' style={dateCardClose} onClick ={function(){dateCloseHandleChange(item)}}/>                 
                    <div className="mb-4">
                      <label className="form-label" for="name"><h6>Lesson Name</h6></label>
                      <input className="form-control" type = "text"  value ={document.getElementById("nameFirstPage").value}  name="class[name]"/>
                    </div>

                    <div className="mb-4">
                      <label className="form-label" for="description"><h6>Lesson Description</h6></label>
                      <textarea className="form-control" type = "text" value ={document.getElementById("descriptionFirstPage").value} name="class[description]"/>
                    </div>
                  </div>
                </div>
              </div> 
            ))}
          <button>Submit</button>
          </div>
          </form>

          <div className="row"><div className="col-1 offset-11">              
            <nav aria-label="...">
              <ul class="pagination">
                <li id = "firstPageLink" class="page-item">
                  <a class="page-link" href="#" onClick = {()=>openTab('firstPage')}>Previous</a>
                  {/* <a class="page-link" href="#" tabindex="-1">Previous</a> */}
                </li>               
                <li id = "secondPageLink" class="page-item">
                  <a class="page-link" href="#" onClick={()=>openTab('secondPage')}>Next</a>
                  {/* <a class="page-link" href="#">Next</a> */}
                </li>
              </ul>
            </nav>
          </div></div>  

        </div>
      </div>      
    </div>    
  )
}
export default CreateNewClass