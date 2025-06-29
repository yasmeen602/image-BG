
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import user from "../models/UserModel.js";
import { promisify } from "util";

// Convert fs.unlink to promise-based
const unlinkAsync = promisify(fs.unlink);

const removeBgImage = async (req, res) => {
    const imagePath = req?.file?.path;
    
    try {
        // Validate request
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No image file provided" 
            });
        }

        const { userId } = req.user;
        const User = await user.findById(userId);
        
        if (!User) {
            // Clean up uploaded file if user not found
            if (imagePath) await unlinkAsync(imagePath);
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Create form data
        const formData = new FormData();
        formData.append("image_file", fs.createReadStream(imagePath));

        // Make API request to ClipDrop
        const { data } = await axios.post(
            'https://clipdrop-api.co/remove-background/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                    ...formData.getHeaders()
                },
                responseType: 'arraybuffer'
            }
        );

        // Convert response to base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        // Clean up uploaded file
        await unlinkAsync(imagePath);

        return res.json({ 
            success: true, 
            resultImage, 
            message: "Image background removed successfully" 
        });
      
    } catch (error) {
        // Clean up uploaded file on error
        if (imagePath) {
            try {
                await unlinkAsync(imagePath);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        console.error('Error processing image:', error);
        return res.status(500).json({ 
            success: false, 
            message: error.response?.data?.message || "Error processing image" 
        });
    }
};

export { removeBgImage };