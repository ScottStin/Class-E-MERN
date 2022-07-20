import React, { Component } from 'react'
import reactDom from 'react-dom'
import TeacherLanding from '../pages/TeacherLanding';

// function Filter({currentPageHome,currentPageExam}) {

export class Filter extends Component {
    constructor(props){
        super(props);
        this.handleFilterClick = this.handleFilterClick.bind(this)
        // this.state={filterActive:false}; 
        this.state={};       
    }

    componentDidMount(){
        if(localStorage.getItem("ClassFilter")){
            let allH4 = document.querySelectorAll("h4")
            for(let i = 0; i< allH4.length;i++){            
                if (allH4[i].innerHTML == localStorage.getItem("ClassFilter")  ){
                    allH4[i].style="color:rgba(96,169,255,1); textShadow: .5px 0.5px black; cursor: pointer"  
                } else{      
                allH4[i].style="color:black; textShadow: none; cursor: pointer"
                }          
            }   
        }
    }

    handleFilterClick = function(e){
        // {this.setState({filterActive: false})}
        // this.state.filterActive = "true"        
        localStorage.setItem("ClassFilter", e.target.innerHTML)
        console.log(localStorage.getItem("ClassFilter"))
        // this.forceUpdate()
        window.location.reload(false)
        let allH4 = document.querySelectorAll("h4")
        for(let i = 0; i< allH4.length;i++){            
            // allH4[i].className = "lessonFilterUnclicked"            
            allH4[i].style="color:black; textShadow: none; cursor: pointer"
            // console.log(active)   
            // allH4[i].className="FilterOff"
        }        
        e.target.style = "color:rgba(96,169,255,1); textShadow: .5px 0.5px black; cursor: pointer"   
        // if (e.target.id == "filter"){      
        //     console.log("Filter On")            
        //     e.target.className = "FilterOn"           
        // } else{
        //     console.log("Filter Off")                     
        // }        
    }

    render(){   
        

    const divStyle = {
        color:"rgba(96,169,255,1)",
        textShadow: "0.5px 0.5px black",
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

    return (
        <div className="text-dark bg-white mb-3 mr-3 rounded shadow">
        {/* <!-- <h2 class="d-flex justify-content-center pt-3 pb-3">Filters</h1> --> */}
            <div className="row p-3" style={this.props.currentPageHome}>                            
                <div className="col-3 text-center" ><h4 style={divStyleClicked} onClick = {this.handleFilterClick}>General English</h4></div>
                <div className="col-3 text-center"><h4 style={divStyleUnclicked}  onClick = {this.handleFilterClick}>IELTS Exam Prep</h4></div>                            
                <div className="col-3 text-center"><h4 style={divStyleUnclicked}  onClick = {this.handleFilterClick}>PTE Exam Prep</h4></div>                                  
                <div className="col-3 text-center"><h4 style={divStyleUnclicked}  onClick = {this.handleFilterClick}>Business English</h4></div>                           
            </div>
            <div className="row p-3" style={this.props.currentPageExam}>                            
                <div className="col-6 text-center" ><h4 style={divStyle}>All Exams</h4></div>
                <div className="col-6 text-center"><h4>My Exams</h4></div>                           
                                              
            </div>
        </div>
    )
    }
}

export default Filter