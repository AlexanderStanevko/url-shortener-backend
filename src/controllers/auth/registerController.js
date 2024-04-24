import { User } from '../../models/User.js';
import { statusCodes } from '../../config/index.js';

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(statusCodes.HTTP_409.code).json({ message: "User already exists" });
    }

    const newUser = await User.register({ username, email, password });

    res.status(statusCodes.HTTP_201.code).json({
      message: "User registered successfully",
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error registering new user" });
  }
};
