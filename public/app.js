var xhr = new XMLHttpRequest();
xhr.open('GET', '/trees/');
xhr.send(null);

xhr.onreadystatechange = function() {
  var DONE = 4; // readyState 4 means the request is done.
  var OK = 200; // status 200 is a successful return.
  if (xhr.readyState === DONE) {
    if (xhr.status === OK) {
      console.log(xhr.responseText); // 'This is the returned text.'
      var trees = JSON.parse(xhr.responseText);
      trees.forEach(function(tree){
        var name = document.createElement('a');
        name.innerHtml = project.name;
        name.href = "/trees/" + tree.id;
        document.body.appendChild(name);
      });
    } else {
      console.log('Error: ' + xhr.status); // An error occurred during the request.
    }
  }
}
