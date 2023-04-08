import bcrypt from "bcrypt";

// Helpers
import { generateJWT } from "../helpers/generateJWT.js";

// Models
import { User } from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Invalid email or password.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Invalid email or password.",
      });
    }

    // Create JWT token
    const token = generateJWT(user._id);

    return res.status(200).json({
      ok: true,
      message: "Logged in successfully.",
      token: token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email }).select("email");

    if (userExists) {
      return res.status(409).json({
        ok: false,
        message: "Email is already in use.",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await User({
      name,
      email,
      password: hashedPassword,
    }).save();

    // Create JWT token
    const token = generateJWT(user._id);

    return res.status(201).json({
      ok: true,
      message: "Signed up successfully.",
      token: token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
