function loadIndex(){
  $.get('/trees', function(trees, status){
    if(status == "success"){
      trees.forEach(function(tree){
        var link = $('<a>')
        .text(tree.name)
        .attr('href', '/trees/' + tree.id)
        .on('load', function(e){
          e.preventDefault();
          loadTree('/trees/' + tree.id);
        }).appendTo('body');
      });
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
  });
}


/*
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
          tree.onClick = function(event){
            event.preventDefault();
            loadTree("/trees/" + tree.id);
          }
        });
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  }
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
        image.src = tree.image;
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

loadIndex();
