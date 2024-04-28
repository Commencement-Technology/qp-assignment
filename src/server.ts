import express from "express";

import { config } from "./config";
import { logger } from "./utils/logger";
import loaders from "./loaders";

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app
    .listen(config.get("port"), () => {
      logger.info("Grocery Ordering Application - Server started");
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
}

startServer();
