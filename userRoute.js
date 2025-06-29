import express from "express";
import { login, register } from "../controllers/userController.js";
// import { body } from "express-validator";

const  userRouter = express.Router();


// Add input validation middleware if needed
userRouter.post("/register", register)
userRouter.post("/login", login)
// userRouter.post("/register", validateRegister, register);

// Add these validations before your routes
// const validateRegister = [
//   body("email").isEmail(),
//   body("password").isLength({ min: 6 }),
// ];


// Error handling middleware
// userRouter.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong!",
//     error: err.message
//   });
// });



export default userRouter;
