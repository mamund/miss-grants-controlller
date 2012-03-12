/* miss grants controller M2M sample */
/*
NOTE:
this is the HUMAN version
if offers a variable number of transitions per representation
humans can select ones that interest them in any order allowed
*/

var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var util = require('util');

var messageColor = '\033[36m';
var bodyColor = '\033[32m';
var lineColor = '\033[37m';
var resetColor = '\033[0m';

var log = (process.argv.length > 2 && process.argv[2] == 'log');

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

  if (log) {
    console.log(messageColor + "response body:\r\n", bodyColor + util.inspect(controller,false,null));
    console.log(lineColor + "================================================" + resetColor);
  }
}

function changeState(req, res) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk.toString();
  });

  req.on('end', function() {
    var state, list, i, x;
    state = querystring.parse(body);
    if (log)
      console.log(messageColor + "request body:", bodyColor + body);
    
    try {
      list = controller["current-states"];
      for(i=0,x=list.length;i<x;i++) {
        if(list[i].name===state.name) {
          controller["current-states"][i].value=state.value;
        }
      }
      // computer modified state
      controller.actions = [];
      if(list[0].value==='closed' && list[1].value=='on' && list[2].value==='open' && list[3].value==="open") {
        controller.actions[0] = {"name": "door", "href": "/controller", "body" : {"name" : "door", "value" : "open"}};
        controller.actions[1] = {"name": "panel", "href": "/controller", "body" : {"name" : "panel", "value" : "closed"}};
      }
      else if(list[0].value==='closed' && list[1].value=='on' && list[2].value==='open') {
        controller.actions[0] = {"name": "door", "href": "/controller", "body" : {"name" : "door", "value" : "open"}};
        controller.actions[1] = {"name": "light", "href": "/controller", "body" : {"name" : "light", "value" : "off"}};
        controller.actions[2] = {"name": "drawer", "href": "/controller", "body" : {"name" : "drawer", "value" : "closed"}};
        controller.actions[3] = {"name": "panel", "href": "/controller", "body" : {"name" : "panel", "value" : "open"}};
      }
      else if(list[0].value==='open') {
        controller.actions[0] = {"name": "door", "href": "/controller", "body" : {"name" : "door", "value" : "closed"}};
        controller["current-states"][1].value="off";
        controller["current-states"][2].value="closed";
        controller["current-states"][3].value="closed";
      }
      else if(list[0].value=='closed' && list[1].value==='off' && list[2].value==='closed') {
        controller.actions[0] = {"name": "door", "href": "/controller", "body" : {"name" : "door", "value" : "open"}};
        controller.actions[1] = {"name": "light", "href": "/controller", "body" : {"name" : "light", "value" : "on"}};
        controller.actions[2] = {"name": "drawer", "href": "/controller", "body" : {"name" : "drawer", "value" : "open"}};
        controller["current-states"][3].value="closed";
      }
      else if(list[0].value=='closed' && list[1].value==='on' && list[2].value==='closed') {
        controller.actions[0] = {"name": "door", "href": "/controller", "body" : {"name" : "door", "value" : "open"}};
        controller.actions[1] = {"name": "light", "href": "/controller", "body" : {"name" : "light", "value" : "off"}};
        controller.actions[2] = {"name": "drawer", "href": "/controller", "body" : {"name" : "drawer", "value" : "open"}};
        controller["current-states"][3].value="closed";
      }
      else if(list[0].value=='closed' && list[1].value==='off' && list[2].value==='open') {
        controller.actions[0] = {"name": "door", "href": "/controller", "body" : {"name" : "door", "value" : "open"}};
        controller.actions[1] = {"name": "light", "href": "/controller", "body" : {"name" : "light", "value" : "on"}};
        controller.actions[2] = {"name": "drawer", "href": "/controller", "body" : {"name" : "drawer", "value" : "closed"}};
        controller["current-states"][3].value="closed";
      }
      // return response representation
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

http.createServer(handler).listen(process.env.PORT||1337);