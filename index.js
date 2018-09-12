let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let Redis = require('ioredis');
let redis = new Redis();

var port = process.env.PORT || 3001;

http.listen(port, function(){
    console.log('listening in http://localhost:' + port);
});

function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.end('');
}

io.on('connection', (socket) => { });

redis.psubscribe('*', function(err, count) { });

redis.on('pmessage', function(subscribed, channel, message) {
    console.log('Channel is ' + channel);

   /* let object = JSON.parse(message);
    let info = object.data;
    let event = object.event;
    console.log(event);
    switch(event){
        case 'App\\Events\\NewThreadMessage':
            io.emit(channel, { 'event': 'App\\Events\\NewThreadMessage', 'data': info.message});
        break;
        case 'App\\Events\\ThreadHistoryRequested':
            io.emit(channel, { 'event': 'App\Events\ThreadHistoryRequested', 'data': info.messages});
    }*/

   // Emit con toda la data incluida del Event para poder diferenciar si queremos recibir uno o varios mensajes

    io.emit(channel, JSON.parse(message).data.message);
});