
// -------------------- SET UP --------------------

// ensure nodemon and mongo are installed globally if not already done so
// install git (if not already installed on machine: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
// 'npm init -y' then add "type": "module" to the package.json file
// install the VS extention 'EJS Language Support' by DigitalBrainstem (if it hasn't already been installed)
// lunch 5 windows of gitbash - one for mongo, one for nodemon, one for mongod (run mongod in the background), one for heroku (only needed when in production phase), and one for github

// create server.js file in general directory (this file)
// create backend folder:
    // config folder
        // db.js (note: import mongoose into this fle, connect to server then export)
        // models folder
    // routers folder with routes, 

// npm i: 
    //npm install express mongoose --save
    // jquery --save

// npx create-react-app frontend
// npm i axiox --save
// npm i react-router-dom
// npm i cors
// npm i jquery
// npm i passport passport-local passport-local-mongoose (authentication and autharisation) 
// npm i cookie-passer express-session connect-flash  (used for cookies, sessions and flash messages)
// npm i connec-mongo // in development mode, express-session uses a 'memory store' to store our session data. This doesn't hold a lot of information, is slow and doesn't scale well. In production mode, we'll use mongo to store our sessions. Connect-mongo helps with this.
// npmi i ejs ejs-mate //embdedded js
// npm i bcrypt (only using becuase passport authentication for login isn't working with react for some reason)
// npm i multer // this will be used to upload forms with mulitpart types (e.g. upload out images to cloudinary)
// npm i dotenv (used to hide credintials for APIs and servrices like AWS and Cloudanary, so we can use them in our app but if someone looks at our code they don't see our login details)
// npm i cloudinary multer-storage-cloudinary (used to store photos aand other large files)

// add "proxy": "http://localhost:3000" to react package.json file (this needs to be different from the server you connect to in the app. In the app we'kk use 5000).
// open up nodemon and run your server.js file. Run mongod as well. Then, in another terminal, cd into frontend folder and run npm start. We'll run nodemon on port 5000 and npm start on 3000

// -------------------- DEVELOPMENT or PRODUCTION MODE --------------------

if(process.env.NODE_ENV !=="production"){ // before we launch our app, we will work in development mode. During this phrase, this line of code will ensure we get our login details for APIs and services like AWS, Cloudanary from the .env file. 
    require('dotenv').config();
}

// -------------------- REQUIRE NODE PACKAGES --------------------

const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoDBStore = require("connect-mongo")//(session); // the (session) syntax is only used for older versions of connect-mongo
const ejsMateEngine = require('ejs-mate'); // this will be used to create boilerplates that can be used intead of partials.
const path = require('path'); // note, ejs will only run if the active folder in the terminal contains the views folder. // If we want this to work from different directories, we are going to require this 'path' module from express.
const { join } = require('path');
const bcrypt = require('bcrypt'); // we're using this for manual authentication because login with passport.js isn't working for some reason
const multer = require('multer')

// -------------------- CONNECTING TO MONGO SERVER --------------------

const databaseName='classeMernDB';
const connectDB = async () => {
    try {
        //database Name
        // const databaseName='classeMernDB';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

// -------------------- GENERAL EXPRESS SETUP --------------------

//import userRouters from './backend/routes/userRoutes.js'
const express = require("express");
const cors = require ('cors')

connectDB()

const app = express()
app.use(cors())
app.use(express.json());

const PORT = 5000 // || process.env.PORT

//----------------------  REQURING MODELS ------------------------------------

const TeacherModel = require('./backend/config/models/teacherModel');
const StudentModel = require('./backend/config/models/studentModel');
const LessonModel = require('./backend/config/models/lessonModel');
const ExamModel = require('./backend/config/models/examModel');
const ExamQuestionsModel = require('./backend/config/models/examQuestionsModel');

// -------------------- COOKIES, SESSIONS, PASSPORT (AUTHENTICATION and AUTHORISATION) AND FLASH  --------------------

const secretKey =  'placeHolderKey' //|| process.env.SECRET; // process.env.SECRET is used for production and 'placeHolderKey' is used for development

const store =  MongoDBStore.create({ // here, we're using mongo-connect (see our require section) to store our sessions during production
    mongoUrl:`mongodb://127.0.0.1:27017/${databaseName}`, // note, this DB URL, which will be used for our production mode, is generator by mongo cloud atlas through the 'connect ->connect your application' feature on our cloud.mongodb dashboard. 
    secret: secretKey, // see above for this
    touchAfter: 24*60*60 // this will make sure the data isn't continuously updated everytime a user refresher the page. We only make updates if something has changed. Here, we're only updating every 24 hours. UNlike session config, this is in seconds, not ms.
});

store.on("error",function(e){
    console.log("STORE ERROR:",e)
})

const sessionConfig = {
    store:store, // this is used in production to make sure our sessions are stored on mongo DB (see above)
    name: 'mySession', // note, the default cookie name for the user's session ID is connect.sid (or something similar). We don't want to use a generic default, because it makes it easier for hackers to search for that cookie, extract it and log in as the user. For an extra layer of secruity, we've changed the default session cookie name here. Instead of mySession, we can use anything.
    secret: secretKey, // see above for this
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,// extra layer of secruity
        //secure:true, // this will mean that the cookie only works over https (not local host). Because lcoal host is not HTTPS, we don't add this until after development has finished and we're ready to deploy.
        expires:Date.now() + (1000 * 60 * 60 * 24 * 7), // this is in miliseconds (unlike mongoseDBstore above, which is in seconds)
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session()); // this should always be AFTER app.use(session(sessionConfig))
// passport.use(new LocalStrategy(TeacherModel.authenticate()));

// passport.serializeUser(TeacherModel.serializeUser());
// passport.deserializeUser(TeacherModel.deserializeUser());

// app.use(function(req,res,next){
//     res.locals.currentTeacherModel = req.user;// this will give us access to the current user in all templates, so we can see if someone is loggedin and change our page accordingly.
//     // res.locals.success = req.flash('success')
//     // res.locals.error = req.flash('error')
//     // res.locals.update = req.flash('update')
//     // res.locals.remove = req.flash('remove')
//     next();
// })

// -------------------- IMPORTING ROUTES --------------------

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from Express!" });
// });

const lessonRouter = require ('./backend/routes/LessonRoutes.js')
const teacherRouter = require ('./backend/routes/TeacherRoutes.js')
const studentRouter = require ('./backend/routes/StudentRoutes.js')
const examRouter = require ('./backend/routes/ExamRoutes')

app.use('/teacher',lessonRouter)
app.use('/teacher',teacherRouter)
app.use('/student',studentRouter)
app.use('/exams',examRouter)

//// app.use('/lessons',lessonRouter)

// --------------------------- EJS ENGINE SETUP ----------------

// -------------------- EJS ENGINE SETUP --------------------

app.engine('ejs', ejsMateEngine)
app.set('src', path.join(__dirname, '/src')); // this, along with the 'require path' code above, will allow us to run code in a director different from where the 'views' folder is saved. It's not 100% necessary becuase we usually always work in the views folder, but it is best practice.
app.set('view engine','ejs'); // for  ejs to work, it needs to be saved in a folder within the project folder called 'views'. we then need to create a file called 'home.ejs'

// ------------------------- LSITENING -------------------------

app.listen(PORT, console.log(`Your app is running on port ${PORT}`))

// app.get('/',function(req,res){
//     res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
// })

