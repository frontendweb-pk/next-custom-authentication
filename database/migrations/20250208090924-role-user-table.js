'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
      password: { type: Sequelize.STRING(255), allowNull: false },
      mobile: { type: Sequelize.STRING(10), allowNull: false, validate: { min: 10, max: 10 }, unique: true },
      image: { type: Sequelize.JSONB, allowNull: true, defaultValue: null },
      provider: { type: Sequelize.ENUM("credential", "google", "github", "mobile"), allowNull: false, defaultValue: "credential" },
      provider_id: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
      access_token: { type: Sequelize.STRING, defaultValue: null, allowNull: true },
      refresh_token: { type: Sequelize.STRING, defaultValue: null, allowNull: true },
      email_verified: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "role_id"
        }
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users")
  }
};
