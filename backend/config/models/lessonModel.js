// import { builtinModules } from 'module'
const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    lessonName: {
        type: String,
    },
    lessonDescription:{
        type: String,
    },
    lessonLevel: {
        type: Array,
        // enum: 
        // required: true,
    },
    lessonType: {
        type: String,
        // required: true,
    },
    lessonStartTime: {
        type: String,
        // required: true,
    },
    lessonLength: {
        type: Number,
        // required: true
    },
    lessonTeacher: {
        type: String,
        // required: true,
    },
    lessonSize: {
        type: Number,
        // required: true,
    },
    lessonStartDate: {
        type: Date,
        // required: true
    },
    lessonImage:{
        type:String
    },
    lessontimeZone: {
        type: String,
        // required: true,        
    },
    lessonEnrolled: [
        {type: String, }
    ],
    lessonAttended: [
        {type: String,}
    ],
    lessonPrice:{
        type:Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ClassModel', ClassSchema)
