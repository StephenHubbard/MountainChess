require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authCtrl = require('./authController');
const portraitsCtrl = require('./portraitsController');
const userCtrl = require('./userController')
const gameCtrl = require('./gameController');
const massive = require('massive');
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

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


// GAME LOGIC
app.post('/game/newMove', gameCtrl.newMove)
app.post('/game/updateFen', gameCtrl.updateFen)


// REGISTERING, LOGGING IN AND LOGGING OUT
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/getUser', authCtrl.getUser)

//BROWSING AND CHANGING PROFILE PICTURES
app.get('/api/portraits', portraitsCtrl.getPortraits)
app.put('/api/portraits', portraitsCtrl.updatePortrait)

// GETTING FRIENDS LIST USERS 
app.get('/api/users', userCtrl.getUser)

// MASSIVE
massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log('database is connected')
    app.listen(SERVER_PORT, () => 
    console.log(`Server is listening on port ${SERVER_PORT}.`))
})
.catch(err => console.log(err))

