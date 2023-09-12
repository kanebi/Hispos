


import { Sequelize } from "sequelize";
import db_config from "../config/config.json" assert { type: "json" };
// import { sequelize, DataTypes } from "../db.config.js";

const env = process.env.NODE_ENV || "development";

const config = db_config[env];

const sequelize = new Sequelize({
  database: config.database,
  username: config.user,
  host: config.host,
  port: config.port,
  password: config.password,
  dialect: config.dialect,
  operatorsAliases: false,
});


export { sequelize };
