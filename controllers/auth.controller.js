import { verifyToken, generateAccessToken } from "../utils/generateToken.js";
import user from "../models/user.model.js";
import { generateResetToken } from "../utils/generateToken.js";
import { sendPasswordResetEmail } from "../utils/mailGenerator.js";
import bcrypt from "bcryptjs";

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  const payload = await verifyToken(refreshToken);
  if (!payload) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  const newAccessToken = await generateAccessToken({ _id: payload.id });

  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Access token refreshed" });
};

export const sendResetURL = async( req, res ) =>{
  try{
    const { email } = req.body;

    const isUserExist = await user.findOne({ email });
    if(!isUserExist){
        res.status(404).json({message:"User not found"})
    }

    const token = generateResetToken();
    isUserExist.resetToken = token;
    isUserExist.resetTokenExpires = Date.now() + 1000 * 60 * 15; 
    await isUserExist.save();

    const resetURL = `${process.env.CLIENT_URL}/auth/resetpassword/${token}`;

    await sendPasswordResetEmail(
      isUserExist.email,
      resetURL,
      isUserExist.name
    )

    res.status(200).json({ message: "Reset link sent to email" });
  } catch(err){
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
}

export const resetpassword = async( req, res ) => {
  try{
    const { token, password } = req.body;
    
    const isUserExist = await user.findOne({ resetToken: token });
    if(!isUserExist){
        res.status(404).json({message:"User not found"})
    }

    if (isUserExist.resetTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Token has expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    isUserExist.password = hashedPassword;
    isUserExist.resetToken = undefined;
    isUserExist.resetTokenExpires = undefined;
    await isUserExist.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch(err){
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
}