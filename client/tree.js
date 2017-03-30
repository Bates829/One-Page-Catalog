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
