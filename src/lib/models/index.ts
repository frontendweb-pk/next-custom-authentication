import { Role } from "./role";
import sequelize from "../db";
import { User } from "./user";

Role.hasMany(User, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "role",
});

export { Role, sequelize, User };
