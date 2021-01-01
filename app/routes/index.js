"use strict";

const passport = require("passport");
const helperFunction = require("./users");

//This Constructs a New Router Instance and this Instance is nothing but a standard
//express middleware function
const router = require("express").Router();

module.exports = router.get("/", (req, res, next) => {
  //   res.send("<h1>Hello Welcome to the Express Application</h1>");
  res.render("login", {
    pageTitle: "My Login Page",
  });
});

module.exports = router.get("/rooms", [
  helperFunction.isAuthenticated,
  (req, res, next) => {
    res.render("rooms", {
      user: req.user,
    });
  },
]);

module.exports = router.get("/chat", [
  helperFunction.isAuthenticated,
  (req, res, next) => {
    res.render("chatroom", {
      user: req.user,
    });
  },
]);

module.exports = router.get("/getsession", (req, res, next) => {
  res.send("Your favorite color is" + req.session.favColor);
});

module.exports = router.get("/setsess", (req, res, next) => {
  req.session.favColor = "Dark Blue";
  res.send("Session Set Successfully");
});

//Routes for the Authentication Part:
//This is what will kickstart the Facebook sign-on workflow :
module.exports = router.get(
  "/auth/facebook",
  passport.authenticate("facebook")
);

module.exports = router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/rooms",
    failureRedirect: "/",
  })
);

module.exports = router.get("/auth/twitter", passport.authenticate("twitter"));

module.exports = router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/rooms",
    failureRedirect: "/",
  })
);

module.exports = router.get("/logout", (req, res, next) => {
  //This .logout() method is made avaialable by PassportJS
  //It's Job is to Clear to Session , so that No User Data is Present
  req.logout();
  res.redirect("/");
});

//Serving Back a Error page back to the User
// router.get("", (req, res, next) => {
//   res.sendFile(process.cwd() + "/views/404.htm");
// });

//This Basically turns our router into a module
