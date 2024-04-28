import express = require("express");

import { signup, signin } from "../../controllers/auth.controller";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

export { userRouter };
