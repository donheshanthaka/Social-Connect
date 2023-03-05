import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// Register user
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      imageURL,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: imageURL,
      friends,
      location,
      occupation,
    });
    const savedNewUser = (await newUser.save()).toObject();
    const token = jwt.sign({ id: savedNewUser._id }, process.env.JWT_SECRET);
    // delete unwanted properties of the user object before sending it to the client
    delete savedNewUser.password;
    delete savedNewUser.createdAt;
    delete savedNewUser.updatedAt;
    delete savedNewUser.__v;
    res.status(201).json({token, savedNewUser});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }, "-__v -createdAt -updatedAt");
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // removing the password field from the user document
    user.set('password', undefined, {strict: false} );
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Google authentication 
export const googleAuth = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email: email }, "-__v -createdAt -updatedAt -password");

    if (!user) {
      const {
        firstName,
        lastName,
        email,
        picturePath,
        password,
      } = req.body;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
      });
  
      const user = (await newUser.save()).toObject();
      // delete unwanted properties of the user object before sending it to the client
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.__v;
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(201).json({token, user});
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, user });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
