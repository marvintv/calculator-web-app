var express = require("express");
var app = express();
var port = 3700;

app.get("/", function(req, res){
    res.sendFile('views/index.html', {root: __dirname })
});

var io = require('socket.io').listen(app.listen(port));
var opStack = [];
io.sockets.on('connection', function (socket) {
    socket.emit('message', { 'operations': opStack.slice(0,10) });
    socket.on('send', function (data) {
    	if (data.operation) {
    		opStack.unshift(data.operation);
    		io.sockets.emit('message', {"operations": opStack.slice(0,10)});
    	};
        
    });
});

console.log("Listening on port " + port);