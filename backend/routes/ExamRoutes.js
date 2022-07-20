const express = require("express");
const { json } = require("stream/consumers");
const router = express.Router();
// import ClassModel from '../config/models/classModel.js';
const ExamModel = require ('../config/models/examModel');
const ExamQuestionsModel = require ('../config/models/examQuestionsModel');
const TecherModel = require ('../config/models/teacherModel');

router.get('/', function (req, res) {
    ExamModel.find()
      .then(exams => res.json(exams))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.get('/questions/:parentExamRef', async function (req, res) {
    const newReq = JSON.parse(req.params.parentExamRef)
    if(newReq.student!=="undefined"){
        try{
            // const newReq = JSON.parse(req.params.parentExamRef)
           // console.log(newReq.student)
            const foundQuestions = await ExamQuestionsModel.find({parentExamRef:newReq.exam})
            //console.log(foundQuestions)
            let studentResponses =[]
            for (let i =0; i < foundQuestions.length;i++){
                // console.log(foundQuestions[i].examQuestionMark.filter(obj => {return obj.studentEmail == newReq.student}))
                studentResponses = [...studentResponses,foundQuestions[i].examQuestionMark.filter(obj => {return obj.studentEmail == newReq.student})]        
            }  
            for (let i =0; i < studentResponses.length;i++){
                studentResponses[i] = {...studentResponses[i],examQuestionName:foundQuestions[i].examQuestionName,examQuestionPrompt:foundQuestions[i].examQuestionPrompt,parentExamRef:foundQuestions[i].parentExamRef,examQuestionDescription:foundQuestions[i].examQuestionDescription}
            }                     
            console.log(studentResponses)
           res.status(200).send(studentResponses) 
        } catch(e){
            console.log(e)        
        }
    } else{
        try{
            // console.log("FOUND EXAAM: "+newReq.exam)
            const foundQuestions = await ExamQuestionsModel.find({parentExamRef:newReq.exam})
            // .then(()=>res.json('Found Questions: '+foundQuestions))
            res.status(200).send(foundQuestions) 
            // console.log(foundQuestions)
        } catch(e){
            console.log(e)        
        }
    }
  });

router.post('/new', async function(req,res){
    try{
        console.log(req.body)
        const examName = req.body.examName
        const examTimer = req.body.examTime
        const examPrice = req.body.examPrice
        const examQuestions = req.body.examQuestionArray
        const newExam = new ExamModel({
            examName,
            examTimer,
            examPrice
            // examQuestions,
        })
        console.log("new exam created: "+newExam)
        await newExam.save()
         .then(()=>res.json('New Exam Added to DB'))
         .catch(err=>res.status(400).json('Errrrrror: ' + err))

    } catch(e){
        console.log(e)        
    }
    console.log("it worked!")
})

router.post('/new/question', async function(req,res){
    try{
        const exam = await ExamModel.find({examName: req.body.examName})
        console.log("FOUND EXAM: "+exam)
        const examQuestionName = req.body.questionName
        const examQuestionPrompt = req.body.questionPrompt
        const examQuestionDescription = req.body.questionDescription
        const parentExam = await ExamModel.find({examName: req.body.examName})
        const parentExamRef =  req.body.examName
        // const examQuestions = exam.examQuestions.push(req.body.newQuestion)       
        const newQuestion = new ExamQuestionsModel ({
            examQuestionName,
            examQuestionPrompt,
            examQuestionDescription,
            // parentExam,
            parentExamRef            
        })
        // console.log("new question created: "+newQuestion)
        // exam.examQuestions=[...exam.examQuestions,newQuestion]
        // exam.examQuestions.push(newQuestions);        
        // exam.examQuestions = newQuestion; 
        console.log("NEW FULL EXAM: "+newQuestion)       
        await newQuestion.save()
        // await exam.save()
         .then(()=>res.json('New Question Added to DB'))
         .catch(err=>res.status(400).json('Errrrrror: ' + err))

    } catch(e){
        console.log(e)        
    }
    console.log("it worked!")
})

router.post('/new/studentresponse', async function(req,res){
    try{
        //--- this will get the data from the client and search our db for the correct exam --- 

        // const examQuestionMark = (req.body)
        // const examQuestionMark = {
        //     student:req.body.student,
        //     studentEmail:req.body.studentEmail,
        //     examQuestionResponse:req.body.examQuestionResponse.response
        // }
        // console.log("NEW RESPONSE :"+examQuestionMark)
        //const teacher = await TecherModel.find({teacherName: "Carol Doyle"}) // this needs to be updated to student
        const exam = await ExamModel.find({examName:req.body.parentExamRef})
        
        //-- this will loop through the exam questions and add the responses

        for(let i =0;i<req.body.examQuestionResponse.length;i++){
            let addExamQuestionResponse = {
                student:req.body.student,
                studentEmail:req.body.studentEmail,
                examQuestionResponse:req.body.examQuestionResponse[i].response
            }
            const examQuestion = await ExamQuestionsModel.find({examQuestionName:req.body.examQuestionResponse[i].question, parentExamRef:req.body.parentExamRef})
            //console.log("PRE-SPREAD: " + examQuestion[0].examQuestionMark)
            examQuestion[0].examQuestionMark = [...examQuestion[0].examQuestionMark,addExamQuestionResponse]
            console.log(examQuestion[0])
            console.log("POST-SPREAD: " + examQuestion[0].examQuestionMark )
            await examQuestion[0].save()
        }
        // const examQuestion = await ExamQuestionsModel.find({examQuestionName:"fsdfdsfsfdf1", examName:"Test Exam 1"})
        // console.log("PRE-SPREAD: " + examQuestion[0].examQuestionMark)
        // examQuestion[0].examQuestionMark = [...examQuestion[0].examQuestionMark,examQuestionMark]
        // console.log("POST-SPREAD: " + examQuestion[0].examQuestionMark )
        // await examQuestion[0].save()

        // --- this will add the student details to the 'completed' list of the exam ---
        const student = req.body.student
        const studentEmail = req.body.studentEmail
        const dateCompleted = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
        // const dateCompleted = "12/02/2022"
        const newComplete = {
            studentEmail,
            dateCompleted,
            student
        }
        // exam[0].studentsCompleted = [...exam[0].studentsCompleted,req.body.studentEmail]  // here, we need to change the students complete field in the exam scheme to be a model with email and student name and date completed. We should then save it as an object in this route and spread that object into the array      
        exam[0].studentsCompleted = [...exam[0].studentsCompleted,newComplete]  
        await exam[0].save()
        console.log(exam[0].studentsCompleted)
    }catch(e){
        console.log(e)        
    }
})

router.post('/new/teacherfeedback', async function(req,res){
    // console.log(req.body.parentExamRef)
    // console.log(req.body.teacherFeedback)

    // ---first let's add the final mark to the exam model:---

    const exam = await ExamModel.find({examName:req.body.parentExamRef})
    console.log(exam[0].studentsCompleted.filter(obj => {return obj.studentEmail == req.body.studentEmail})[0].result)
    exam[0].studentsCompleted.filter(obj => {return obj.studentEmail == req.body.studentEmail})[0].result = req.body.mark
    await exam[0].save()
    console.log(exam[0].studentsCompleted.filter(obj => {return obj.studentEmail == req.body.studentEmail})[0].result)

    // --- then we'll add the teacher's feedback to the examQuestionsModel for each individual answer:---
    for (let i=0; i<req.body.teacherFeedback.length;i++){
        examQuestion = await ExamQuestionsModel.find({examQuestionName:req.body.teacherFeedback[i].question, parentExamRef:req.body.parentExamRef})         
        examQuestion[0].examQuestionMark.filter(obj => {return obj.studentEmail == req.body.studentEmail})[0].comments = req.body.teacherFeedback[i].comment
        // examQuestion[0].examQuestionMark.filter(obj => {return obj.studentEmail == req.body.studentEmail})[0].mark = req.body.mark
        console.log(examQuestion[0].examQuestionMark.filter(obj => {return obj.studentEmail == req.body.studentEmail})[0])
        await examQuestion[0].save()       
    }   
})

router.route('/delete/:id').delete(async function(req, res) {
    console.log(req.params)
    const foundExam = await ExamModel.findById(req.params.id)
    //console.log(foundExam.examName)
    //const foundQuestions = await ExamQuestionsModel.find({parentExamRef:foundExam.examName})
    //console.log(foundQuestions)
    await ExamQuestionsModel.deleteMany({parentExamRef:foundExam.examName})
    await ExamModel.findByIdAndDelete(req.params.id)
      .then(() => res.json('Lesson deleted: '+req.params.id))
     .catch(err => res.status(400).json('Error: ' + err));     
  });

//   router.route('/delete').delete((req, res) => {
//     console.log("fired")
//     ExamModel.deleteMany()
//       .then(() => res.json('Lesson deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

module.exports = router;