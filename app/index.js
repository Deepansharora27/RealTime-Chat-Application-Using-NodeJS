//This is the Main Exporter Helper Function:

//Social Authentication Logic :
require("./auth")();

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");

//Creating our instance of HTTP Server and then binding our express application to it :
let ioServer = (app) => {
  //Binding our Express app to our newly created server instance :
  app.locals.chatrooms = [];
  const server = require("http").Server(app);
  const io = require("socket.io")(server);

  //This is in essence,just a middleware function :
  io.use(
    passportSocketIo.authorize({
      cookieParser: cookieParser,
      key: "express.sid",
      secret: process.env.sessionSecret,
      store: MongoStore,
      // success: onAuthorizeSuccess,
      // fail: onAuthorizeFail,
    })
  );

  io.on("connection", (socket) => {
    console.log(socket.request.user);
  });

  require("./socket")(io, app);
  return server;
};

module.exports = {
  router: require("./routes"),
  session: require("./session"),
  ioServer,
};
