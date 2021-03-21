const websocket = require('ws')

const server = new websocket.Server({
	port: 8000
})

let sockets = [];
server.on('connection', (socket)=> {
	sockets.push(socket)
	console.log("New device")
	socket.send("Hello")
	socket.on('message', (msg)=>{
		let a = JSON.parse(msg)
		console.log(a)
	})
})

