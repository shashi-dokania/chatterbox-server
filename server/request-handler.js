/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var results = [];
var requestHandler = function(request, response) {  
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  console.log('another message');
  var pathname = request.url;

  // fallback response
  if (pathname !== '/classes/room1'){
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('Hello world');
    return;
  }
  
  //   if pathname is '/classes/room1'
  var method = request.method;
  if (method === 'GET'){
    response.writeHead(statusCode, headers);
    var data = {'results': results};
    response.end(JSON.stringify(data));  
  } else if (method === 'POST'){ 
    results.push(request._postData);
    statusCode = 201;    
    response.writeHead(statusCode, headers);
    response.end('Accepting posts');
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
