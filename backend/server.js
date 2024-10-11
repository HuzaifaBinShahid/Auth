import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();
app.use(bodyParser.json());


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
  saveUninitialized: true,
  cookie: { secure: false }
}));

mongoose.connect('mongodb://localhost:27017/auth_demo')
  .then(() => { console.log("MongoDb Connected") })
  .catch((err) => { console.error("MongoDb Connection error", err) });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User Registered Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error Registering User' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;
      return res.status(201).json({ message: "Login Successful" });
    }
    res.status(401).json({ message: 'Invalid username or password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/check-session', (req, res) => {
  if (req.session.userId) {
    res.status(201).json({ isLoggedIn: true, userId: req.session.userId });
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
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