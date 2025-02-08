import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export enum Provider {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  GITHUB = "github",
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  CREDENTIAL = "credential",
}
export class User extends Model {
  public declare user_id: number;
  public declare name: string;
  public declare email: string;
  public declare password: string;
  public declare role_id: number;
  public declare mobile: string;
  public declare image?: object;
  public declare access_token?: string;
  public declare refresh_token?: string;
  public declare provider?: string;
  public declare provider_id?: string;
  public declare created_at: Date;
  public declare updated_at: Date;
  readonly role?: {
    role_id: number;
    role_name: string;
  };
}

User.init(
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "role_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.JSON, defaultValue: null },
    access_token: { type: DataTypes.STRING, defaultValue: null },
    refresh_token: { type: DataTypes.STRING, defaultValue: null },
    provider: {
      type: DataTypes.ENUM,
      values: Object.values(Provider),
      defaultValue: Provider.CREDENTIAL,
    },
    provider_id: { type: DataTypes.STRING, defaultValue: null },
    email_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  }
);
