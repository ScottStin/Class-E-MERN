import react from 'react'
import reactDom from 'react-dom'

const ClassCard = ({classDetails}) => {
    
    return(
        <div className = "card mb-4 shadow-lg">
            <div className = "row">
                <div className = "col-md-4"> {/*<!--This is saying that, after size medium and above, this will take up 4 units of 12-->                                */}
                    <img  alt="" className = "d-flex justify-content-center mb-4 img-fluid mb-4 mt-3 offset-1 rounded" src={classDetails.pictureURL}/>  
                    <h2 className = "d-flex justify-content-center mb-4">{classDetails.teacherName}</h2>                             
                </div>
                <div className="col-md-7 offset-1">
                    <div className="card-body mb-5">
                        <h5 className="card-title mb-3 mt-3"> {classDetails.type} {classDetails.level} </h5>
                        <p className="card-text"> {classDetails.description} </p>
                        <p className="card-text">
                            <small className = "text-muted">  {classDetails.startDate}  </small> <br></br>
                            <small className = "text-muted">  {classDetails.startTime} - {classDetails.endTime} </small>
                        </p>                                    
                    </div>       
                </div>
                <div className="col-1 position-absolute bottom-0 end-0 pb-3"><a className="btn btn-secondary" href="#">Join</a></div>
            </div>
        </div> 
    )
}

export default ClassCard