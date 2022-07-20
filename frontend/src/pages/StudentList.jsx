import React, { Component } from 'react'
import axios from 'axios'
import {FaMobileAlt} from "react-icons/fa"
import {FaMailBulk} from "react-icons/fa"
import {FaStar} from "react-icons/fa"
import {FaGlobeAmericas} from "react-icons/fa"

export default class StudentList extends Component {
    constructor(props){        
        super(props);
        this.handleStudentLevel = this.handleStudentLevel.bind(this)
        this.handleLevelSubmit = this.handleLevelSubmit.bind(this)
        this.studentLevelRadioChange = this.studentLevelRadioChange.bind(this)
        this.test = this.test.bind(this)
        this.state={students:[],studentLevel:""};
    }

    componentDidMount(){ 
        axios.get('http://localhost:5000/student')
        .then(response=>{
            this.setState({students:response.data})
            console.log(this.state.students)
        })
        .catch((error)=>{
            console.log(error)
            console.log("did not mount")
        })
    }

    test(item){
        console.log(item.item.item.studentEmail)
        console.log(this.state.students)
        console.log(this.state.students.findIndex(object => {return object.studentEmail == item.item.item.studentEmail;}))
    }

    handleLevelSubmit(item){
        //console.log(item)
        const updatedStudent = {...item, studentLevel:this.state.studentLevel}
        console.log(updatedStudent)
        axios.post('http://localhost:5000/student/setlevel',updatedStudent)
        window.location.reload(false) 
    }
    
    handleStudentLevel (linkStyle,item){
        console.log(item.item.studentLevel)
        if (typeof item.item.studentLevel=="undefined"){
            return <div><a className = "text-muted" href="#" style={linkStyle} data-bs-toggle="modal" data-bs-target={"#exampleModal"+this.state.students.findIndex(object => {return object.studentEmail == item.item.studentEmail;})}>  <FaStar/> Set level...</a> </div>
        } else if( typeof item.item.studentLevel!=="undefined"){
            return <div className = "text-muted" ><FaStar/> {item.item.studentLevel}</div> 
        }
    }

    studentLevelRadioChange(e){
        this.setState({studentLevel:e.target.value},()=>{
        console.log(this.state.studentLevel)})       
    }

  render() {

    const imgStyle = {
        borderRadius:"50%",
        width:"100%",
        height:"100%",
    }

    const linkStyle ={ 
        // color: "black",
        textDecoration:"none"
     }
    
    return (
        <div>
            <div className="row ms-4">                            
                <input class="form-control mr-sm-2 shadow" type="search" placeholder="Search" aria-label="Search"/>                                                            
            </div>
            {this.state.students.map((item)=>(
            <div className = "container text-dark bg-white rounded shadow p-4 m-4">
                <div className="row">
                    <div className="col-4">
                    <img className = "mx-auto d-block" src={item.studentPic.url.replace('/upload','/upload/w_900,h_900,c_thumb,c_crop,g_face')} alt="Student Profile Picture" style = {imgStyle}/>
                    </div>
                    <div className="col-7 offset-1">
                        <h2>{item.studentName}</h2> <hr />
                        <p className = "text-muted"> <FaMailBulk/> {item.studentEmail} </p>
                        <p className = "text-muted"> <FaMobileAlt/> 047777777 </p>
                        {/* <p className = "text-muted"> <FaGlobeAmericas/> Japan</p> */}
                        <p className = "text-muted"> <FaGlobeAmericas/> {item.studentCountry}</p>
                        {this.handleStudentLevel({linkStyle},{item})}

                        <div class="modal fade" id={"exampleModal"+this.state.students.findIndex(object => {return object.studentEmail == item.studentEmail;})} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id={"exampleModalLabel"}>Set Level for {item.studentName}:</h5>
                                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <label for="classLevel"><h6>Level</h6></label>        
                                        <div class = "form-check" id = "classLevel">                    
                                            <input class="form-check-input" type="radio" value="A1" id="A1" name="flexRadioDefault" onChange={this.studentLevelRadioChange}/>                                       
                                            <label class="form-check-label mb-1" for="A1">Beginner (A1)</label>
                                        </div>
                                        <div class = "form-check" id = "classLevel">
                                            <input class="form-check-input" type="radio" value="A2" id="A2" name="flexRadioDefault" onChange={this.studentLevelRadioChange}/>
                                            <label class="form-check-label mb-1" for="A2">Lower-Intermediate (A2)</label>
                                        </div>
                                        <div class = "form-check" id = "classLevel">
                                            <input class="form-check-input" type="radio" value="B1" id="B1" name="flexRadioDefault" onChange={this.studentLevelRadioChange}/>
                                            <label class="form-check-label mb-1" for="B1">Intermediate (B1)</label> 
                                        </div>
                                        <div class = "form-check" id = "classLevel">
                                            <input class="form-check-input" type="radio" value="B2" id="B2" name="flexRadioDefault" onChange={this.studentLevelRadioChange}/>
                                            <label class="form-check-label mb-1" for="B2">Upper-Intermediate (B2)</label> 
                                        </div>
                                        <div class = "form-check" id = "classLevel">
                                            <input class="form-check-input" type="radio" value="C1" id="C1" name="flexRadioDefault" onChange={this.studentLevelRadioChange}/>
                                            <label class="form-check-label mb-1" for="C1">Advanced (C1)</label> 
                                        </div>  
                                        <button class= "btn btn-secondary mt-3 close" data-bs-dismiss="modal" onClick = {()=>this.handleLevelSubmit({item})}>Submit</button>                                      
                                    </div>                 
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>                
            </div>
            ))}
        </div>
    )    
  }
}
