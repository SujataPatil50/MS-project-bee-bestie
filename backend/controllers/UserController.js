const Users = require("../models/Users");
const { uuid, Bcrypt, SALTROUNDS, Multer } = require("../utils/constants");
/* profileImage upload */
const imageStorage = Multer.diskStorage({
  limits: {
    fileSize: 10000000, //10mb
  },
  destination: (req, file, cb) => {
    cb(null, "./profileImage");
  },
  filename: (req, file, cb) => {
    // const name = file.originalname.toLowerCase();
    const getFileName = file.mimetype.split("/");
    console.log(getFileName);
    const name = `${Date.now()}.${getFileName[1]}`;
    cb(null, name);
  },
});
var uploadImage = Multer({ storage: imageStorage }).single("profileImage");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName || !email || !password) {
        return res.json({
          status: 400,
          data: null,
          message: "userName,password,email are required.",
          error: "userName,password,email are required.",
        });
      }

      //check requested email exist or not
      const findExist = await Users.findOne({
        email: email,
      });
      if (findExist) {
        return res.json({
          status: 400,
          data: null,
          message: "Email already exist, try another one",
          error: "Email already exist, try another one",
        });
      }
      const hashPass = await Bcrypt.hash(password, 10);

      //create process
      const createObj = {
        ...req.body,
        _id: uuid.v4(),
        password: hashPass,
      };
      const addUser = new Users(createObj);
      await addUser.save();
      return res.json({
        status: 200,
        data: addUser,
        message: "User Created Successfully",
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

  getUserById: async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.json({
          status: 400,
          data: null,
          message: "userId id required",
          error: "userId id required",
        });
      }
      //check user is exist or not
      const findExist = await Users.findById({ _id: userId });
      if (!findExist) {
        return res.json({
          status: 400,
          data: null,
          message: "User not found",
          error: "User not found",
        });
      }
      return res.json({
        status: 200,
        data: findExist,
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
  deleteUserById: async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.json({
          status: 400,
          data: null,
          error: "userId id required.",
        });
      }
      //check user is exist or not
      const findExist = await Users.deleteOne({ _id: userId });
      if (!findExist) {
        return res.json({
          status: 400,
          data: null,
          message: "User not found",
          error: "User not found",
        });
      }
      return res.json({
        status: 200,
        data: {},
        message: "User deleted successfully",
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
  updateUser: async (req, res) => {
    try {
      const { userId, email } = req.body;
      delete req.body.profileImage;
      if (!userId || !email) {
        return res.json({
          status: 400,
          data: null,
          message: "userId,email are required",
          error: "userId,email are required",
        });
      }
      //check requested user exist or not
      const findExistUser = await Users.findById({ _id: userId });
      if (!findExistUser) {
        return res.json({
          status: 400,
          data: null,
          message: "User not found",
          error: "User not found",
        });
      }
      //check requested email exist or not
      const findExist = await Users.findOne({
        _id: { $ne: userId },
        email: email,
      });
      if (findExist) {
        return res.json({
          status: 400,
          data: null,
          message: "Email already exist, try another one",
          error: "Email already exist, try another one",
        });
      }
      const updateUser = await Users.findOneAndUpdate(
        { _id: userId },
        req.body,
        {
          returnOriginal: false, //always return updated values
        }
      );
      return res.json({
        status: 200,
        data: updateUser || {},
        message: "Profile Updated Successfully",
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
  userListing: async (req, res) => {
    try {
      const { limit, skip } = req.query;
      let userList = [];
      if (limit > 0 || skip > 0) {
        userList = await Users.find({ role: { $ne: "admin" } })
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });
      } else {
        userList = await Users.find({ role: { $ne: "admin" } }).sort({
          createdAt: -1,
        });
      }
      const userCounts = await Users.count({ role: { $ne: "admin" } });
      return res.json({
        status: 200,
        count: userCounts || 0,
        data: userList || [],
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
  checkExist: async (req, res) => {
    try {
      const { email, userName } = req.body;
      let msg = null;
      let statusCode = 200;

      if (email && email !== "") {
        const emailExists = await Users.exists({ email });
        if (emailExists) {
          msg = "Email already exists. Please try another one";
          statusCode = 400;
        }
      }

      if (userName && userName !== "") {
        const userNameExists = await Users.exists({ userName });
        if (userNameExists) {
          msg = "Username already exists. Please try another one";
          statusCode = 400;
        }
      }

      return res.json({
        status: statusCode,
        data: {},
        messages: msg,
        error: null,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        status: 500,
        data: null,
        messages: ["Something went wrong. Please try again."],
        error: error,
      });
    }
  },
  addEditProfileImage: async (req, res) => {
    try {
      uploadImage(req, res, async (err) => {
        if (!req.body.userId || !req?.file?.filename) {
          return res.json({
            status: 400,
            data: null,
            message: "userId and profileImage are required",
            error: "userId and profileImage are required",
          });
        }
        //check requested user exist or not
        const findExistUser = await Users.findById({ _id: req.body.userId });
        if (!findExistUser) {
          return res.json({
            status: 400,
            data: null,
            message: "User not found",
            error: "User not found",
          });
        }
        const updateUser = await Users.findOneAndUpdate(
          { _id: req.body.userId },
          {
            profileImageUrl: `${process.env.BACKEND_URL}/profileImage/${req.file.filename}`,
          },
          {
            returnOriginal: false, //always return updated values
          }
        );
        return res.json({
          status: 200,
          data: updateUser || {},
          message: "Profile Updated Successfully",
          error: null,
        });
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
};
