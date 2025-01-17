import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists!" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    // Determine admin status based on the role
    const isAdmin = role === "admin"; // Set admin status based on role

    const new_user = new User({
      email,
      fullName,
      password: hashed_password,
      admin: isAdmin, // Save the role as admin if 'admin' is selected
    });

    if (new_user) {
      await new_user.save();

      res.status(201).json({
        _id: new_user._id,
        fullName: new_user.fullName,
        email: new_user.email,
        admin: new_user.admin,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "ALl fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({
      _id: user._id,
      isAdmin: user.admin,
    });
  } catch (error) {
    console.log("Error in auth controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logged out succesfullt" });
  } catch (error) {
    console.log("Error in auth controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
