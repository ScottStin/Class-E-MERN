const mongoose = require('mongoose');
const ExamQuestionsModel = require('./examQuestionsModel')
const TeacherModel = require('./teacherModel')

const ExamSchema = new mongoose.Schema({
    examName: {
        type: String,
    },
    examCreator: {
        type: String,
    },
    examTimer: {
        type: Number,
    },
    examTopScore: {
        type: Number,
    },
    examPrice: {
        type: Number,
    },
    studentsEnrolled: [
        {
            // type: mongoose.Schema.Types.ObjectId, // this is refering to the reviewModel Schema. This links the child to the parent. For this app, we won't go the other way and link the parent to the child. However, we could just be putting a similar code into the reviewModel.js file
            // ref: 'TeacherModel'
            type: String,
         }
    ],
    studentsCompleted: [
        // {
        //     // type: mongoose.Schema.Types.ObjectId, // this is refering to the reviewModel Schema. This links the child to the parent. For this app, we won't go the other way and link the parent to the child. However, we could just be putting a similar code into the reviewModel.js file
        //     // ref: 'TeacherModel'
        //     type: String,
        //  }
        {
            student: {
                type: String,
            },
            studentEmail: {
                type: String,
            },
            dateCompleted: {
                type: String,
            },
            result:{
                type:String // this will be the student's score for this question
            }
        }
    ], 
    // examResult:[
    //     {
    //         student: {
    //             type: mongoose.Schema.Types.ObjectId, // this is refering to the reviewModel Schema. This links the child to the parent. For this app, we won't go the other way and link the parent to the child. However, we could just be putting a similar code into the reviewModel.js file
    //             ref: 'TeacherModel'
    //         },
    //         mark:{
    //             type:Number // this will be the student's score for this question
    //         }
    //     }
        
    // ],
    // examQuestions: [
    //     // {
    //     //     type: mongoose.Schema.Types.ObjectId,
    //     //     ref: 'ExamQuestionsModel'
    //     // }

    //     {
    //         examQuestionName: { // e.g. question one or section 2 essay resonse
    //             type: String,
    //         },
    //         examQuestionPrompt: { //this will be an image, text, or audio file that the creator can upload for the student to respond to. It will be optional, and the exam creator may just wish to add the prompt to the description
    //             type: String,
    //         },
    //         examQuestionDescription: { // this will be a description of the exam or instructions, or a question prompt
    //             type: String,
    //         },
    //         examQuestionResponse: { // the user's response. The object will have two key pairs, the response, and the mark (given by the teacher or given automatically)
    //             type: Object,
    //         },
    //         examQuestionAnswer:{ // this will be the answer to the question (for questions were self marking is available). Where possible, the user's response will be autmoatically asssed against the answer. If the exam creator doesn't assisgn an answer to the question, the teacher will have to mark it.
    //             type:String
    //         },
    //         examQuestionTopScore:{ // this will be the highest marks someone can achieve for this question
    //             type:Number
    //         },
    //     }
    // ]
})

module.exports = mongoose.model('ExamModel', ExamSchema)
