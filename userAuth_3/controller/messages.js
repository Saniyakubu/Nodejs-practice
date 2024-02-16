import Conversation from "../model/conversation.model.js";
import Message from "../model/message.modal.js";

const SentMessage = async (req, res) => {
  try {
    const { userId: senderId } = req.userId;
    const { receiverId } = req.params;
    const { message } = req.body;

    if (!senderId || !message) {
      return res.json({ success: false, msg: "invalid data" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    console.log("conversation", conversation);

    if (!conversation) {
      console.log("conversation");
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    console.log(conversation);
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (!newMessage) {
      return res.json({ success: false, msg: "invalid info try again" });
    }

    conversation.messages.push(newMessage._id);

    await conversation.save();
    return res.json({ senderId, receiverId, message });
  } catch (error) {
    return res.json({ success: false, msg: "try again", Error: error.message });
  }
};

export { SentMessage };
