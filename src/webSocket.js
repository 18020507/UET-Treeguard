const WebSocket = require('ws');
const { Server } = require('ws');

module.exports = function (server) {
    const wss = new Server({ server });

    wss.on("connection", function connection(ws) {
        console.log("A new client Connected!");
        ws.send("Welcome New Client!");
      
        ws.on("message", function incoming(message) {
          console.log("received: %s", message);
          
          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          });
        });
      });
}


/**
 * message
 *    event: 
 *    data: 
 * 
 * 
 */