const mailSend = async (inputs) => {
  const nodemailer = require("nodemailer");
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    to: inputs.mailTo,
    from: process.env.SMTP_MAIL_FROM_ADDRESS,
    subject: 'Reset Password',
    html:
      `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Password</title>
            </head>
            <body
    style="
      font-family: 'Montserrat', sans-serif;
      margin: auto;
      padding: 0px;
      background-color: #f8f8f8;
    "
  >
    <center>
      <table
        width="100%"
        bgcolor="#f8f8f8"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="border-collapse: collapse; border: 0"
      >
        <tbody>
          <tr>
            <td bgcolor="#f8f8f8" style="padding: 10px 0px">
              <table
                width="800"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style="
                  border-collapse: collapse;
                  background-color: #f8f8f8;
                  border-radius: 10px;
                "
              >
                <tbody>
                  <tr>
                    <td
                      valign="top"
                      style="background: #f8f8f8; overflow: hidden; opacity: 1"
                    >
                      <table
                        width="100%"
                        bgcolor="#f8f8f8"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          border-collapse: collapse;
                          border: 0;
                          line-height: 0px;
                          border: 0;
                        "
                      >
                        <tbody>
                          <tr></tr>
                          <tr>
                            <td
                              align="left"
                              valign="top"
                              style="
                                text-align: left;
                                background-color: #ffffff;
                                padding: 10px 30px 15px 30px;
                                font-family: 'Montserrat', sans-serif;
                                font-weight: 400;
                                font-size: 18px;
                                line-height: 22px;
                                color: #80798b;
                              "
                            >
                              <!-- <br> -->
                              <center><h1>Reset Your Password!</h1></center>
                              <br>
                              <p
                                style="
                                  text-align: left;
                                  font-family: 'Montserrat', sans-serif;
                                  font-weight: 400;
                                  font-size: 16px;
                                  line-height: 18px;
                                  color: #80798b;
                                "
                              >
                                You recently requested to reset your password
                                for your Bee Bestie account. Click the button
                                below to reset your password. "Reset Password"
                                button is valid for the next 10 minutes.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="
                                text-align: center;
                                background-color: #ffffff;
                                padding: 0px 30px 0px 30px;
                              "
                            >
                              <a
                                href="${inputs.linkToken}"
                                style="
                                  font-family: 'Montserrat', sans-serif;
                                  color: #ffffff;
                                  text-decoration: none;
                                  width: 200px;
                                  height: 21px;
                                  background: #503895;
                                  border-radius: 25px;
                                  padding: 9px 0px;
                                  display: inline-block;
                                  text-align: center;
                                "
                              >
                                <span
                                  style="
                                    font-size: 14px;
                                    line-height: 21px;
                                    letter-spacing: 0.4px;
                                  "
                                  >Reset Password</span
                                >
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              valign="top"
                              style="
                                text-align: center;
                                background-color: #ffffff;
                                padding: 10px 30px 15px 30px;
                                font-family: 'Montserrat', sans-serif;
                                font-weight: 400;
                                font-size: 18px;
                                line-height: 22px;
                                color: #80798b;
                              "
                            >
                              <p
                                style="
                                  text-align: left;
                                  font-family: 'Montserrat', sans-serif;
                                  font-weight: 400;
                                  font-size: 16px;
                                  line-height: 18px;
                                  color: #80798b;
                                "
                              >
                                If you did not request a password reset, please
                                ignore this email.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td
                              valign="top"
                              align="left"
                              style="
                                background: #ffffff;
                                text-align: center;
                                line-height: 0px;
                                padding: 30px 30px 30px;
                              "
                            >
                              <p
                                style="
                                  font-style: normal;
                                  font-weight: 600;
                                  font-size: 14px;
                                  line-height: 17px;
                                  text-transform: capitalize;
                                  color: #80798b;
                                  margin: 0;
                                  text-align: left;
                                "
                              >
                                Best wishes,
                                <span style="display: block">
                                  Bee Bestie Team</span
                                >
                              </p>
                              <p
                                style="
                                  text-align: left;
                                  font-family: 'Montserrat', sans-serif;
                                  font-weight: 400;
                                  font-size: 16px;
                                  line-height: 18px;
                                  color: #80798b;
                                "
                              >
                                If you have any questions or concerns, please
                                email us:
                                <a href="mailto:csusmsproject2023@gmail.com"
                                  >csusmsproject2023@gmail.com</a
                                >
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </body>
            </html>`,
  };
  try {
    const info = await transport.sendMail(mailOptions);
    // Mail has been sent successfully.
    return {
      msg: "done",
      statusCode: 200,
      error: null
    }
  } catch (err) {
    return {
      msg: "error",
      statusCode: 500,
      error: err
    }
  }
}

module.exports = {
  mailSend
}