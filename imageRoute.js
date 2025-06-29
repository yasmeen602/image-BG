
import express from "express";
import { upload, handleMulterError } from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import { removeBgImage } from "../controllers/imageController.js";

const imageRouter = express.Router();

imageRouter.post(
    '/remove-bg',
    auth,
    upload.single('image'),
    handleMulterError,
    removeBgImage
);

export default imageRouter;