import { User } from '../../models/User.js';
import bcrypt from 'bcrypt';
import { statusCodes } from '../../config/index.js';

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(statusCodes.HTTP_200.code).json({
        message: "Login successful",
        user: { id: user.id, username: user.username }
      });
    } else {
      res.status(statusCodes.HTTP_401.code).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({
      message: "Error logging in"
    });
  }
};
