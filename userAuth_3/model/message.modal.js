import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    require: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
