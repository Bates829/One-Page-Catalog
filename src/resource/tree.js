/** @module trees
* A RESTful resource representing a software trees
* implementing the L-CRUD methods
*/

"use strict";

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
};


/** @function list
* Sends a list of all trees as a JSON array
*/
 function list(req, res, db){
   db.all("SELECT * FROM trees", [], function(err, trees){
     if(err){
       console.error(err);
       res.statusCode = 500;
       res.end("Server error");
     }
     res.setHeader("Content-Type", "text/json");
     res.end(JSON.stringify(trees));
   });
 }

/** @function create
* Creates a new trees and adds it to the database
* @param {http.incomingRequest} req - the request object
* @param {http.serverResponse} res - the response object
* @param {sqlite3.Database} db - the database object
*/
 function create(req, res, db){
   var body = "";

   req.on("error", function(err){
     console.error(err);
     res.statusCode = 500;
     res.end("Server error");
   });

   req.on("data", function(data){
     body += data;
   });

   req.on("end", function() {
     var tree = JSON.parse(body);
     db.run("INSERT INTO trees (name, description, image) VALUES (?,?,?)",
       [tree.name, tree.description, tree.image],
       function(err) {
         if(err) {
           console.error(err);
           res.statusCode = 500;
           res.end("Could not insert tree into database");
           return;
         }
         res.statusCode = 200;
         res.end();
       }
     );
   });
   }

/** @function read
* Serves a specific tree as  JSON string
* @param {http.incomingRequest} req - the request object
* @param {http.serverResponse} res - the response object
* @param {sqlite3.Database} db - the database object
*/
 function read(req, res, db){
   var id = req.params.id;
   db.get("SELECT * FROM trees WHERE id=?", [id], function(err, tree){
     if(err){
       console.error(err);
       res.statusCode = 500;
       res.end("Server error");
       return;
     }
     if(!tree){
       res.statusCode = 404;
       res.end("Tree not found");
       return;
     }
     res.setHeader("Content-Type", "text/json");
     res.end(JSON.stringify(tree));
   });
 }

/** @function update
* Updates a specific record with the supplied values
* @param {http.incomingRequest} req - the request object
* @param {http.serverResponse} res - the response object
* @param {sqlite3.Database} db - the database object
*/
 function update(req, res, db){
   var id = req.params.id;
   var body = "";

   req.on("error", function(err){
     console.error(err);
     res.statusCode = 500;
     res.end("Server error");
   });

   req.on("data", function(data){
     body += data;
   });

   req.on("end", function() {
     var tree = JSON.parse(body);
     db.run("UPDATE trees SET name=?, description=?, image=?, WHERE id=?",
       [tree.name, tree.description, tree.image, id],
       function(err) {
         if(err) {
           console.error(err);
           res.statusCode = 500;
           res.end("Could not update tree in database");
           return;
         }
         res.statusCode = 200;
         res.end();
       }
     );
   });
 }

/** @function destroy
* Removes the specified tree from the database
*/
 function destroy(req, res, db){
   var id = req.params.id;
   db.run("DELETE FROM trees WHERE id=?", [id], function(err){
     if(err){
       console.error(err);
       res.statusCode = 500;
       res.end("Server error");
     }
     res.statusCode = 200;
     res.end();
   });
 }
