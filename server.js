/**
 * server.js
 * This file defines the server for a
 * simple tree catalog.
 */

"use strict;"

var PORT = 3433; //Listening port

/*global varibles */
var http = require('http'); //Http library
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('One-Page-Catalog.sqlite3', function(err){
	if(err) console.error(err);
});
var router = new (require('./lib/route')).Router(db);

// Define our routes
var tree = require('./src/resource/tree');
router.resource('/trees', tree);

router.get('/', function(req, res){
	fs.readFile('public/index.html', function(err, body){
		if(err){
			console.error(err);
		}
		res.setHeader('Content-Type', 'text/html');
		res.end(body);
	});
});

router.post('/', function(req, res){
	tree.create(req, res, db);
	fs.readFile('public/index.html', function(err, body){
		if(err){
			console.error(err);
		}
		res.setHeader('Content-Type', 'text/html');
		res.end(body);
	});
});

router.get('/app.js', function(req,res){
	fs.readFile('public/app.js', function(err, body){
		if(err){ console.error(err);}
		res.end(body);
	});
});

router.get('/public/project-form.html', function(req,res){
	fs.readFile('public/project-form.html', function(err, body){
		res.setHeader('Content-Type', 'text/html');
		res.end(body);
	});
});

router.get('/public/stylesheets/catalog.css', function(req, res){
	fs.readFile('public/stylesheets/catalog.css', function(err, body){
		if(err){
			console.error(err);
		}
		res.setHeader("Content-Type", 'text/css');
		res.end(body);
	})
})

	router.get('/public/images/:filename', function(req, res){
		var filename = req.params.filename;
		fs.readFile('public/images/' + filename, function(err, body){
			if(err){
				console.error(err);
			}
			res.setHeader('Content-Type', 'image/*');
			res.end(body);
		});
	});


var server = new http.Server(function(req, res) {
	router.route(req, res);
});

server.listen(PORT, function(){
	console.log("Listening on port " + PORT);
});
