import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: existingUser._id, email: existingUser.email, role: existingUser.role }, 'secret', {
      expiresIn: '1h',
    });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exist.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userCreated = await User.create({
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: userCreated.email, id: userCreated._id }, 'secret', {
      expiresIn: '1h',
    });
    res.status(200).json({ result: userCreated, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
