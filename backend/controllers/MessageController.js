const ChatRooms = require("../models/ChatRooms");
const Messages = require("../models/Messages");
const Users = require("../models/Users");

const { uuid, Bcrypt, SALTROUNDS, Multer } = require("../utils/constants");

module.exports = {
  createMessage: async (req, res) => {
    try {
      const { text, senderId, chatRoomId } = req.body;
      if (!senderId || !text || !chatRoomId) {
        return res.json({
          status: 400,
          data: null,
          message: "All fields are required.",
          error: "All fields are required.",
        });
      }

      const findSender = await Users.findById({
        _id: senderId,
      });
      if (!findSender) {
        return res.json({
          status: 400,
          data: null,
          message: "User not found",
          error: "User not found",
        });
      }

      const createObj = {
        ...req.body,
        _id: uuid.v4(),
        readBy: [
          {
            userId: senderId,
            readAt: Date.now(),
          },
        ],
        // deletedBy: [{
        //     userId: senderId,
        //     readAt: Date.now(),
        // }],
      };
      const messageCreate = new Messages(createObj);
      await (await messageCreate.save()).populate("senderId");
      return res.json({
        status: 200,
        data: messageCreate,
        message: null,
        error: null,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        data: null,
        message: "Something went wrong",
        error: error,
      });
    }
  },
  getChatRoomWiseMessage: async (req, res) => {
    try {
      const { chatRoomId, userId } = req.query;
      if (!chatRoomId || !userId) {
        return res.json({
          status: 400,
          data: null,
          message: "All fields are required.",
          error: "All fields are required.",
        });
      }

      //do not send delete messages
      const where = {
        chatRoomId: chatRoomId,
        deletedBy: {
          $not: {
            $elemMatch: { userId: userId },
          },
        },
      };
      const getMessages = await Messages.find(where)
        .populate("senderId")
        .sort({ createdAt: "asc" });
      const getMessagesCount = await Messages.count(where);

      return res.json({
        status: 200,
        count: getMessagesCount,
        data: getMessages,
        message: null,
        error: null,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        data: null,
        message: "Something went wrong",
        error: error,
      });
    }
  },
  deleteChat: async (req, res) => {
    try {
      const { userId, chatRoomId } = req.body;
      if (!userId || !chatRoomId) {
        return res.json({
          status: 400,
          data: null,
          message: "All fields are required.",
          error: "All fields are required.",
        });
      }
      //check exist room
      const findChatRooms = await ChatRooms.find({
        _id: chatRoomId,
        members: { $in: [userId] },
      });
      if (!findChatRooms) {
        return res.json({
          status: 400,
          data: null,
          message: "Chat not found",
          error: "Chat not found",
        });
      }
      //delete messages
      await Messages.updateMany(
        {
          chatRoomId: chatRoomId,
          "deletedBy.userId": { $ne: userId },
        },
        {
          $addToSet: {
            deletedBy: {
              userId: userId,
              deletedAt: Date.now(),
            },
          },
        }
      );

      //read messages
      await Messages.updateMany(
        {
          chatRoomId: chatRoomId,
          "readBy.userId": { $ne: userId },
        },
        {
          $addToSet: {
            readBy: {
              userId: userId,
              readAt: Date.now(),
            },
          },
        }
      );

      return res.json({
        status: 200,
        data: {},
        message: null,
        error: null,
      });
    } catch (error) {
      return res.json({
        status: 500,
        data: null,
        message: "Something went wrong",
        error: error,
      });
    }
  },
  markAsRead: async (req, res) => {
    try {
      const { userId, chatRoomId } = req.body;
      if (!userId || !chatRoomId) {
        return res.json({
          status: 400,
          data: null,
          message: "All fields are required.",
          error: "All fields are required.",
        });
      }
      //check exist room
      const findChatRooms = await ChatRooms.find({
        _id: chatRoomId,
        members: { $in: [userId] },
      });
      if (!findChatRooms) {
        return res.json({
          status: 400,
          data: null,
          message: "Chat not found",
          error: "Chat not found",
        });
      }
      //read messages
      await Messages.updateMany(
        {
          chatRoomId: chatRoomId,
          "readBy.userId": { $ne: userId },
        },
        {
          $addToSet: {
            readBy: {
              userId: userId,
              readAt: Date.now(),
            },
          },
        }
      );

      return res.json({
        status: 200,
        data: {},
        message: null,
        error: null,
      });
    } catch (error) {
      return res.json({
        status: 500,
        data: null,
        message: "Something went wrong",
        error: error,
      });
    }
  },
};
