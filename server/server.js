const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

var {generateMessage} = require('./utils/message')

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
	console.log('New user connected')
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
		socket.broadcast.emit('newMessage', generateMessage('Admin', `New user joined`))
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});

	socket.on('createMessage', (newMessage, callback) =>{
		console.log('Message', newMessage)

		io.emit('newMessage', generateMessage(newMessage.from, newMessage.text))
		callback('callback')
		// socket.broadcast.emit('newMessage', {
		// 	from: newMessage.from,
		// 	text: newMessage.text,
		// 	createdAt: new Date().getTime()
		// })
	})

	// socket.emit('newMessage', {
	// 	from: 'mike',
	// 	text: 'Some text',
	// 	createdAt: 1234
	// })
})

server.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})