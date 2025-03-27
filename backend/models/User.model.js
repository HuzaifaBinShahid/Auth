import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  picture: { type: String },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
