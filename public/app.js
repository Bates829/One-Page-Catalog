(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function loadIndex(){
  $.get('/trees', function(trees, status) {
    if(status == "success"){
      $('<h1>').text("Tree Catalog").addClass("text-primary").appendTo("#data");
      trees.forEach(function(tree){
        var link = $('<a>')
          .attr('href', '/trees/' + tree.id)
          .on('click', function(event){
            event.preventDefault();
            loadTree('/trees/' + tree.id);
          });
          var image = $('<img>')
            .attr('src', tree.image)
            .appendTo(link);
            link.appendTo('#data');
      });
      $('<hr>').appendTo("#data");
      $('<button>').addClass(" btn btn-center btn-primary btn-lg").text("Add Tree").on("click", function(){
        $("#data").empty();
        $("#data").load("/public/project-form.html", function(){
          $('form').on('submit', function(event){
            event.preventDefault();
            var form = document.getElementById('upload-form');
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/', true);
            xhr.send(new FormData(form));
          });
        });
      }).appendTo("#data");
    }
  });
}

function loadTree(treeId){
  $.get(treeId, function(tree, status){
    if(status == "success"){
      var data = $('#data');
      data.empty();
      var div = $('<div>')
      var title = $('<h1>')
        .text(tree.name)
        .appendTo(div);
      var imageSrc = $('<img>')
        .attr('src', tree.image)
        .appendTo(div);
        var description = $('<p>')
          .text(tree.description)
          .appendTo(div);
        var home = $('<a class="left-home">')
          .text("Home")
          .attr('href', '/')
          .appendTo(div);
        div.appendTo(data);
    }
  });
}

loadIndex();

},{}]},{},[1]);
