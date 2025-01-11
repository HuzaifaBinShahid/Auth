import bcrypt from 'bcrypt';
import cors from 'cors';
import session from 'express-session';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = import.meta.env.JWT_SECRET || "@Eps1lon@";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// PreFlight Cors Check

// app.options('*', cors({ 
//   origin: 'http://localhost:5173',
//   credentials: true,
//   methods: ['GET', 'POST', 'OPTIONS'], 
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

app.use(session({
  secret: 'useAuth',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'lax',
    // maxAge: 6000 (cookie expiry time 6 seconds )
  }
}));



mongoose.connect('mongodb://localhost:27017/auth_demo')
  .then(() => { console.log("MongoDb Connected") })
  .catch((err) => { console.error("MongoDb Connection error", err) });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  picture: { type: String }
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User Registered Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error Registering User' });
  }
});

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && await bcrypt.compare(password, user.password)) {
//       req.session.userId = user._id;
//       return res.status(201).json({ message: "Login Successful" });
//     }
//     res.status(401).json({ message: 'Invalid Credentials' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error logging in' });
//   }
// });

//-------------------Login using session id------------------------

app.post('/logout', async (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  })
});

// ------------------- Checking session based on session id in cookie -----------------
// app.get('/check-session', (req, res) => {
//   if (req.session && req.session.userId) {
//     res.status(200).json({ isLoggedIn: true, userId: req.session.userId });
//   } else {
//     res.status(401).json({ isLoggedIn: false });
//   }
// });

app.post('/auth/google', async (req, res) => {
  try {
    const { email, name, googleId, picture } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        email,
        name,
        googleId,
        picture,
        password: null, // For Google-authenticated users
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (user && comparedPassword) {
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
      return res.status(201).json({ message: "Login successfull", token })
    }
    res.status(401).json({ message: "Invalid credentials" })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Logging in" })
  }
})

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next(); // move to next middleware or route handler
  })
}

app.get('/check-token', authenticateToken, (req, res) => {
  // Since the token is valid and `authenticateToken` attaches `req.user`, return the user info
  res.status(200).json({ isLoggedIn: true, userId: req.user.userId });
});




app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.clearCookie('connect.sid');
    res.status(201).json({ message: 'Logout successful' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
