import mongoose from "mongoose";
const connectDB = async () => {
  const connectionUrl = ""; // relace with mongo db access url
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("blog database connection is succssful"))
    .catch((error) => console.log(error));
};

export default connectDB;
