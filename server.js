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
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('One-Page-Catalog.sqlite3', function(err){
	if(err) console.error(err);
});
var router = new (require('./lib/route')).Router(db);

//Cache static directory in the fileserver
fileserver.loadDir('public');

// Define our routes
var tree = require('./src/resource/tree');
router.resource('/trees', tree);

var server = new http.Server(function(req, res){
	//Remove the leading '/' from the resource url
	var resource = req.url.slice(1);
	// If no resource is requested, serve the cached index page
	if(resource == ''){
		fileserver.serveFile('public/index.html', req, res);
	}
	// If the resource is cached in the fileserver, serve it
	else if(fileserver.isCached(resource)){
		fileserver.serveFile(resource, req, res);
	}
	// Otherwise, route the request
	else router.route(req, res);
});

server.listen(PORT, function(){
	console.log("Listening on port " + PORT);
})
