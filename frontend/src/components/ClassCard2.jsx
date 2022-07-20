import React, { Component } from 'react'
import axios from 'axios';
import { PromiseProvider } from 'mongoose';


const Lesson = props => ( // note, this is a functional component not a class components because it doesn't need state
  <tr>
    <td>{props.lesson.name}</td>
    <td>{props.lesson.description}</td>   
  </tr>
)

export class homePage2 extends Component {
    constructor(props){
        super(props);
        this.deleteLesson = this.deleteLesson.bind(this)
        this.state={lessons:[]};

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
    return(
      <div>
        {this.state.lessons.sort((a, b) => a.lessonStartDate > b.lessonStartDate ? 1 : -1).map((item)=>( 
          <div className = "card mb-4 shadow-lg">
            <div className = "row">
                <div className = "col-md-4"> {/*<!--This is saying that, after size medium and above, this will take up 4 units of 12-->                                */}
                    {/* <img  alt="" className = "d-flex justify-content-center mb-4 img-fluid mb-4 mt-3 offset-1 rounded" src={this.teacherPic(item.lessonTeacher)}/>   */}
                    <img  alt="" className = "d-flex justify-content-center mb-4 img-fluid mb-4 mt-3 offset-1 rounded" src={item.lessonImage}/>  
                    <h2 className = "d-flex justify-content-center mb-4">{item.lessonTeacher}</h2>                             
                </div>
                <div className="col-md-7 offset-1">
                    <div className="card-body mb-5">
                        <h5 className="card-title mb-3 mt-3"> {item.lessonType} {item.lessonLevel} </h5>
                        <p className="card-text"> {item.lessonDescription} </p>
                        <p className="card-text">
                            <small className = "text-muted">  {item.lessonStartDate}  </small> <br></br>
                            <small className = "text-muted">  {item.lessonStartTime} - {item.lessonLength} </small>
                        </p>                                    
                    </div>       
                </div>
                {/* <div className="col-1 position-absolute bottom-0 end-0 pb-3"><a className="btn btn-secondary" href="#" onClick ={()=>{this.deleteLesson(item._id)}}>Edit</a></div> */}
                {/* <div className="col-1 position-absolute bottom-0 end-0 pb-3"><a className="btn btn-secondary" href="#">Join</a></div> */}
            </div>
          </div> 
        ))}
      </div>
    
      // <div className = "card mb-4 shadow-lg">
      //     <div className = "row">
      //         <div className = "col-md-4"> {/*<!--This is saying that, after size medium and above, this will take up 4 units of 12-->                                */}
      //             <img  alt="" className = "d-flex justify-content-center mb-4 img-fluid mb-4 mt-3 offset-1 rounded" src=""/>  
      //             <h2 className = "d-flex justify-content-center mb-4">{this.state.lessons[48].lessonName}</h2>                             
      //         </div>
      //         <div className="col-md-7 offset-1">
      //             <div className="card-body mb-5">
      //                 <h5 className="card-title mb-3 mt-3"> {this.state.lessons[46].lessonType} {this.state.lessons[46].lessonLevel} </h5>
      //                 <p className="card-text"> {this.state.lessons[46].lessonDescription} </p>
      //                 <p className="card-text">
      //                     <small className = "text-muted">  {this.state.lessons[46].lesssonStartDate}  </small> <br></br>
      //                     <small className = "text-muted">  {this.state.lessons[46].lessonStartTime} - {this.state.lessons[46].lessonLength} </small>
      //                 </p>                                    
      //             </div>       
      //         </div>
      //         <div className="col-1 position-absolute bottom-0 end-0 pb-3"><a className="btn btn-secondary" href="#">Join</a></div>
      //     </div>
      // </div> 
  )
  }
}

export default homePage2