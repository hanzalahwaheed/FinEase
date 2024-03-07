import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minLength: 7,
  },
  firstName: {
    type: String,
    trim: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
