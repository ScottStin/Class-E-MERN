// import { builtinModules } from 'module'
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// const ImageSchema = new mongoose.Schema({ // here, we're defining the images uploaded to a bathroom as a new schema and nesting it in our other schema. However, we won't create a new model just for images. We're doing this so we can assign a virtual property (in this case, a thumbnail size image) to our images, and we can only add a virtual property to a schema
//     url: String,
//     filename: String
// })

// ImageSchema.virtual('thumbnail').get(function(){
//     return this.url.replace('/upload','/upload/w_200,h_200,c_thumb') // here, we're changing our cloudinary url to get a 200 width/width thumbail. This means that, whenever possible we can display a smaller tyhumbnail rather than loading the whole image.
// }); // we'll save this thumbnail as a virtual 


const TeacherSchema = mongoose.Schema({
    teacherName: {
        type: String,
    },
    teacherEmail:{
        type: String,
    },
    teacherPassword:{
        type: String,
    },
    teacherCountry: {
        type: String,
        // enum: 
        // required: true,
    },
    // teacherPic:[ImageSchema],
    teacherPic:{
        url:String,
        filename:String
    }
   
}, {
    timestamps: true
})

// TeacherSchema.plugin(passportLocalMongoose); // this plugs in the hased password, salt, and usdername field. to use the email for username, use: https://stackoverflow.com/questions/45250545/how-to-authenticate-via-email-rather-than-username-in-passport-js

// UserSchema.plugin(passportLocalMongoose); // this plugs in the hased password, salt, and usdername field.
module.exports = mongoose.model('TeacherModel', TeacherSchema)
