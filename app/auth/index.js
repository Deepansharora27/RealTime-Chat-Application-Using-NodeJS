"use strict";

const passport = require("passport");
const config = require("../config");
/*
.Startegy() is a Constructor Function , which uses the Passport OAuth Model
for authentication and login functionality in your Application
*/
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const user = require("../routes/users");
const { use } = require("passport");

module.exports = () => {
  //This Anonymous Function , will house all of our authentication code
  //This Code will get Injected in our Main Application

  passport.serializeUser((user, done) => {
    //At Line 19 , simply we are creating a session , and simply storing user's id in it:
    //The serializeUser() method is invoked , when our authorization process comes to an end
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    //Find the User Using the _id Property inside of our MongoDB Collection :
    user
      .findById(id)
      .then((user) => done(null, user))
      .catch((error) => console.log("Error While Deserializing the User"));
  });

  let authProcessor = async (accessToken, refreshToken, profile, done) => {
    //Find a User in the Local Database Using profile.id
    //If The User is Found , return the User Data Using the done() method.
    //If The User is Not Found , Create a New One in the Local Database and Return it
    const result = await user.findOne(profile.id);

    if (result) {
      //The done() method gets this data out of the authentication pipeline
      done(null, result);
    } else {
      //Create a New User (If User Not Already Present in the Local Instance)
      const newUserSaved = await user.createNewUser(profile);

      if (newUserSaved) {
        done(null, newChatUser);
      } else {
        console.log("Error While Creating a New User");
      }
    }
  };

  passport.use(new FacebookStrategy(config.fb, authProcessor));
  passport.use(new TwitterStrategy(config.twitter, authProcessor));
};

/*
The AccessToken and RefreshToken are provided by Facebook as a Part Of 
OAuth 2.0 Process

**We Will Use Our MongoDB Instance in order to store data locally.
**We Know that we are Using Mongoose an Interface to MongoDB
**One Of The Key Features that we get is the ability to Craft a Schema

-->
A Schema is basically a structure that defines how the data should be modelled
and stored in the Database


-->
The passport.serializeUser() method is invoked when our process of
Authorization ends
*/
