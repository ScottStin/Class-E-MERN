const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const StudentSchema = mongoose.Schema({
    studentName: {
        type: String,
    },
    studentEmail:{
        type: String,
    },
    studentPassword:{
        type: String,
    },
    studentCountry: {
        type: String,
        // enum: 
        // required: true,
    },
    // teacherPic:[ImageSchema],
    studentPic:{
        url:String,
        filename:String
    },
    studentLevel:{
        type: String,
        enum: ["A1","A2","B1","B2","C1","C2"]
    },
    isStudent:{
        type:Boolean
    }
   
}, {
    timestamps: true
})

module.exports = mongoose.model('StudentrModel', StudentSchema)
