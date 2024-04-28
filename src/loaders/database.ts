import { Sequelize } from "sequelize";
import { logger } from "../utils/logger";

export const sequelize = new Sequelize("postgres", "postgres", "pmore9420", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: (...msg) => logger.info(`${msg[0]}`),
});
