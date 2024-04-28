import { NotAuthorizedError } from "common-utils-functionalities";
import { Response, NextFunction } from "express";

interface IGetUserAuthInfoRequest {
  headers: {
    authorization: string;
  };
  user: any;
}

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
