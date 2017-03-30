module.exports = {
  list
};

function list(trees){
  upload();
  var table = $('<table>').addClass('table');
  var head = $('<tr>').append('<th>Name</th>', '<th>Description</th>', '<th>Image</th>').appendTo(table);

  trees.forEach(function(tree){
    var row = $('<tr>').append(
      $('<td>').text(tree.name),
      $('<td>').text(tree.description),
      $('<td>').append('<a href="/trees/' + tree.id + '"><img src="' + tree.image + '"/></a>')
    ).appendTo(table);
  });
  return table;
}
function upload(){
  $('<button>').text('Add Tree').on('click', function(){
    //Add form to the page
    $('body').load('/public/project-form.html', function(){
      //Overide default form action
      $('form').on('submit', function(event){
        event.preventDefault();
        var data = new FormData($('form')[0]);
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
