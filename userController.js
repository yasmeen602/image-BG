import user from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please fill all the fields" 
            });
        }
        
        // Check existing user
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "User already exists" 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new user({
            username,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        await newUser.save();
        newUser.password = undefined;

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true, // Changed to true for security
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully", 
            user: newUser, 
            token 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please fill all the fields" 
            });
        }

        // Check user existence
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "User doesn't exist" 
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        existingUser.password = undefined;

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true, // Changed to true for security
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({ 
            success: true, // Changed from false to true
            message: "User logged in successfully", 
            user: existingUser, 
            token 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

export { register, login };