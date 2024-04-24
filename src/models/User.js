import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';
import bcrypt from 'bcrypt';

export class User extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
});

User.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
});

