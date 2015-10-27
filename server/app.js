var message = {};
var friends = {};
var rooms = {};
var app = {
  init: function(){

    app.fetch();

    message.username = window.location.search.substr(10);

    message.roomname = "main";

    $("#send").on('click', function(e) {
      app.handleSubmit();
      e.preventDefault();
    });

  },

  send: function(message){
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://127.0.0.1:3000/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  fetch: function(){
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type : 'GET',
      dataType: 'json',
      contentType : 'application/json',
      success : function(response) {
        console.log('chatterbox: Message retrieved');
        _.each(response, function(results){
          _.each(results, function(data){
            var newText = encodeURIComponent(data.text);
            app.addMessage(newText, data.username, data.roomname);
            // roomFilter(data);
            app.addRoom(data.roomname);
            bold();
          })
        });
      },
      error : function(response) {
        console.log('chatterbox: Failed to retrieve message');
      }
    });
  },

  clearMessages: function(){
    $("#chats").html('');
  },

  addMessage: function(text, username, room){
    $("#chats").prepend("<div class='chat " + room + "'>" + "<span class="+ username + ">" + username + "<br></span>" + text + "</div>");
    $("#message").val("");
  },

  addRoom: function(room){
    if(room !== undefined && room !== null && room !== '' && !rooms.hasOwnProperty(room)){
      $("#roomSelect").append(
          $('<option></option>').html(room)
      );
      rooms[room] = room;
    }
  },

  addFriend: function(friend){
    friends[friend] = friend;
  },
  
  handleSubmit: function(){
    message.text = $("#message").val();
    app.addMessage($("#message").val(), message.username);
    app.send(message);
  }
};

app.init();
//setInterval(app.fetch, 10000);

var bold = function(){
  $("#chats").on('click', 'span', function(){
    var user = event.target.className;
    for(var key in friends){
      $('.'+friends[key]).parent().css('font-weight', 'bold');
    }
    app.addFriend(user);
  });
};
