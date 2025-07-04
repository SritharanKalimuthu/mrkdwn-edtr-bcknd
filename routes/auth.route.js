import express from "express";
import { refreshAccessToken, sendResetURL, resetpassword } from "../controllers/auth.controller.js";
import { verifyOtp } from "../controllers/otp.controllers.js";
import { otpSchema } from "../Validations/otp.validation.js"
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/", validateRequest(otpSchema), verifyOtp);
router.get("/refreshtoken", refreshAccessToken);
router.post("/sendreseturl", sendResetURL);
router.post("/resetpassword", resetpassword)

export default router;