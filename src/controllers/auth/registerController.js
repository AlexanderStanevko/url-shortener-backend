import { User } from '../../models/User.js';
import { statusCodes } from '../../config/index.js';
import { generateToken } from '../../utils/index.js';

export const registerController = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
  
      if (!fullName || !email || !password) {
        return res.status(statusCodes.HTTP_400.code).json({ message: "Full name, email, and password are required" });
      }
  
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(statusCodes.HTTP_409.code).json({ message: "User already exists" });
      }
  
      const newUser = await User.register({ fullName, email, password });
      const user = { id: newUser.id, fullName: newUser.fullName, email: newUser.email }
      const token = generateToken(user);
  
      res.status(statusCodes.HTTP_201.code).json({
        success: true,
        token,
        user
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.HTTP_500.code).json({ message: "Error registering new user" });
    }
  };
  
