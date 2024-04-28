import { Request, Response, NextFunction } from "express";
import { responseGenerator } from "common-utils-functionalities";

import { orderService } from "../../services/order.service";
import { IGetUserAuthInfoRequest } from "../../types";

export async function placeOrder(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, user } = req;
    const { id: userId } = user;
    const { items } = body as unknown as { items: string[] };

    const order = await orderService.placeOrder({ items, userId });
    return res.status(201).json(
      responseGenerator({
        data: order,
        message: "Order has been placed",
        statusCode: 201,
      })
    );
  } catch (error) {
    next(error);
  }
}
