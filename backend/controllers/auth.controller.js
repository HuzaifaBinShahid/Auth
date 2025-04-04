import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Registering User" });
  }
};

// const Cookieslogin =  async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       req.session.userId = user._id;
//       return res.status(201).json({ message: "Login Successful" });
//     }
//     res.status(401).json({ message: "Invalid Credentials" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error logging in" });
//   }
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next(); // move to next middleware or route handler
  });
};

const checkToken = (req, res) => {
  // Since the token is valid and `authenticateToken` attaches `req.user`, return the user info
  res.status(200).json({ isLoggedIn: true, userId: req.user.userId });
};

const googleLogin = async (req, res) => {
  try {
    const { email, name, googleId, picture } = req.body;

    if (!email || !googleId) {
      return res
        .status(400)
        .json({ message: "Email and Google ID are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const username = `${email.split("@")[0]}${Math.floor(
        Math.random() * 1000
      )}`;
      user = new User({
        email,
        name,
        googleId,
        picture,
        username,
        password: null,
      });
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.clearCookie("connect.sid");
    res.status(201).json({ message: "Logout successful" });
  });
};

export { authenticateToken, checkToken, googleLogin, login, logout, signup };


