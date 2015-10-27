/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var qs = require('querystring');
var fs = require('fs');
//var index = fs.readFileSync('index.html');

var results = [];
var requestHandler = function(request, response) {  
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  var pathname = request.url;
  // var index = fs.readFileSync('index.html');
  // response.writeHead(200, headers);
  // var fileStream = fs.createReadStream('index.html');
  // fileStream.pipe(response);
  // return;

  // fallback response
  
  //   if pathname is '/classes/room1'
  if (pathname === '/classes/room1' || pathname === '/classes/messages') {
    var method = request.method;
    if (method === 'GET'){
      response.writeHead(statusCode, headers);
      var data = {'results': results};
      response.end(JSON.stringify(data));  
    } else if (method === 'POST'){ 
      
      var body = '';     
      request.on('data', function (data) {
          body += data;
      });
      
      request.on('end', function () {
        postObj = qs.parse(body);
        var qsData;
        for(var key in postObj) {
          qsData = key;
        }
        var postData = request._postData || JSON.parse(qsData);
        results.push(postData);
      });

      statusCode = 201;    
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify('\n'));   
    }

  } else {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end('Hello world');
    }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
