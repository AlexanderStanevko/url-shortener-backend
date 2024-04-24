import { User } from '../../models/User.js';
import { statusCodes } from '../../config/index.js';
import { generateToken } from '../../utils/index.js';

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !await user.validPassword(password)) {
      return res.status(statusCodes.HTTP_401.code).json({ message: "Invalid credentials" });
    }

    const userData = { id: user.id, email: user.email, fullname: user.fullname }
    const token = generateToken(userData);

    res.status(statusCodes.HTTP_200.code).json({
      message: "Login successful",
      token,
      user: userData
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error logging in" });
  }
};