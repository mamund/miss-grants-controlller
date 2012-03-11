/* miss grants controller M2M sample */

var fs = require('fs');
var http = require('http');
var querystring = require('querystring');

/* initial state */
var controller = {};
controller.href="/controller";
controller["possible-states"] = [
  {"door" : ["open","closed"]},
  {"light" : ["on", "off"]},
  {"drawer" : ["open", "closed"]},
  {"panel" : ["open", "closed"]}
];
controller["current-states"] = [
  {"name" : "door", "value" : "open"},
  {"name" : "light", "value" : "off"},
  {"name" : "drawer", "value" : "closed"},
  {"name" : "panel", "value" : "closed"}
];
controller.actions = [
  {"name": "door", "href": "/controller", "body" : {"name" : "door", "value" : "closed"}}
];

function handler(req, res) {

  switch(req.url) {
    case "/":
      if(req.method==="GET") {
        emitHtml(res);
      }
      else {
        emitResponse(res, 415, "Method Not Allowed", "text/plain");
      }
      break;
    case "/controller":
      switch(req.method) {
        case "GET" :
          emitState(res);
          break;
        case "PUT" :
          changeState(req, res);
          break;
        default:
          emitResponse(res, 415, "Method Not Allowed", "text/plain");
          break;
      }
      break;
    default:
      emitResponse(res, 404,"Not Found", "text/plain");
      break;
  }
}

function emitHtml(res) {
  fs.readFile("./index.html", "binary", function(err, file){sendFile(err, file, res);});
}
function sendFile(err, file, res) {
  if(err) {
    emitResponse(res, 500, err.message, "text/plain");
  }
  else {
    emitResponse(res, 200, file, "text/html");
  }
}
function emitState(res) {
  emitResponse(res, 200, JSON.stringify(controller), "application/json");
}

function changeState(req, res) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk.toString();
  });

  req.on('end', function() {
    var state, list, i, x;
    state = querystring.parse(body);
    try {
      list = controller["current-states"];
      for(i=0,x=list.length;i<x;i++) {
        if(list[i].name===state.name) {
          controller["current-states"][i].value=state.value;
        }
      }
      emitState(res);
    }
    catch(ex) {
      emitResponse(res, 400, ex, "text/plain");
    }
  });
}

function emitResponse(res, status, text, type) {
  res.writeHead(status, {"content-type" : type});
  res.end(text);
}

http.createServer(handler).listen(process.env.PORT);