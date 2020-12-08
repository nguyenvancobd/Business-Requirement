const mongoose = require("mongoose");
// Replace this with your MONGOURI.
// const MONGOURI = "mongodb+srv://conguyenvan:conguyenvan@cluster0.alkjd.mongodb.net/coco?retryWrites=true&w=majority";
const MONGOURI = "mongodb://localhost:27017/User";
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;