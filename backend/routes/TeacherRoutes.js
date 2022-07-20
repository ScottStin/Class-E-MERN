const express = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const React = require("react");
const ReactDOM = ("react-dom");
const bcrypt = require("bcrypt")
const multer = require('multer')
const {cloudinary, storage}  = require('../../cloudinary')
const upload = multer({ storage})
// const upload = multer({dest:'/uploads/'}) // this will store our photos locally instead of cloudinary

const router = require('express').Router();
let Teacher =  require ('../config/models/teacherModel.js');

//----- REGISTER WITH PASSPORT ------

// router.route('/signup').post(async (req, res) => {
//     const username = req.body.teacherName;
//     const teacherEmail = req.body.teacherEmail;
//     const teacherCountry = req.body.teacherCountry;
//     const password = req.body.teacherPassword;
//     try{
//       const newTeacher = new Teacher({teacherEmail,username});
    
//       // await newTeacher.save()
//       //   .then(() => res.json('Teacher added!'+newTeacher))
//       //   .catch(err => res.status(400).json('Error: ' + err));

//       const registeredTeacher = await Teacher.register(newTeacher, password);
//       req.login(registeredTeacher,err=>{ // here, we're loggin in the user after they register
//         if(err) console.log(err); //return next(err); // error handler      
//         console.log("Thank you for logging in" + registeredTeacher)
//         console.log("NEW USER: " + req.user) 
//         res.status(200).send(req.user)    
//         // res.locals.currentTeacherModel = req.user
//         // console.log("TEST2:"+currentTeacherModel)
 
//     })
//     } catch(e){
//       console.log(e.message)
//     }
//   });

  // ------ REGISTER MANUALLY -----------

  router.post('/signup', upload.single('teacherPic'),async (req, res) => {
    const teacherName = req.body.teacherName;
    const teacherEmail = req.body.teacherEmail;
    const teacherCountry = req.body.teacherCountry;
    const password = req.body.teacherPassword;
    const teacherPic = req.body.teacherPic;    
    
    const hash = await bcrypt.hash(password, 12)
    console.log(hash)
    const image = cloudinary.uploader.upload(teacherPic, {folder:'Class E'}, async (err, results)=>{
      // console.log("pic: "+results.filename)
      if (err) return console.log(err)
        
      const newTeacher = new Teacher({teacherName,teacherEmail,teacherCountry,teacherPassword:hash});
      newTeacher.teacherPic = {url:results.url, filename:results.public_id}
      await newTeacher.save();
      console.log("New TEacher: " + newTeacher)      
      res.status(200).send(newTeacher) 
    })
  })

// router.post('/login', passport.authenticate('local',{failureRedirect:'/signup',successRedirect: '/home'}), function(req,res){ // HEre, we're using the 'local' stratergy. we could also add a different route, as well as local, to autenticate through google or twitter.
//   console.log("welecome back: "+req.user)   
//   res.status(200).send(req.user) 
// })

router.post('/login',async (req,res) =>{
  console.log(req.body)
  const{teacherEmail,teacherPassword}=req.body
  const user = await Teacher.findOne({teacherEmail})
  console.log("FOUND: "+user)
  const validPassword = await bcrypt.compare(teacherPassword,user.teacherPassword)
  console.log(validPassword)
  if(validPassword){
    console.log("success")
    res.status(200).send(user)
  }else{
    console.log("username or password incorrect")
  }
})

router.get('/logout',function(req,res){
  req.logout();
  // req.flash('success',"Goodbye!")
})

router.get('/current',function(req,res){
  // const currentTeacher = req.user
  console.log("TEST")
  // console.log(res.locals.currentUser)
    // .then(currentTeacher => res.json(currentTeacher))
    // .catch(err => res.status(400).json('Error: ' + err));
})

  module.exports = router;