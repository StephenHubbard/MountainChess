require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authCtrl = require('./authController');
const portraitsCtrl = require('./portraitsController');
const massive = require('massive');
const {SERVER_PORT, SESSION_SECRET} = process.env;

const app = express()

app.use(require("body-parser").text())

// TOP-LEVEL MIDDLEWARE
app.use(express.json());

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

// **** ENDPOINTS ****

// REGISTERING, LOGGING IN AND LOGGING OUT
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/getUser', authCtrl.getUser)

//BROWSING AND CHANGING PROFILE PICTURES
app.get('/api/portraits', portraitsCtrl.getPortraits)
app.put('/api/portraits', portraitsCtrl.updatePortrait)

// MASSIVE
massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log('database is connected')
    app.listen(SERVER_PORT, () => 
    console.log(`Server is listening on port ${SERVER_PORT}.`))
})
.catch(err => console.log(err))