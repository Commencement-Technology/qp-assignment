import { Response, NextFunction } from "express";
import { NotAuthorizedError } from "common-utils-functionalities";

import { authService } from "../../services/auth.service";

interface IGetUserAuthInfoRequest {
  headers: {
    authorization: string;
  };
  user: any;
}

export async function isAuthenticated(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {

    if (!req.headers.authorization) {
      throw new NotAuthorizedError("Authentication required");
    }

    const authorization = req.headers?.authorization?.split(" ")[1];
    const user = await authService.verifyJwtToken(authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
