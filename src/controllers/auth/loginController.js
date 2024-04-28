import { User } from '../../models/User.js';
import { statusCodes } from '../../config/index.js';
import { generateToken } from '../../utils/index.js';

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(statusCodes.HTTP_400.code).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !user.validPassword(password)) {
      return res.status(statusCodes.HTTP_401.code).json({ message: "Invalid credentials" });
    }

    const userData = { id: user.id, email: user.email, fullName: user.fullName}
    const token = generateToken(userData);

    res.status(statusCodes.HTTP_200.code).json({
      success: true,
      token,
      user: userData
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error logging in" });
  }
};
