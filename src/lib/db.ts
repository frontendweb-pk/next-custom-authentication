import { options } from "../../database/config/config.mjs";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import pg from "pg";

const dbOptions = options as SequelizeOptions;
dbOptions.dialectModule = pg;
const sequelize = new Sequelize(dbOptions);
export default sequelize;
