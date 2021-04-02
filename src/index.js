const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const pageRouter = require("./routes.js");
const app = express();
app.use(express.static("public"));
// app.use(morgan("tiny"));
require("dotenv").config();
const server = require("http").createServer(app);
// const WebSocket = require("ws");
// const wss = new WebSocket.Server({ server: server });
const ws = require('./webSocket');
ws(server);




app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded({ extended: false }));

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Routers
app.use("/api", pageRouter);

// Errors => page not found 404
app.use((req, res, next) => {
  res.sendFile(path.resolve('public/index.html'));
});


// Setting up the server
server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}...`);
});

module.exports = app;
