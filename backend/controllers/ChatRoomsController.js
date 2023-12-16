const ChatRooms = require('../models/ChatRooms');
const { uuid, Bcrypt, SALTROUNDS, Multer } = require('../utils/constants');
const Messages = require('../models/Messages');
const Users = require('../models/Users');

module.exports = {

    createChatRoom: async (req, res) => {
        try {
            const { firstUserId, secondUserId } = req.body;
            if (!firstUserId || !secondUserId) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "All fields are required.",
                    error: "All fields are required."
                });
            }

            //check requested users exist or not
            const findExist = await ChatRooms.findOne({
                members: { $all: [firstUserId, secondUserId] }
            });
            if (findExist) {
                return res.json({
                    status: 200,
                    data: findExist,
                    message: null,
                    error: null,
                })
            }
            const createRoom = new ChatRooms({
                _id: uuid.v4(),
                members: [firstUserId, secondUserId]
            });
            await createRoom.save();
            return res.json({
                status: 200,
                data: createRoom,
                message: "Chat Created Successfully",
                error: null,
            })
        } catch (error) {
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            })
        }
    },

    getUserChatRooms: async (req, res) => {
        try {
            const { userId } = req.query;
            if (!userId) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "userId fields is required.",
                    error: "userId fields is required.",
                });
            }
            const findChatRooms = await ChatRooms.find({
                members: { $in: [userId] },
            })
                .populate("members") // Populate the 'members' field with user details
                .sort({ createdAt: -1 });
            const findChatRoomsCounts = await ChatRooms.count({
                members: { $in: [userId] },
            });
            let filterRoom = [];
            if (findChatRooms.length) {
                for (const chatRooms of findChatRooms) {
                    //find last chat's last message
                    const getLastMessages = await Messages.find({
                        chatRoomId: chatRooms._id,
                        deletedBy: {
                            $not: {
                                $elemMatch: { userId: userId },
                            },
                        },
                    })
                        .sort({ createdAt: -1 })
                        .limit(1);

                    //get unRead message count so we can set as notification message count
                    const getMessagesCount = await Messages.find({
                        chatRoomId: chatRooms._id,
                        deletedBy: {
                            $not: {
                                $elemMatch: { userId: userId },
                            },
                        },
                        readBy: {
                            $not: {
                                $elemMatch: { userId: userId },
                            },
                        },
                    })
                        .sort({ createdAt: -1 })
                        .limit(1);

                    //attech spcific room count with spcific room
                    chatRooms.unReadCount = getMessagesCount;
                    filterRoom.push({
                        ...chatRooms._doc,
                        user:
                            chatRooms.members[0]._id == userId
                                ? chatRooms.members[1]
                                : chatRooms.members[0],
                        //add lastMessage CreatedAt time based on this we can sort room
                        lastMessageCreatedAt:
                            getLastMessages && getLastMessages.length
                                ? getLastMessages[0].createdAt
                                : "",
                        //create new field "lastMessage"
                        //find last message if find then move to (getLastMessages[0]) position or ""
                        lastMessage:
                            getLastMessages && getLastMessages.length
                                ? getLastMessages[0].text
                                : "",
                    });
                }
                //sorting room based on last message of room
                filterRoom.sort((a, b) =>
                    a.lastMessageCreatedAt > b.lastMessageCreatedAt ? -1 : 1
                );
            }
            return res.json({
                status: 200,
                count: findChatRoomsCounts,
                data: filterRoom,
                message: null,
                error: null,
            });
        } catch (error) {
            console.log("error", error);
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error,
            });
        }
    },
    getSingleChatRoom: async (req, res) => {
        try {
            const { roomId } = req.query;
            if (!roomId) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "All fields are required.",
                    error: "All fields are required."
                });
            }
            let findChatRooms = await ChatRooms.findOne({
                _id: roomId
            }).populate("members")


            const getMessages = await Messages.find({
                chatRoomId: roomId,
            }).sort({ createdAt: -1 }) // Populates the senderId field with user details

            findChatRooms._doc.message = getMessages;


            // findChatRooms['messages'] = getMessages;

            // for (let i = 0; i < getMessages.length; i++) {
            //     const element = getMessages[i];

            //     const findData = await Users.findOne({
            //         _id: element.senderId
            //     });
            //     if (findData) {
            //         element.senderDetails = findData
            //     } else {
            //         element.senderDetails = {}
            //     }
            // }

            return res.json({
                status: 200,
                data: findChatRooms,
                message: null,
                error: null,
            })
        } catch (error) {
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error
            })
        }
    }
}