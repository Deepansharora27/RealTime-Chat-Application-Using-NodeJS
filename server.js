const express = require("express");
//Base Instance Of An Express Application
const app = express();
const chatRoom = require("./app");
const passport = require("passport");

//Setting The KeyValue Pairs For the Server Instance:
app.set("port", process.env.PORT || 3000);
//Middleware to Serve Static Assets Such as Stylesheets , Images and Static JavaScript Files
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(chatRoom.session);

app.use(passport.initialize());
app.use(passport.session());

//Initialising routes with the path,{This is our Another Middleware}:
app.use("/", chatRoom.router);


chatRoom.ioServer(app).listen(app.get("port"), () => {
  console.log("The Chatroom Server is Running and Up");
});
