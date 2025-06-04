import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://love:1234@cluster0.tm0kgas.mongodb.net/"
    );
    console.log("mongodb connected successfully.");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
