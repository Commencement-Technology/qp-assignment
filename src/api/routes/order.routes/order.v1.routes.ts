import express = require("express");

import { placeOrder, getOrders } from "../../controllers/order.controller";
import { isAuthenticated } from "../../middlewares/is-authenticated";

const orderRouter = express.Router();

orderRouter.post("/", isAuthenticated, placeOrder);
orderRouter.get("/", getOrders);

export { orderRouter };
