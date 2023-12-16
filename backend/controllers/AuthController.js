const Users = require("../models/Users");
const { mailSend } = require("../utils/mailSender");
const {
  uuid,
  Bcrypt,
  SALTROUNDS,
  Multer,
  generateToken,
} = require("../utils/constants");

//node mailer code

module.exports = {
  loginUsers: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({
          status: 400,
          data: null,
          message: "password and email are required.",
          error: "password and email are required.",
        });
      }

      const emailExists = await Users.findOne({ email });
      if (!emailExists) {
        return res.json({
          status: 400,
          data: null,
          message: "User not found",
          error: "User not found",
        });
      }
      //check entered password is correct or not
      if (!Bcrypt.compareSync(password, emailExists.password)) {
        return res.json({
          status: 400,
          data: null,
          message: "Incorrect Password",
          error: "Incorrect Password",
        });
      }
      const token = generateToken({
        userId: emailExists._id,
        email: emailExists.email,
        role: emailExists.role,
      });
      const updateUser = await Users.findOneAndUpdate(
        { _id: emailExists._id },
        { token },
        {
          returnOriginal: false, //always return updated values
        }
      );
      return res.json({
        status: 200,
        data: updateUser,
        message: "Login Successfully",
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
  logoutUsers: async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.json({
          status: 400,
          data: null,
          message: "userId are required.",
          error: "userId are required.",
        });
      }

      const emailExists = await Users.findById({ _id: userId });
      if (!emailExists) {
        return res.json({
          status: 400,
          data: null,
          message: "User not found",
          error: "User not found",
        });
      }
      const updateUser = await Users.findOneAndUpdate(
        { _id: emailExists._id },
        { token: "" },
        {
          returnOriginal: false, //always return updated values
        }
      );
      return res.json({
        status: 200,
        data: {},
        message: "Logout Successfully",
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
  forgotPasswort: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.json({
          status: 400,
          data: null,
          message: "Email are required.",
          error: "Email are required.",
        });
      }

      const emailExists = await Users.findOne({ email: email });
      if (!emailExists) {
        return res.json({
          status: 400,
          data: null,
          message: "User not found",
          error: "User not found",
        });
      }

      const updateUser = await Users.findOneAndUpdate(
        { _id: emailExists._id },
        {
          forgotPassToken: uuid.v4(),
          forgotPassTime: new Date().getTime(),
        },
        {
          returnOriginal: false, //always return updated values
        }
      );

      if (updateUser) {
        const mailObj = {
          mailTo: updateUser.email,
          linkToken: `${process.env.FRONTEND_URL}/reset-password?token=${updateUser.forgotPassToken}`,
        };
        mailSend(mailObj);
      } else {
        return res.json({
          status: 400,
          data: null,
          message: "Something went wrong",
          error: error,
        });
      }

      return res.json({
        status: 200,
        data: updateUser || {},
        message: "Check your email",
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
  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;

      if (!token && password) {
        return res.json({
          status: 400,
          data: null,
          message: "token & password are required.",
          error: "token & password are required.",
        });
      }

      const emailExists = await Users.findOne({ forgotPassToken: token });
      if (!emailExists) {
        return res.json({
          status: 400,
          data: null,
          message: "User not found",
          error: "User not found",
        });
      }

      //get expire time
      let expirationTime =
        emailExists.forgotPassTime + Number(process.env.FORGET_PASSWORD_EXPIRE); //10 min in ms

      //check link is NOT expire then continue flow else send new link to user.
      if (expirationTime >= new Date().getTime()) {
        //encrypt password
        const hashPassword = await Bcrypt.hashSync(password, 10);
        await Users.findOneAndUpdate(
          { _id: emailExists._id },
          {
            forgotPassToken: "",
            forgetPassTime: 0,
            password: hashPassword,
            token: "",
          },
          {
            returnOriginal: false, //always return updated values
          }
        );
        return res.json({
          status: 200,
          data: {},
          message: "Password change successfully",
          error: null,
        });
      } else {
        return res.json({
          status: 400,
          data: null,
          message: "Password change link is expire",
          error: "Password change link is expire",
        });
      }
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
