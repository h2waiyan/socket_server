const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const { Server } = require("socket.io");
const cors = require("cors");

var server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
 

const hostname = '0.0.0.0';
const prot = 5000;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('hi');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (msg) => {

    io.emit('message', "Hi");
    console.log('message: ' + msg);
  });
});

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    res.setHeader('Content-Type', 'application/json');
    next();
  });

app.get('/',(req,res)=>{
    res.send({
        message:"server started."
    })
})


server.listen(prot,hostname,()=>{
    
    console.log(`Server running at ${hostname}:${prot}`);
})