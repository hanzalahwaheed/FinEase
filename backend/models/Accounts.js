import mongoose, { Schema, model } from "mongoose";

const AccountsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = model("Account", AccountsSchema);

export default Account;
