const Chat = require('./models/Chat');

module.exports = io => {
  
   let users;

    
      users = Chat.find({},{"nick":1});
    
  
  io.on('connection', async socket => {
    let v = 1;
    let messages = await Chat.find({}).limit(8).sort('-created');

    console.log(`Usuarios ${users}\n\n Mesnsages ${messages} `)

    socket.emit('load old msgs', messages);
    

    socket.on('login',(data, cb)=>{

    })


    socket.on('new user', (data, cb) => {
     
      
      if (data in users) {
        

      } else {
        cb(true);
        socket.nickname = data;
        users[socket.nickname] = socket;
        updateNicknames();
      }
    });

    // receive a message a broadcasting
    socket.on('send message', async (data, cb) => {
      var msg = data.trim();

      if (msg.substr(0, 3) === '/w ') {
        msg = msg.substr(3);
        var index = msg.indexOf(' ');
        if(index !== -1) {
          var name = msg.substring(0, index);
          var msg = msg.substring(index + 1);
          if (name in users) {
            users[name].emit('whisper', {
              msg,
              nick: socket.nickname 
            });
          } else {
            cb('Error! Enter a valid User');
          }
        } else {
          cb('Error! Please enter your message');
        }
      } else {
        var newMsg = new Chat({
          msg,
          nick: socket.nickname
        });
        await newMsg.save();
      
        io.sockets.emit('new message', {
          msg,
          nick: socket.nickname
        });
      }
    });

    socket.on('disconnect', data => {
      //if(!socket.nickname) return;
      console.log("El usuario se desconecto"+socket.nickname)
      //delete users[socket.nickname];
      updateNicknames();
    });

    function updateNicknames() {
      io.sockets.emit('usernames', Object.keys(users));
    }
  });

}
