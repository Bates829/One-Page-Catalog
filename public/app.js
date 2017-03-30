(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var tree = require('./tree');

$.get('/trees', function(trees){
  $('body').addClass("jumbotron").html(tree.list(trees));
});

$.get('/trees', function(trees, status){
  if(status == "success"){
    $('<button>').text('Add Tree').addClass("btn-lg center-block").on('click', function(){
      //Add form to the page
      $('body').load('/public/project-form.html', function(){
        //Overide default form action
        $('form').on('submit', function(event){
          event.preventDefault();
          var data = new FormData($('form')[0]);
          console.log(data);
          $.post({
            url: '/trees',
            data: data,
            contentType: 'multipart/form-data',
            processData: false
          });
        });
      });
    }).appendTo('body');
  }
});

},{"./tree":2}],2:[function(require,module,exports){
module.exports = {
  list
};

function list(trees){
  var table = $('<table>').addClass('table').attr('align', 'center');
  var head = $('<tr>').append('<th class="text-center">Tree Gallery</th>').appendTo(table);

  trees.forEach(function(tree){
    var imgRow = $('<tr>').append(
      $('<td>').append('<a href="/trees/' + tree.id + '"><img src="' + tree.image + '"/></a>')
    ).appendTo(table);
    var nameRow = $('<tr>').append(
      $('<td>').text(tree.name)
    ).appendTo(table);
  });
  return table;
}

},{}]},{},[1]);
