import React, { Component } from 'react'
import reactDom from 'react-dom'
import axios from 'axios'
import '../stylesheets/lessonCard.css'

// const LessonCard = ({item,deleteLesson,currentPageTeacher,currentPageStudent,currentPageTeacherMyClasses}) => {
export default class LessonCard extends Component {
    constructor(props) {
        super(props); 
        this.currentStudentIsLoggedIn=this.currentStudentIsLoggedIn.bind(this) ;      
        this.registerStudent=this.registerStudent.bind(this) ;      
        this.cancelRegistration=this.cancelRegistration.bind(this) ;      
    }     

    registerStudent(id) {
        //console.log(id)
        const registerInfo = {...JSON.parse(localStorage.getItem("CurrentStudent")),lessonId:id}
        console.log(registerInfo)
        axios.post('http://localhost:5000/teacher/classes/register',registerInfo)
        window.location.reload(false)
    }

    cancelRegistration(id){
        const registerInfo = {...JSON.parse(localStorage.getItem("CurrentStudent")),lessonId:id}
        console.log(registerInfo) 
        axios.post('http://localhost:5000/teacher/classes/cancelRegister',registerInfo)
        window.location.reload(false)
    }

    currentStudentIsLoggedIn(item){        
        if(!JSON.parse(localStorage.getItem("CurrentStudent"))){
            return <div>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#signinModal">
                    Register
                </button> 
                <div class="modal fade" id="signinModal" tabindex="-1" role="dialog" aria-labelledby="signinModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="signinModalLabel">Wait! Sign in first!</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                You must be logged in to join this class!
                            </div>
                            <div class="modal-footer">
                                <a className="btn btn-secondary" href="/student/signup">Log in / Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (JSON.parse(localStorage.getItem("CurrentStudent"))){ 
            if(!JSON.parse(localStorage.getItem("CurrentStudent")).studentLevel){
                return  <div>
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#signinModal">
                    Register
                </button> 
                <div class="modal fade" id="signinModal" tabindex="-1" role="dialog" aria-labelledby="signinModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="signinModalLabel">Wait! Complete your free level test first!</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Before you join class you need to complete your English Level Test so that we can put you in the correct lesson. The test is completely free and takes about 5-10 minutes to complete. After completing the test, you may need to wait 24-48 hours for your test to be marked.
                            </div>
                            <div class="modal-footer">
                                <a className="btn btn-secondary" href="/student/exams">Complete Test</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            } else if(item.lessonEnrolled.includes(JSON.parse(localStorage.getItem("CurrentStudent")).studentEmail)){
                return <div>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal"  data-bs-target={"#signinModalCanel"+item._id}>
                        Cancel
                    </button> 
                    <div class="modal fade" id={"signinModalCanel"+item._id} tabindex="-1" role="dialog" aria-labelledby="signinModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="signinModalLabel">Are you sure you want to cancel this class?</h5>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Your place will no longer be saved. If you're cancelling less than 24 hours before the class starts, you may still be charged a cancellation fee.
                                </div>
                                <div class="modal-footer">
                                    <btn className="btn btn-warning" onClick = {()=>this.cancelRegistration(item._id)}>Cancel Registration</btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 
            } else{
                if(item.lessonEnrolled.length >= item.lessonSize){
                    return <button type="button" class="btn btn-secondary disabled">
                        Lesson Full
                    </button>    
                } else{       
                    return <div>
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={"#signinModalRegister"+item._id}>
                            Register
                        </button>                 
                        <div class="modal fade" id={"signinModalRegister"+item._id} tabindex="-1" role="dialog" aria-labelledby="signinModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="signinModalLabel">Are you sure you want to register for this class?</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Your place will be reserved in the class. If you wish to cancel, please do so 24 hours before the class starts or you may still be charged.
                                    </div>
                                    <div class="modal-footer">
                                        <btn className="btn btn-secondary" onClick = {()=>this.registerStudent(item._id)}>Register</btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            }
        }
    }

    render(){
    // const imgStyle = {
    //     borderRadius:"50%",
    //     width:"90%",
    // }

    const enrolCount ={
        position: "absolute",
        top: "90%",
        left: "99%",
        background: "#f4f4f4",
        width: "50px",
        height: "50px",
        padding: "10px",
        textAlign: "center",
        borderRadius: "50%",
        fontSize: "19px",
        border: "1px #eee solid",
        transition: "0.3s",
        textAlign: "center",
        
    }

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    
    return(
        <div className = "card mb-4 shadow-lg" id="lessonCard">
            <div className = "row">
                <div className = "col-md-4"> {/*<!--This is saying that, after size medium and above, this will take up 4 units of 12-->                                */}
                    {/* <img  alt="" className = "d-flex justify-content-center mb-4 img-fluid mb-4 mt-3 offset-1 rounded" src={this.teacherPic(item.lessonTeacher)}/>   */}
                    <div className="row">
                        <img  alt="" className = "d-flex justify-content-center mb-4 img-fluid mb-4 mt-3 offset-1 rounded" src={this.props.item.lessonImage}/>  
                        {/* <img  alt="" className = "mx-auto d-block mb-4 mt-3 rounded" src={item.lessonImage.replace('/upload','/upload/w_900,h_900,c_thumb')} style = {imgStyle}/>   */}
                        <h2 className = "d-flex justify-content-center text-center mb-4 offset-1">{this.props.item.lessonTeacher}</h2>  
                    </div>                           
                </div>
                <div className="col-md-5 offset-1">
                    <div className="card-body mb-5">
                        {/* <h5 className="card-title mb-3 mt-3"> {this.props.item.lessonType} {this.props.item.lessonLevel} </h5> */}
                        <h5 className="card-title mb-3 mt-3"> {this.props.item.lessonName}</h5> <hr />
                        <p className ="card-text text-muted">
                            <small>{this.props.item.lessonType} {this.props.item.lessonLevel}</small>
                        </p>
                        <p className="card-text"> {this.props.item.lessonDescription} </p> <br />
                        <h6 className="card-text d-flex justify-content-end text-center"> {weekday[new Date(this.props.item.lessonStartDate.replace("T00:00:00.000Z","")).getDay()]} {[new Date(this.props.item.lessonStartDate.replace("T00:00:00.000Z","")).getDate()]}  {month[new Date(this.props.item.lessonStartDate.replace("T00:00:00.000Z","")).getMonth()]} {[new Date(this.props.item.lessonStartDate.replace("T00:00:00.000Z","")).getFullYear()]}   </h6>
                        <h6 className="card-text d-flex justify-content-end text-center"> {this.props.item.lessonStartTime.replace(" PM","")} -  {parseInt(this.props.item.lessonStartTime.replace(" PM",""))+this.props.item.lessonLength+":00 PM"}</h6>
                            {/* <small className = "text-muted">  {this.props.item.lessonStartDate.replace("T00:00:00.000Z","")}  </small> <br></br> */}
                            {/* <small className = "text-muted">  {this.props.item.lessonStartTime.replace(" PM","")} -  {parseInt(this.props.item.lessonStartTime.replace(" PM",""))+this.props.item.lessonLength+":00 PM"} </small> */}
                                                           
                    </div>       
                </div>          
               
                <div className="col-2" style={this.props.currentPageTeacherMyClasses}>
                    <div className="row position-absolute bottom-0">
                        <div className="col-1 pb-2"><a className="btn btn-secondary" href={"/teacher/classes/edit/:"+this.props.item._id}>Edit</a></div>
                        {/* <div className="col-1 pb-2"><Lesson lesson={item} key={item._id}/></div> */}
                        
                        <div className="col-1 offset-3 mr-3 pr-3 pb-2">                                                
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Delete
                            </button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to delete this lesson?</h5>
                                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Students who are currently enrolled will be notified and automatically refunded.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <a className="btn btn-secondary" href="#" data-bs-dismiss="modal" onClick ={function (){this.props.deleteLesson(this.props.item._id)}}>Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>     
               
                {/* <div className="col-2" style={currentPageTeacher}>
                    <div className="row position-absolute bottom-0">                        
                    </div>
                </div>      */}

                <div className="col-2" style={this.props.currentPageStudent}>
                    <div className="row position-absolute bottom-0">                   
                        
                        <div className="col-2 offset-3 mr-3 pr-3 pb-2">   
                        
                            {this.currentStudentIsLoggedIn(this.props.item)}                                                       
                                                      
                           
                            {/* <div class="modal fade" id="signinModal" tabindex="-1" role="dialog" aria-labelledby="signinModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="signinModalLabel">Wait! Sign in first!</h5>
                                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            You must be logged in to join this class!
                                        </div>
                                        <div class="modal-footer">
                                            <a className="btn btn-secondary" href="/student/signup">Log in / Sign up</a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </div>        
                        <h7 className="mt-3 text-muted card-text d-flex justify-content-end text-center pe-3 pb-1">Students: {this.props.item.lessonEnrolled.length} /  {this.props.item.lessonSize} </h7> 
                    </div>
                </div>            

            </div>
            {/* <div style = {enrolCount}>
              {this.props.item.lessonEnrolled.length}
            </div> */}
            
            {/* <div className="col-1 position-absolute bottom-0 end-0 pb-3"><a className="btn btn-secondary" href="#" onClick ={()=>{this.deleteLesson(item._id)}}>Edit</a></div> */}
            {/* <div className="col-1 position-absolute bottom-0 end-0 pb-3"><a className="btn btn-secondary" href="#">Join</a></div> */}
        </div>
    )
    }
}

// export default LessonCard