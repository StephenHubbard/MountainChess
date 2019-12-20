require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authCtrl = require('./authController');
const portraitsCtrl = require('./portraitsController');
const userCtrl = require('./userController')
const gameCtrl = require('./gameController');
const massive = require('massive');
const socket = require('socket.io')

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

const app = express()

const server = app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`))

// SOCKETS
const io = socket(server)

let loggedInUsers = []
let limitUsers = []

io.on('connection', socket => {

    // console.log('socket connected')
    
    // * GAME SOCKETS

    socket.on('new game', data => {
        socket.join(`${data.g_id}`)
        console.log(`User has joined game ${data.g_id}`)
    })

    socket.on('new move', data => {
        console.log(`new move on game ${data.g_id}`)
        io.to(data.g_id).emit('game response', data)
    })

    // USER PRESENCE SOCKETS 

    socket.on('online', data => {
        socket.join(data.room)
        console.log(`user ${data.username} has connected to socket '${data.room}'.`)
        let newUser = {username: data.username, portrait: data.profile_img}
        // console.log(newUser)
        // console.log(loggedInUsers.indexOf(newUser))
        limitUsers.indexOf(data.username) === -1 ? limitUsers.push(data.username) & loggedInUsers.push(newUser) : console.log("user already logged in one")
        // limitUsers.indexOf(data.username) === -1 ? loggedInUsers.push(newUser) : console.log("user already logged in two")
        socket.broadcast.emit('all online users', loggedInUsers)
    })

    // * CHALLENGE USER SOCKETS

    socket.on('find a game', data => {
        socket.join(data.lastGame)
        console.log(`user ${data.username} has joined game room ${data.lastGame}`)

    })

    socket.on('challenge user', data => {
        console.log(`user ${data.challenger} has challenged ${data.challengee} to a new game`)
    })

    socket.on('I have friends', data => {
        socket.join(data.friend_list)
        // console.log(`user has joined friend list ${data.friend_list}`)
        io.to(data.friend_list).emit('')
    })
})

// END SOCKETS


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
app.get('/game/getLastGame', gameCtrl.getLastGame)


// REGISTERING, LOGGING IN AND LOGGING OUT
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/getUser', authCtrl.getUser)

//BROWSING AND CHANGING PROFILE PICTURES
app.get('/api/portraits', portraitsCtrl.getPortraits)
app.put('/api/portraits', portraitsCtrl.updatePortrait)

// FRIENDS LIST USERS 
app.get('/api/users', userCtrl.getUser)
app.get('/api/user', userCtrl.findUser)
app.post('/api/addfriend/:user_id_display', userCtrl.addFriend)
app.get('/api/users/user/:user_id_display', userCtrl.checkFriend)

// MASSIVE
massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log('database is connected')
    
})
.catch(err => console.log(err))

