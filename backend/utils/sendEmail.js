const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: process.env.EMAIL_USER, // Your college/official email
      pass: process.env.EMAIL_PASS, // Your App Password (NOT your regular password)
    },
  });

  // 2. Define email options
  const mailOptions = {
    from: "YCCE Portal <noreply@ycce.edu>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // You can send professional HTML templates
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;