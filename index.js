let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let Redis = require('ioredis');
const environment = require('./environment');
let redis = new Redis(environment.REDIS_URL);

http.listen(environment.NODE_PORT || 5000, '0.0.0.0', function () {
    console.log('listening in at port ' + (environment.NODE_PORT || 5000));
});

function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.end('');
}

io.on('connection', (socket) => {
    console.log(socket);
})
;

redis.psubscribe('*', function (err, count) {
});

redis.on('pmessage', function (subscribed, channel, message) {
    console.log('Channel is ' + channel);
    console.log(message);

    io.emit(channel, JSON.parse(message));
});
