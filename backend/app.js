const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const { createServer } = require("http");
const { Server } = require("socket.io");

const UserRoutes = require("./routes/userRoutes");
const AuthRoutes = require("./routes/authroutes");
const FeedbackRoutes = require("./routes/feedbackRoutes");
const ResourcesRoutes = require("./routes/resourcesRoutes");
const ChatRoomRoutes = require("./routes/chatRoomRoutes");
const MessageRoutes = require("./routes/messageRoutes");
const HealthAssessmentRoutes = require("./routes/healthAssessment");
const Users = require("./models/Users");
const ChatRooms = require("./models/ChatRooms");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for images
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static("./images"));
app.use("/profileImage", express.static("profileImage"));
app.use("/resourcesImages", express.static("resourcesImages"));

//basic routes end points
app.use("/users", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/rating", FeedbackRoutes);
app.use("/resources", ResourcesRoutes);
app.use("/rooms", ChatRoomRoutes);
app.use("/message", MessageRoutes);
app.use("/question", HealthAssessmentRoutes);

// app.use("/*", (req, res) => {
//   res.send("404 not API Found");
// });

//socket connection for chat
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let onlineUsersArr = [];
let onlineListenerUsersArr = [];

io.on("connection", (socket) => {
  //online user
  socket.on("joinUser", (userId) => {
    !onlineUsersArr.some((item) => item.userId === userId) &&
      onlineUsersArr.push({
        userId,
        socketId: socket.id,
      });

    //get online user
    io.emit("getOnlineUser", onlineUsersArr);
  });
  //in this event we add user whose are listener
  socket.on("onlineListenerUsers", async (userId) => {
    !onlineListenerUsersArr.some((item) => item.userId === userId) &&
      onlineListenerUsersArr.push({
        userId,
        socketId: socket.id,
      });
    const userList = await Users.find({
      _id: { $in: onlineListenerUsersArr.map((d) => d.userId) },
    }).catch((e) => {
      console.log(e);
    });
    const newUserList = [];
    if (userList?.length) {
      for (let i = 0; i < userList.length; i++) {
        const chatRooms = await ChatRooms.findOne({
          members: { $all: [userList[i]._id, userId] },
        }).catch((e) => {
          console.log(e);
        });

        newUserList.push({
          ...(userList[i]._doc || {}),
          roomId: chatRooms?._id,
        });
      }
    }
    //get online user
    io.emit("getOnlineListener", newUserList || onlineListenerUsersArr);
  });

  //in this event we remove user whose are listener
  socket.on("removeOnlineListenerUsers", async (userId) => {
    onlineListenerUsersArr = onlineListenerUsersArr.filter(
      (item) => item.userId !== userId
    );

    const userList = await Users.find({
      _id: { $in: onlineListenerUsersArr.map((d) => d.userId) },
    }).catch((e) => {
      console.log(e);
    });
    const newUserList = [];
    if (userList?.length) {
      for (let i = 0; i < userList.length; i++) {
        const chatRooms = await ChatRooms.findOne({
          members: { $all: [userList[i]._id, userId] },
        }).catch((e) => {
          console.log(e);
        });
        newUserList.push({
          ...(userList[i]._doc || {}),
          roomId: chatRooms?._id,
        });
      }
    }
    //get online user
    io.emit("getOnlineListener", newUserList || onlineListenerUsersArr);
  });
  //send messages
  socket.on("sendMessage", (msg) => {
    const isOnline = onlineUsersArr.find((x) => x.userId == msg.reciverId);

    //if online then send msg
    if (isOnline) {
      io.to(isOnline.socketId).emit("getMessage", msg);
    }
  });

  socket.on("disconnect", () => {
    //disconnect specific socket
    onlineUsersArr = onlineUsersArr.filter((y) => y.socketId !== socket.id);

    //send other socket users to client
    io.emit("getOnlineUser", onlineUsersArr);

    // for listener user only
    onlineListenerUsersArr = onlineListenerUsersArr.filter(
      (item) => item.socketId !== socket.id
    );
    io.emit("getOnlineListener", onlineListenerUsersArr);
  });
});

//db connections
mongoose
  .connect(
    process.env.MONGO_URL,
    { useUnifiedTopology: true },
    { useNewUrlParser: true }
  )
  .then((result) => {
    console.log("Server Connected @", process.env.PORT);
    httpServer.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));

console.log("bee-bestie");
