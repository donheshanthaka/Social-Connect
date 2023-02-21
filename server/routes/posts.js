import express from "express";
import { getFeedPosts, getUserPosts, likePost, createPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer"
import uploadImage from "../middleware/image_upload.js"

const fileUpload = multer()

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, fileUpload.single('picture'), uploadImage, createPost)

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
