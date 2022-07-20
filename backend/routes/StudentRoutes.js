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
let Student =  require ('../config/models/studentModel.js');

router.get('/', function (req, res) {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/setlevel',async(req,res)=>{
  //console.log(req.body.item.studentEmail)
  //console.log(req.body.studentLevel)
  const foundStudent = await(Student.findOne({studentEmail:req.body.item.studentEmail}))
 // console.log(foundStudent.studentLevel)
  foundStudent.studentLevel = req.body.studentLevel
  //console.log(foundStudent.studentLevel)
  await foundStudent.save()
})

router.post('/signup', upload.single('studentPic'),async (req, res) => {
    const studentName = req.body.studentName;
    const studentEmail = req.body.studentEmail;
    const studentCountry = req.body.studentCountry;
    const password = req.body.studentPassword;
    const studentPic = req.body.studentPic;    
    const isStudent = req.body.isStudent;    

    const hash = await bcrypt.hash(password, 12)
    console.log(hash)
    const image = cloudinary.uploader.upload(studentPic, {folder:'Class E'}, async (err, results)=>{
    // console.log("pic: "+results.filename)
    if (err) return console.log(err)
    
    const newStudent = new Student({studentName,studentEmail,studentCountry,isStudent,studentPassword:hash});
    newStudent.studentPic = {url:results.url, filename:results.public_id}
    await newStudent.save();
    console.log("New Student: " + newStudent)      
    res.status(200).send(newStudent) 
    })
})

router.post('/login',async (req,res) =>{
  console.log(req.body)
  const{studentEmail,studentPassword}=req.body
  const user = await Student.findOne({studentEmail})
  console.log("FOUND: "+user)
  const validPassword = await bcrypt.compare(studentPassword,user.studentPassword)
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


  module.exports = router;