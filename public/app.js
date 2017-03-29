/*function loadIndex(){
  $.get('/trees', function(trees, status){
    if(status == 200){
      $('body').clear();
      trees.forEach(function(tree){
        var link = $('a')
        .text(tree.name)
        .attr('href', '/trees/' + tree.id)
        .on('click', function(e){
          e.preventDefault();
          loadTree('/trees/' + tree.id)
        });
        $('body').append(link);
      });
    }
  })
}
*/

function loadTree(url){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);

  xhr.onreadystatechange = function() {
    var DONE = 4; //readyState 4 means the request is done
    var OK = 200; // staus 200 is a succesful return
    if(xhr.readyState === DONE){
      if(xhr.status === OK){
        console.log(xhr.responseText);
        var tree = JSON.parse(xhr.responseText);
        var wrapper = document.createElement('div');
        var name = document.createElement('h1');
        var image = document.createElement('img');
        name.innerHtml = tree.name;
        image.src = tree.imageSrc;
        wrapper.appendChild(name);
        wrapper.appendChild(image);
        document.body.appendChild(wrapper);
      }
      else{
        console.log('Error: ' + xhr.status);
      }
    }
  }
}

function loadIndex(){
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
          name.innerHtml = tree.name;
          name.href = "/trees/" + tree.id;
          document.body.appendChild(name);
          project.onClick = function(event){
            event.preventDefault();
            loadProject("/trees/" + tree.id);
          }
        });
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  }
}

loadIndex();
