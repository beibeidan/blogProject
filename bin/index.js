const http = require('http');
const PORT = 3000;
const serviceHandle = require('../app')
http.createServer(serviceHandle).listen(PORT)