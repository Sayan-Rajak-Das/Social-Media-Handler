import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Fetch all users
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user admin status
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { admin }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a user's details
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user-uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// Handle user uploads
export const userUploads = async (req, res) => {
  try {
    const { userId, fullName, socialMediaHandle } = req.body;
    const files = req.files; // Capture multiple files

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Loop through each uploaded file and save it to Cloudinary
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const uploadResult = await cloudinary.uploader.upload(file.path);
        return {
          url: uploadResult.secure_url,
          uploadedAt: new Date(),
        };
      })
    );

    // Push all uploaded images to the user's images array
    user.images.push(...uploadedImages);

    // Optionally update user details (name, social media handle)
    if (fullName) user.fullName = fullName;
    if (socialMediaHandle) user.socialMediaHandle = socialMediaHandle;

    await user.save();

    res.status(200).json({
      message: "Files uploaded successfully.",
      imageUrls: uploadedImages.map((img) => img.url),
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Export multer middleware for routes
export const uploadMiddleware = upload.array("images", 10);
