//Connecting to the Database , Connection Logic
const config = require("../config");

//Bringing in the Mongoose Package:
const Mongoose = require("mongoose");

const connectionString = config.dbURI;

Mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//The Connection Logic Code Written Down Below :
const connectDB = async () => {
  try {
    await Mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database Connected");
  } catch (err) {
    console.error(err.message);
    //Exit Process With Failure
    process.exit(1);
  }
};

module.exports = connectDB;
