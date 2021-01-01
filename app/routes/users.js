const router = require("express").Router();
const UserModel = require("../models/User");

let findOne = (profileID) => {
  //Querying Our Database with the help of ProfileID:
  //Finds Exactly One Record from the Database :
  return UserModel.findOne({
    //On the Left Hand Side : The Key which is to be Queried
    //On the Right Hand Side : to the Value we want to Query with
    profileId: profileID,
  });
};

//Create a New User :
//This Function returns a New Promise
let createNewUser = async (profile) => {
  return new Promise((resolve, reject) => {
    //Here , we will create a new document , inside of our database :
    let newChatUser = new UserModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || "",
    });

    newChatUser.save((error) => {
      if (error) {
        console.log("Error in Creating New User");
        reject(error);
      } else {
        resolve(newChatUser);
      }
    });
  });
};

let findById = (id) => {
  return new Promise((resolve, reject) => {
    UserModel.findById(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

//A Middlware Function that checks to see if the User is Authenticated and Logged in :
let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  findOne,
  createNewUser,
  findById,
  isAuthenticated,
};
