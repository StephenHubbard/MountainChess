const path = require('path');

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

app.use( express.static( `${__dirname}/../build` ) );

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`))


// SOCKETS
const io = socket(server)

let loggedInUsers = []
let limitUsers = []
let connectedUsers = {}

io.on('connection', socket => {

    
    // * GAME SOCKETS

    socket.on('new game', data => {
        socket.join(`${data.g_id}`)
        console.log(`User has joined game ${data.g_id}`)
        
    })

    socket.on('new move', data => {
        // console.log(`new move on game ${data.g_id}`)
        io.to(data.g_id).emit('game response', data)
    })

    socket.on('update user', data => {
        io.to(data.g_id).emit('update user incoming', data)
    })

    // USER PRESENCE SOCKETS 

    socket.on('online', data => {
        socket.join(data.room)
        console.log(`user ${data.username} has connected to socket '${data.room}'.`)
        let newUser = {username: data.username, portrait: data.profile_img}
        limitUsers.indexOf(data.username) === -1 ? limitUsers.push(data.username) & loggedInUsers.push(newUser) : console.log("user already logged in one")
        socket.broadcast.emit('all online users', loggedInUsers)
        connectedUsers[data.username] = socket.id
    })

    // * CHALLENGE USER SOCKETS

    socket.on('find a game', data => {
        socket.join(data.lastGame)
        console.log(`user ${data.username} has joined game room ${data.lastGame}`)
        socket.broadcast.emit('last game number', data.lastGame)
    })

    socket.on('challenge user', data => {
        
        console.log(`user ${data.challenger} has challenged ${data.challengee} to a new game`)
        socket.broadcast.emit('new game challenge', {challenger: data.challenger, challengee: data.challengee}, connectedUsers[data.challengee])
    })

    socket.on('challenge accepted', data => {
        socket.broadcast.emit('challenge was accepted', {challenger: data.challenger, challengee: data.challengee}, connectedUsers[data.challenger])
    })

    socket.on('I have friends', data => {
        socket.join(data.friend_list)
        // console.log(`user has joined friend list ${data.friend_list}`)
        io.to(data.friend_list).emit('')
    })

    // * CHAT SOCKETS

    socket.on('join game room', data => {
        socket.join(data.room)
    })

    socket.on('blast to game room', data => {
        io.to('game room').emit('room response', data)
    })

    socket.on('typing', data => {
    if (data.room !== 'global') {
            socket.to(data.room).broadcast.emit('typing')
        } else {
            socket.broadcast.emit('typing')
        }
    })

    socket.on('stopped typing', data => {
    if (data.room !== 'global') {
            socket.to(data.room).broadcast.emit('stopped typing')
        }
            socket.broadcast.emit('stopped typing')
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
app.post('/game/updateGameArray', gameCtrl.updateGameArray)
app.get('/game/getLastGame', gameCtrl.getLastGame)
app.post('/game/newGame', gameCtrl.newGame)
app.post('/game/checkGameExists', gameCtrl.checkGame)
app.post('/game/updateUsersPlaying', gameCtrl.updateUsersPlaying)

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
app.post('/api/users/user/:user_id_display', userCtrl.checkFriend)
app.post('/api/getUserFriends', userCtrl.getUserFriends)
app.get(`/api/users/:user_id_display`, userCtrl.checkIfSame)

// GETTING TOP RANKED PLAYERs & PROFILE DATA
app.get('/api/elo', userCtrl.getTopUsers)
app.post('/api/getGames', userCtrl.getMyGames)




// MASSIVE
massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log('database is connected')
    
})
.catch(err => console.log(err))


