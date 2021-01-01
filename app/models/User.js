const Mongoose = require("mongoose");

//Creating a Schema that defines a Structure for storing user data:
const chatUser = new Mongoose.Schema({
  //Mapping Three Keys to their appropriate Data Types :
  //ProfileId is the UserId which is returned by Authentication Provider(Either Facebook or Twitter:)
  profileId: String,
  fullName: String,
  profilePic: String,
});

//Turning this Schema into a Usable Model :
//Creating an basic instance of the UserSchema :
let userModel = Mongoose.model("chatUser", chatUser);

module.exports = userModel;
