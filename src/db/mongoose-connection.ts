import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(`${mongoUri}`, { dbName: "flipkert" })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

export default mongoose.connection;
