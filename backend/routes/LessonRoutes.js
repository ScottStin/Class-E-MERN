const express = require("express");
const { json } = require("stream/consumers");
const router = express.Router();
// import ClassModel from '../config/models/classModel.js';
const LessonModel = require ('../config/models/lessonModel.js');

router.get('/home/', function (req, res) {
    LessonModel.find()
      .then(lessons => res.json(lessons))
      .catch(err => res.status(400).json('Error: ' + err));
  });


router.post('/classes/new', async function(req,res){
    try{
        console.log(req.body.lessonName)
        const lessonName = req.body.lessonName
        const lessonDescription = req.body.lessonDescription
        const lessonStartDate = req.body.lessonStartDate  
        const lessonLevel = req.body.lessonLevel  
        const lessonLength = req.body.lessonLength  
        const lessonSize = req.body.lessonSize  
        const lessonStartTime = req.body.lessonStartTime  
        const lessonType = req.body.lessonType  
        const lessonImage = req.body.lessonImage  
        const lessonTeacher = req.body.lessonTeacher  
        const newLesson = new LessonModel({
            lessonName,
            lessonDescription,
            lessonStartDate,
            lessonLevel,
            lessonLength,
            lessonSize,
            lessonStartTime,
            lessonType,
            lessonImage,
            lessonTeacher
        })
        console.log("new lesson created: "+newLesson)
        await newLesson.save()
         .then(()=>res.json('NEw Lesson Added to DB'))
         .catch(err=>res.status(400).json('Errrrrror: ' + err))

    } catch(e){
        console.log(e)        
    }
    console.log("it worked!")
})

router.route('/:id').delete((req, res) => {
    LessonModel.findByIdAndDelete(req.params.id)
      .then(() => res.json('Lesson deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//   router.route('/:id').get((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => res.json(exercise))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

  router.post('/classes/register', async function(req,res){
    try{
      //console.log(req.body.lessonId)
      const lesson = await LessonModel.findById(req.body.lessonId)
      //console.log(lesson.lessonEnrolled)
      lesson.lessonEnrolled = [...lesson.lessonEnrolled,req.body.studentEmail]
      await lesson.save()
      console.log(lesson.lessonEnrolled)     
    } catch(e){
      console.log("register error:"+e)
    }
  })

  router.post('/classes/cancelRegister', async function(req,res){
    try{
      const lesson = await LessonModel.findById(req.body.lessonId)
      console.log(lesson.lessonEnrolled)
      // lesson.lessonEnrolled = [...lesson.lessonEnrolled,req.body.studentEmail] 
      lesson.lessonEnrolled.map((item)=>{
        {if(item == req.body.studentEmail){
          console.log(lesson.lessonEnrolled[lesson.lessonEnrolled.indexOf(item)])
          lesson.lessonEnrolled.splice(lesson.lessonEnrolled.indexOf(item),1)          
        }}        
      })
      console.log("END PRODUCT:"+lesson.lessonEnrolled)
      await lesson.save()
    } catch(e){
      console.log("register cancelation error:"+e)
    }
  })

  router.route('/update/:id').post((req, res) => {
    LessonModel.findById(req.params.id)
      .then(lesson => {
        lesson.lessonName = req.body.lessonName;
        lesson.lessonDescription = req.body.lessonDescription;
        lesson.lessonLevel = req.body.lessonLevel;
        lesson.lessonSize = req.body.lessonSize;
        lesson.lessonType = req.body.lessonType;
        lesson.lessonStartTime = req.body.lessonStartTime;
        lesson.lessonLength = Number(req.body.lessonLength);
        lesson.lessonStartDate = Date.parse(req.body.lessonStartDate);
  
        lesson.save()
          .then(() => res.json('Exercise updated!'+lesson))          
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });



module.exports = router;