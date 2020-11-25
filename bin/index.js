const http = require('http');
const PORT = 8000;
const serviceHandle = require('../app')
http.createServer(serviceHandle).listen(PORT)