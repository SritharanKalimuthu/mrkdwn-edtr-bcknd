import generateOtpEmailTemplate from "./otpTemplate.js";
import resetPasswordTemplate from "./resetPasswordTemplate.js";
import transporter from "../config/nodemailer.config.js";

export const sendOtpEmail = async(toEmail, otpCode, name) => {
  const mailOptions = {
    from: '"@MDEditor" <mdeditorcommunity@gmail.com>', // sender address
    to: toEmail,                                     // receiver email
    subject: "Your One-Time Password (OTP) Code",
    html: generateOtpEmailTemplate(otpCode, toEmail, name),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw new Error('Could not send OTP email');
  }
}

export const sendPasswordResetEmail = async(toEmail, resetURL, name) => {
  const mailOptions = {
    from: '"@MDEditor" <mdeditorcommunity@gmail.com>', 
    to: toEmail,                                     
    subject: "Your One-Time Password (OTP) Code",
    html: resetPasswordTemplate(resetURL, toEmail, name),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw new Error('Could not send OTP email');
  }
}
