import User from "../models/User.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (user && comparedPassword) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(201).json({ message: "Login successfull", token });
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Logging in" });
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

export { signup, login, authenticateToken };

