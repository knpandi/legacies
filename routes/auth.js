// routes/auth.js

import express from "express";
const router = express.Router();
import User from '../models/User.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import authMiddleware from "../middlewares/authmiddlewares.js";

// Signup route
router.post(
  '/signup',
  [
    check('name', 'name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('phonenumber', 'phonenumber is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password,phonenumber,name } = req.body;   
   
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // Create a new user
       user = new User({
        username,
        password,
        phonenumber,
        name
      });
      console.log(req.body,user)

      // Save the user to the database
      await user.save();

      res.json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Signin route
router.post(
  '/signin',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
     else{
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        'YIOOYoytDarZFVX9pvKrXcYxlu5PRmilZbZ1Ipmi2mUGTAFmaqM6UOjuUnmyCOvB1cY13ENASc2I1ze1ujbfEUz438/nCQZiScQg9KRZYbMFqaemMvNVIRMTxMaMAqqnFaL1AkVnrs0ToGwHmW+H8cwMegSzjAxyRK2HFKqdEwr89dvR+Qd7M7G7ujxmhF82X0fJ+cfngEVJrWXyOZX/+nN/GJZ6/2XgcuQwa7lkuzPr4ew04/IV2stTSjGHGBaXO2u8a+X6L37GU7gHnipPeQeWdgGB9siKPnDcXNO85YIRW2R1cBQw1g8iyahPL0Jr/zvTeBO854dttbPZlQolmg==', // Replace with your secret key
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token,name:user.name });
        }
      );
    }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);



export default  router;
