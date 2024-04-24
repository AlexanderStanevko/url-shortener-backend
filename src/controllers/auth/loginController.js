import { User } from '../../models/User.js';
import { statusCodes } from '../../config/index.js';

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(statusCodes.HTTP_401.code).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await user.validPassword(password);

    if (!isPasswordValid) {
      return res.status(statusCodes.HTTP_401.code).json({ message: "Invalid credentials" });
    }

    res.status(statusCodes.HTTP_200.code).json({
      message: "Login successful",
      user: { id: user.id, email: user.email, username: user.username }
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error logging in" });
  }
};
