"use strict";

if (process.env.NODE_ENV === "production") {
  //Offer Production Stage Environment Variables
  module.exports = {
    host: process.env.host || "",
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
    fb: {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.host + "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"],
    },
    twitter: {
      consumerKey: process.env.twConsumerKey,
      consumerSecret: process.env.twSecret,
      callbackURL: process.env.host + "/auth/twitter/callback",
      profileFields: ["id", "displayName", "photos"],
    },
  };
} else {
  //Offer Development Stage Environment Variables
  module.exports = require("./development.json");
}

// Set the Environment Variables Successfully.
