import React, { Component } from 'react' //rce tab to create this template automatically
import axios from 'axios';
import { PromiseProvider } from 'mongoose';
// import { Link, useParams } from 'react-router-dom';
import LessonCard from '../components/LessonCard';

// const Lesson = props => (    
//     <Link to={"/teacher/classes/edit/"+props.lesson._id}>edit</Link>
//   )

export class MyClasses extends Component {
    constructor(props){
        super(props);
        this.deleteLesson = this.deleteLesson.bind(this)
        // this.handleFilterClick = this.handleFilterClick.bind(this)
        this.state={lessons:[],filterActive:false};  
        // this.state = {
        //     filterActive:false
        // }
    }
    

    teacherPic = function(currentLesson){
      if (currentLesson == "Scott Stinson"){
        return "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      }  else if (currentLesson == "Tamara Loyacono"){
        return "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      }  else if (currentLesson == "Carol Doyle"){
        return "https://images.unsplash.com/photo-1571260898938-0fe5057e7208?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      }
    }

    componentDidMount(){ // this loads our lessons prior to the page loading
        axios.get('http://localhost:5000/teacher/home/')
        .then(response=>{
            this.setState({lessons:response.data})
            console.log(this.state.lessons)
            // console.log(this.state.lessons[46].lessonName)
        })
        .catch((error)=>{
          console.log(error)
          console.log("did not work")
        })
    }

    deleteLesson = function(id) {
      console.log(id)
      axios.delete('http://localhost:5000/teacher/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        lessons: this.state.lessons.filter(el => el._id !== id)
      })
    }  

  render() {
    const btn ={
        height:"80%",
        width:"80%"
    }
    const divStyleClicked = {
        color:"rgba(96,169,255,1)",
        textShadow: "0.5px 0.5px black",
        cursor: "pointer",
    }
    const divStyleUnclicked = {
        color:"black",
        textShadow: "none",
        cursor: "pointer",
    }  

    const editStyle={
      display:"none"
    }
    
    const handleFilterClick = function(e){
        // {this.setState({filterActive: false})}
        // this.state.filterActive = "true"
        console.log(e.target.style)
        let allH4 = document.querySelectorAll("h4")
        for(let i = 0; i< allH4.length;i++){            
            // allH4[i].className = "lessonFilterUnclicked"            
            allH4[i].style="color:black; textShadow: none; cursor: pointer"
            // console.log(active)   
            allH4[i].className="FilterOff"
        }        
        e.target.style = "color:rgba(96,169,255,1); textShadow: .5px 0.5px black; cursor: pointer"   
        if (e.target.id == "filter"){      
            console.log("Filter On")            
            e.target.className = "FilterOn"           
        } else{
            console.log("Filter Off")                     
        }        
    }

    return (
        <div>
        <div className="row">
            <div className="col-10">
                <div className="text-dark bg-white mb-3 mr-3 rounded shadow">
                {/* <!-- <h2 class="d-flex justify-content-center pt-3 pb-3">Filters</h1> --> */}
                    <div className="row p-3">                            
                            <div className="col-6 text-center" ><h4  style={divStyleClicked} onClick = {handleFilterClick}>Upcoming Lessons</h4></div>
                            <div className="col-6 text-center"><h4 id = "filter"  style={divStyleUnclicked}  onClick = {handleFilterClick}>Past Lessons</h4></div>                                                                  
                    </div>
                </div>
            </div>
            <div className="col-2 text-center">             
          
                      <a href="/teacher/classes/new" style = {btn} class="btn btn-secondary btn-lg p-3  shadow">+Add </a>                                                                              
            </div>
        </div>
            
        {this.state.lessons.sort((a, b) => a.lessonStartDate > b.lessonStartDate ? 1 : -1).map((item)=>( 
            <div>
                {(()=>{
                  if(JSON.parse(localStorage.getItem("CurrentStudent"))){
                    if(item.lessonEnrolled.includes(JSON.parse(localStorage.getItem("CurrentStudent")).studentEmail)){ //if item.studentsEnrolled contains current student
                      return(
                        //<LessonCard item={item} deleteLesson ={()=>this.deleteLesson(item._id)} currentPageStudent={editStyle}/>
                        <LessonCard item={item} currentPageTeacher={this.props.currentPageTeacher} currentPageStudent={this.props.currentPageStudent} currentPageTeacherMyClasses={editStyle} />
                      )
                    }
                  } else if(JSON.parse(localStorage.getItem("CurrentTeacher")))                   
                      if(item.lessonTeacher == JSON.parse(localStorage.getItem("CurrentTeacher")).teacherName){
                          // if(this.state.filterActive =true){                           
                              return(

                                  <LessonCard item={item} deleteLesson ={()=>this.deleteLesson(item._id)} currentPageStudent={editStyle}/> 

                                  // <div className = "card mb-4 shadow-lg">                               
                                  //     <div className = "row">
                                  //         <div className = "col-md-4 mt-2"> {/*<!--This is saying that, after size medium and above, this will take up 4 units of 12-->                                */}
                                  //             {/* <img  alt="" className = "d-flex justify-content-center mb-4 img-fluid mb-4 mt-3 offset-1 rounded" src={this.teacherPic(item.lessonTeacher)}/>   */}
                                  //             <img  alt="" className = "d-flex justify-content-center mb-4 img-fluid mb-4 mt-3 offset-1 rounded" src={item.lessonImage}/>  
                                  //             <h2 className = "d-flex justify-content-center mb-4">{item.lessonTeacher}</h2>                             
                                  //         </div>
                                  //         <div className="col-md-5 offset-1">
                                  //             <div className="card-body mb-5">
                                  //                 <h5 className="card-title mb-3 mt-3"> {item.lessonType} {item.lessonLevel} </h5>
                                  //                 <p className="card-text"> {item.lessonDescription} </p>
                                  //                 <p className="card-text">
                                  //                     <small className = "text-muted">  {item.lessonStartDate}  </small> <br></br>
                                  //                     <small className = "text-muted">  {item.lessonStartTime} - {item.lessonLength} </small>
                                  //                 </p>                                    
                                  //             </div>       
                                  //         </div>
                                  //         <div className="col-2">
                                  //             <div className="row position-absolute bottom-0">
                                  //                 <div className="col-1 pb-2"><a className="btn btn-secondary" href={"/teacher/classes/edit/:"+item._id}>Edit</a></div>
                                  //                 {/* <div className="col-1 pb-2"><Lesson lesson={item} key={item._id}/></div> */}
                                                  
                                  //                 <div className="col-1 offset-3 mr-3 pr-3 pb-2">                                                
                                  //                     <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                  //                         Delete
                                  //                     </button>

                                  //                     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  //                     <div class="modal-dialog" role="document">
                                  //                     <div class="modal-content">
                                  //                         <div class="modal-header">
                                  //                         <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to delete this lesson?</h5>
                                  //                         <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                  //                             <span aria-hidden="true">&times;</span>
                                  //                         </button>
                                  //                         </div>
                                  //                         <div class="modal-body">
                                  //                             Students who are currently enrolled will be notified and automatically refunded.
                                  //                         </div>
                                  //                         <div class="modal-footer">
                                  //                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  //                         <a className="btn btn-secondary" href="#" data-bs-dismiss="modal" onClick ={()=>{this.deleteLesson(item._id)}}>Delete</a>
                                  //                         </div>
                                  //                     </div>
                                  //                     </div>
                                  //                 </div>
                                  //                 </div>
                                  //             </div>
                                  //         </div>
                                  //     </div>
                                  // </div> 
                              )
                          // }  
                      }
                })()}          
            </div>
        ))}
      </div>
    )
  }
}

export default MyClasses