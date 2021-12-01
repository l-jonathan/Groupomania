'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
        // define association here
        }
    };
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-z ,'-]+$/i
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-z ,'-]+$/i
            }
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
            allowNull: false
        },
        profession: DataTypes.STRING,
        userDescription: DataTypes.STRING,
        profilePhoto: DataTypes.STRING,
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, 
    {
        sequelize,
        modelName: 'User',
    }
    );
    return User;
};