import express from "express";
import {login, googleAuth, register} from "../controllers/auth.js";
import multer from "multer"
import uploadImage from "../middleware/image_upload.js"

const fileUpload = multer()

const router = express.Router();

router.post("/login", login);
router.post("/google", googleAuth);
router.post("/register", fileUpload.single('picture'), uploadImage,  register)

export default router;
