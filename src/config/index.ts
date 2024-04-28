import convict from "convict";

export const config = convict({
  port: {
    doc: "PORT",
    env: "PORT",
    default: 3000,
  },
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  jwt_key: {
    doc: "JWT Private Key",
    env: "jwt_key",
    default:"secrettoken",
  },
  jwt_expire: {
    doc: "JWT Expiration",
    env: "jwt_expire",
    default: "24h"
  }
});
