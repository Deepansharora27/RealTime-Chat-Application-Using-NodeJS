"use strict";
//Importing the Express Session Package Below :
const session = require("express-session");
//Bringing in the Instance Of MongoStore ==>
const MongoStore = require("connect-mongo")(session);
const config = require("../config");
const db = require("../db");

if (process.env.NODE_ENV == "production") {
  //Intialise Session With Settings For Production
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    //The Store is where express will store the Session Data:
    store: new MongoStore({
      mongooseConnection: db.Mongoose.connection,
    }),
  });
} else {
  //Initialise Session with Settings For Development
  module.exports = session({
    //The Secret Key which we are using to hash and sign our session cookie :
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  });
}
