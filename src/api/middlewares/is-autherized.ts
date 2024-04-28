import { Response, NextFunction } from "express";
import { NotAuthorizedError } from "common-utils-functionalities";

import { IGetUserAuthInfoRequest } from "../../types";

export function isAuthorized(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (!user || user.role !== "ADMIN") {
      throw new NotAuthorizedError();
    }
    next();
  } catch (error) {
    next(error);
  }
}
