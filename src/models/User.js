import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';
import bcrypt from 'bcrypt';

export class User extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  static async register({ fullName, email, password }) {
    const newUser = await User.create({
      fullName,
      email,
      password
    });
    return newUser;
  }
}

User.init({
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'usersTable'
});

User.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
});
