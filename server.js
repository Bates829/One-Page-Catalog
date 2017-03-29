/**
 * server.js
 * This file defines the server for a
 * simple tree catalog.
 */

"use strict;"

var PORT = 3433; //Listening port

/*global varibles */
var http = require('http'); //Http library
var fileserver = require('./lib/fileserver');
var sqlite3 = require('sqlite3').verbose(); //sqlite3 library
//Create database variable
var db = new sqlite3.Database('One-Page-Catalog.sqlite3', function(err){
	if(err){
		console.log(err);
	}
});
var router = new (require('./lib/route')).Router(db);

fileserver.loadDir('public');

var tree = require('./src/resource/tree');
router.resource('/trees', tree);

var server = new http.Server(function(req, res){
	var resource = req.url.slice(1);
	if(resource == ''){
		fileserver.serveFile('public/index.html', req, res);
	}
	else if(fileserver.isCached(resource)){
		fileserver.serveFile(resource, req, res);
	}
	else router.route(req, res);
});

server.listen(PORT, function(){
	console.log("Listening on port " + PORT);
})
