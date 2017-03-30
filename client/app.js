var tree = require('./tree');

$.get('/trees', function(trees){
  $('body').html(tree.list(trees));
});

$.get('/trees', function(trees, status){
  if(status == "success"){
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
