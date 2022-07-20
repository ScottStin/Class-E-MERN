import react from 'react'
import reactDom from 'react-dom'

const MainHeader = () => {
    const myHeader = "Class-E"
    return(
        <div className="text-dark bg-white mb-3 mt-4 mr-3 rounded pb-2 pt-2 shadow">
            <h1 className="display-1 text-center text-primary" id = "mainHeader"> 
                Class<span id= "mainHeadingE">E</span>
                <span id = "subHeading">Online English Classes and Courses</span>                
            </h1>  
            {/* <h1 class="d-flex justify-content-center pt-3 pb-3">Header</h1> */}
        </div>
    )
}

export default MainHeader