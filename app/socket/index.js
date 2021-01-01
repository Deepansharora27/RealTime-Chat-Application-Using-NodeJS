// Socket for Real Time Chat Functionality in the Project :
const crypto = require("crypto");
module.exports = (io, app) => {
  //Datastore(Or we can say a Data Structure) for storing our users and room related data :
  let allrooms = app.locals.chatrooms;

  /*
  Demo records just for testing the application : 
  allrooms.push({
    room: "Tech Talks",
    roomID: "0001",
    users: [],
  });

  allrooms.push({
    room: "Dev Discuss",
    roomID: "0002",
    users: [],
  });
  */

  io.of("/roomsList").on("connection", (socket) => {
    // console.log("Socket.io connected to Client");
    socket.on("getChatRooms", () => {
      socket.emit("chatRoomsList", JSON.stringify(allrooms));
    });

    socket.on("createNewRoom", (newRoomInput) => {
      //This is being logged to the console , hence correct
      console.log(newRoomInput);

      //Check to see if a room with a similar title exists or not :
      //If not create it , and then broadcast it to every single client who is connected to WebSocket :
      let findRoomByName = (allrooms, room) => {
        let findRoom = allrooms.findIndex((element, index, array) => {
          if (element.room === room) {
            return true;
          } else {
            return false;
          }
        });
        return findRoom > -1 ? true : false;
      };

      //A Function that generates a Unique RoomID for us :
      let randomHex = () => {
        return crypto.randomBytes(24).toString("hex");
      };

      //
      if (findRoomByName(allrooms, newRoomInput)) {
        //Create a New Room and broadcast it to everyone who is connected to our WebSocket :
        allrooms.push({
          room: newRoomInput,
          roomID: randomHex(),
          users: [],
        });
        //Emit an updated list to the creator :
        socket.emit("chatRoomsList", JSON.stringify(allrooms));
        //Emit updated list to everyone who is connected to the WebSocket :
        socket.broadcast("chatRoomsList", JSON.stringify(allrooms));
      }
      //Handshake is taking place between the frontend and the backend.
    });
  });
};
