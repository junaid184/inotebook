import mongoose from "mongoose";
const URI =
  "mongodb+srv://inotebook:inotebook@cluster0.khbq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectToMongo = () => {
  mongoose.connect(URI, () => {
    console.log("Connected to Mongo Successfully");
  });
};
export default connectToMongo;
