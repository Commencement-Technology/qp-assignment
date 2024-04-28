import express = require("express");

import { placeOrder } from "../../controllers/order.controller";
import { isAuthenticated } from "../../middlewares/is-authenticated";

const orderRouter = express.Router();

orderRouter.post("/", isAuthenticated, placeOrder);

export { orderRouter };
