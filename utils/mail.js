
"use strict";

const { default: mailer } = require("../config/email");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail({data}) {
  // send mail with defined transport object
  const info = await mailer.sendMail(data);
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

return info
  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
};


