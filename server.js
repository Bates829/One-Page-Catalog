/**
 * server.js
 * This file defines the server for a
 * simple tree catalog.
 */

"use strict;"

var PORT = 3433; //Listening port

/*global varibles */
var http = require('http'); //Http library
var fs = require('fs'); //Library to access Filesystem
var url = require('url'); //URL library
var sqlite3 = require('sqlite3').verbose(); //sqlite3 library
//Create database variable
var db = new sqlite3.Database('One-Page-Catalog.sqlite3', function(err){
	if(err){
		console.log(err);
	}
});
var router = new (require('./lib/route')).Router(db);

router.get('/', function(req, res){
	fs.readFile('public/index.html', function(err, body){
		if(err){
			console.error(err);
		}
		res.end(body);
	});
});

router.get("/app.js", function(req, res){
	fs.readFile('public/app.js', function(err, body){
		if(err){
			console.error(err);
		}
		res.end(body);
	});
});

var tree = require('./src/resource/tree');
router.resource('/trees', tree);

var migrate = require('./lib/migrate');
migrate(db, 'migrations', function(err){
	var server = new http.Server(function(req, res){
		router.route(req, res);
	});
	server.listen(PORT, function(){
		console.log("Listening on port " + PORT);
	});
});
