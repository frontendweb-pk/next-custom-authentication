import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Role extends Model {
  public declare role_id: number;
  public declare role_name: string;
  public declare created_at: Date;
  public declare updated_at: Date;
}

Role.init(
  {
    role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role_name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: "roles",
    modelName: "Role",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  }
);
