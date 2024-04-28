import { Sequelize } from "sequelize";

import { logger } from "../utils/logger";
import { config } from "../config";

export const sequelize = new Sequelize(
  config.get("db.database"),
  config.get("db.username"),
  config.get("db.password"),
  {
    host: config.get("db.host"),
    port: config.get("db.port"),
    dialect: "postgres" || config.get("db.database"),
    logging: (...msg) => logger.info(`${msg[0]}`),
  }
);
