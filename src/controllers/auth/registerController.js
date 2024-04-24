import { User } from '../../models/User.js';
import bcrypt from 'bcrypt';
import { statusCodes } from '../../config/index.js';

export const registerController = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(statusCodes.HTTP_201.code).json({
      message: "User registered successfully",
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({
      message: "Error registering new user"
    });
  }
};
