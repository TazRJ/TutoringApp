const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')

//Import functions/routes
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main")
const homeRoutes = require("./routes/home")
const editRoutes = require("./routes/edit")
const archiveRoutes = require("./routes/archive")

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

//Connect to Database
connectDB()

//Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//Set Routes
app.use('/', mainRoutes)
app.use('/home', homeRoutes)
app.use('/edit', editRoutes)
app.use('/archive', archiveRoutes)

//Start Server
app.listen(process.env.PORT, () => console.log(`Server is running!`));