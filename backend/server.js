import cors from "cors";
import session from "express-session";
import { OAuth2Client } from "google-auth-library";
import mongoose from "mongoose";
import express from "express";

import authRoute from "./routes/auth.routes.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);

// PreFlight Cors Check

// app.options('*', cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

app.use(
  session({
    secret: "useAuth",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax",
      // maxAge: 6000 (cookie expiry time 6 seconds )
    },
  })
);

mongoose
  .connect("mongodb://localhost:27017/auth_demo")
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.error("MongoDb Connection error", err);
  });

//-------------------Login using session id------------------------

// app.post("/logout", async (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error logging out" });
//     }
//     res.status(200).json({ message: "Logout successful" });
//   });
// });

// ------------------- Checking session based on session id in cookie -----------------
// app.get('/check-session', (req, res) => {
//   if (req.session && req.session.userId) {
//     res.status(200).json({ isLoggedIn: true, userId: req.session.userId });
//   } else {
//     res.status(401).json({ isLoggedIn: false });
//   }
// });

// app.post("/auth/google", async (req, res) => {
//   try {
//     const { email, name, googleId, picture } = req.body;

//     // Check if user exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create new user if doesn't exist
//       const username = email.split("@")[0] + Math.floor(Math.random() * 1000);
//       user = new User({
//         email,
//         name,
//         googleId,
//         picture,
//         username,
//         password: null, // For Google-authenticated users
//       });
//       await user.save();
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//         picture: user.picture,
//       },
//     });
//   } catch (error) {
//     console.error("Google auth error:", error);
//     res.status(500).json({ message: "Authentication failed" });
//   }
// });



// app.post("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(500).json({ message: "Error logging out" });
//     res.clearCookie("connect.sid");
//     res.status(201).json({ message: "Logout successful" });
//   });
// });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
