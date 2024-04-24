import { User } from '../../models/User.js';
import { statusCodes } from '../../config/index.js';
import { generateToken } from '../../utils/index.js';

export const registerController = async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
  
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(statusCodes.HTTP_409.code).json({ message: "User already exists" });
      }
  
      const newUser = await User.register({ fullname, email, password });
      const user = { id: newUser.id, fullname: newUser.fullname, email: newUser.email }
      const token = generateToken(user);
  
      res.status(statusCodes.HTTP_201.code).json({
        message: "User registered successfully",
        token,
        user
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.HTTP_500.code).json({ message: "Error registering new user" });
    }
  };
