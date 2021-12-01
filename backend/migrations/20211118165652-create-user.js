'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /^[a-z ,'-]+$/i
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /^[a-z ,'-]+$/i
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
            isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profession: {
            type: Sequelize.STRING
        },
        userDescription: {
            type: Sequelize.STRING
        },
        profilePhoto: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};